import { sql } from '@vercel/postgres'
import { getServerSession } from 'next-auth'
import { options } from '../auth/[...nextauth]/options'

export const getAllPortfolios = async () => {
  const portfolio = await sql`
            SELECT 
              p.id, 
              p.title, 
              p.tags, 
              p.link, 
              p.description, 
              p.email, 
              u.Name || ' ' || u.Surname AS Usuario, -- Adiciona a coluna Usuário
              p.imagepath, 
              p.date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' AS date
          FROM 
              portfolio p
          JOIN 
              users u ON p.email = u.email -- Faz o JOIN usando a coluna EMAIL
          ORDER BY 
              p.id ASC;
  `
  return portfolio.rows
}
export const getAllPortfoliosFromUser = async () => {
  const session = await getServerSession(options)
  if (session === null) {
    throw new Error('Usuário não autorizado')
  }
  const portfolio =
    await sql`SELECT id, title, tags, link, description, email, imagepath,date 
              AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' AS date
              FROM portfolio 
              WHERE email = ${session.user?.email}
              ORDER BY id ASC;
              `

  return portfolio.rows
}

export const getPortfolio = async (id: number) => {
  const portfolio = await sql`SELECT * FROM portfolio WHERE id = ${id}`
  if (portfolio.rows.length === 0) {
    throw new Error('Projeto não encontrado')
  }
  return portfolio
}
export const createPortfolio = async (
  title: string,
  tags: string,
  link: string,
  description: string,
  imagepath: string
) => {
  const session = await getServerSession(options)
  if (session === null) {
    throw new Error('Usuário não autorizado')
  }
  const email = session.user?.email

  const portfolio =
    await sql`INSERT INTO portfolio (title, tags, link, description, email, imagepath) VALUES (${title}, ${tags}, ${link}, ${description}, ${email}, ${imagepath}); `
  return portfolio.rows[0]
}

export const editPortfolio = async (
  id: number,
  title: string,
  tags: string,
  link: string,
  description: string,
  imagepath: string
) => {
  await checkUser(id)
  const portfolio =
    await sql`UPDATE portfolio SET title = ${title}, tags = ${tags}, link = ${link}, description = ${description}, imagepath = ${imagepath} WHERE id = ${id}`
  return portfolio.rows[0]
}

export const deletePortfolio = async (id: number) => {
  await checkUser(id)
  const portfolio = await sql`DELETE FROM portfolio WHERE id = ${id}`
  return portfolio.rows[0]
}

export const checkUser = async (id: number) => {
  const session = await getServerSession(options)
  if (session === null) {
    throw new Error('Usuário não autorizado')
  }
  const email = session.user?.email
  const checkEmail = await getPortfolio(id)
  if (checkEmail.rows[0].email !== email) {
    throw new Error('Usuário não autorizado')
  }
  return true
}
