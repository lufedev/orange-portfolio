import hashpass from '@/app/security/hashing'
import { sql } from '@vercel/postgres'
import bcrypt from 'bcrypt'
import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

//Lista todos os usuários do banco de dados

export const getAllUsers = async () => {
  interface Row {
    row: string
  }

  interface TransformedData {
    username: string
    email: string
  }

  function transformData(data: { rows: Row[] }): TransformedData[] {
    return data.rows.map((row) => {
      const data = row.row
        .replace('(', '')
        .replace(')', '')
        .replace(/"/g, '')
        .split(',')
      const username = data[0].trim()
      const email = data[1].trim()

      return { username, email }
    })
  }

  const users = await sql`SELECT (name, email) FROM users`
  // @ts-expect-error Não consigo resolver, e é necessário para compilar
  return transformData(users)
}

//Procura um usuário
export const getEmail = async (email: string) => {
  const user = await sql`SELECT * FROM users WHERE email = ${email}`
  return user.rows[0]
}

//Deleta um usuário
export const deleteUser = async (email: string) => {
  await checkUser(email)
  const user = await sql`DELETE FROM users WHERE email = ${email}`
  if (user.rowCount < 1) {
    throw new Error('Usuário não encontrado')
  }
  return user.rows[0]
}

//Cria um usuário
export const createUser = async (
  name: string,
  surname: string,
  email: string,
  password: string
) => {
  const alreadyExists = await getEmail(email)
  if (alreadyExists !== undefined) {
    throw new Error('Usuário já existe')
  }
  const user =
    await sql`INSERT INTO users (name, surname, email, password) VALUES (${name}, 
      ${surname}, ${email}, ${password})`

  if (user.rowCount < 1) {
    return null
  }
  return user.rows[0]
}

export const editUser = async (
  name: string,
  surname: string,
  email: string,
  password: string
) => {
  const userOld = await getEmail(email)

  await checkUser(email)
  const fields = ['email', 'name', 'surname']

  fields.forEach((field) => {
    if (userOld[field] !== eval(field)) {
      userOld[field] = eval(field)
    }
  })
  if ((await bcrypt.compare(password as string, userOld.password)) !== true) {
    userOld.password = await hashpass(password)
  }
  const userNew =
    await sql`UPDATE users SET name = ${userOld.name}, surname = ${userOld.surname}, password = ${userOld.password} WHERE email = ${userOld.email}`
  if (userNew.rowCount < 1) {
    throw new Error('Usuário não encontrado')
  }
  return userNew.rows[0]
}

export const checkUser = async (email: string) => {
  const session = await getServerSession(options)
  if (session === null) {
    throw new Error('Usuário não autorizado')
  }
  if (session.user?.email !== email) {
    throw new Error('Usuário não autorizado')
  }

  return true
}
