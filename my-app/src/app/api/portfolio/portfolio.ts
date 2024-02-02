import { sql } from '@vercel/postgres'
import { getServerSession } from 'next-auth'
import { options } from '../auth/[...nextauth]/options'

export const getAllPortfoliosFromUser = async () => {
  const session = await getServerSession(options)
  const portfolio =
    await sql`SELECT * FROM portfolio WHERE email = ${session.user?.email}`

  return portfolio.rows
}

export const getPortfolio = async (id: number) => {
  const portfolio = await sql`SELECT * FROM portfolio WHERE id = ${id}`
  return portfolio
}
export const createPortfolio = async (
  title: string,
  tags: string,
  link: string,
  description: string
) => {
  const session = await getServerSession(options)
  const email = session.user?.email
  const portfolio =
    await sql`INSERT INTO portfolio (title, tags, link, description, email ) VALUES (${title}, ${tags}, ${link}, ${description}, ${email})`
  return portfolio.rows[0]
}

export const editPortfolio = async (
  id: number,
  title: string,
  tags: string,
  link: string,
  description: string
) => {
  const session = await getServerSession(options)
  const checkUser = await getPortfolio(id)
  if (!checkUser) {
    throw new Error('Usuário não autorizado')
  }
  const portfolio =
    await sql`UPDATE portfolio SET title = ${title}, tags = ${tags}, link = ${link}, description = ${description} WHERE id = ${id}`
  return portfolio.rows[0]
}

export const deletePortfolio = async (id: number) => {
  const session = await getServerSession(options)
  const checkUser = await getPortfolio(id)
  if (!checkUser) {
    throw new Error('Usuário não autorizado')
  }
  const portfolio = await sql`DELETE FROM portfolio WHERE id = ${id}`
  return portfolio.rows[0]
}

export const checkUser = async (id: number) => {
  const session = await getServerSession(options)
  const email = session.user?.email
  const checkEmail = await getPortfolio(id)
  if (checkEmail.email !== email) {
    throw new Error('Usuário não autorizado')
  }
  return true
}
