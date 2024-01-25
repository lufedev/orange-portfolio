import { sql } from '@vercel/postgres'

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
  //Aviso de erro, não sei como resolver ainda
  return transformData(users)
}

//Procura um usuário
export const getEmail = async (email: string) => {
  const user = await sql`SELECT * FROM users WHERE email = ${email}`
  if (user.rowCount < 1) {
    throw new Error('Usuário não encontrado')
  }
  return user.rows[0]
}

//Deleta um usuário
export const deleteUser = async (email: string) => {
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
  if ((await getEmail(email)) !== null) {
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
