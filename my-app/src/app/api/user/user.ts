import { sql } from '@vercel/postgres'

//Lista todos os usuários do banco de dados
export const getAllUsers = async () => {
  interface User {
    username: string
    password: string
  }
  interface RowItem {
    row: string
  }

  const users = await sql`SELECT (name, password) FROM users`
  console.log(users)
  const userList: User[] = users.rows.map((item: RowItem) => {
    const [, username, password] = item.row.match(/"([^"]+)",([^)]+)/) || []
    return {
      username: username || 'unknown',
      password: password || 'unknown'
    }
  })
  return userList
}

//Procura um usuário
export const getUser = async (email: string) => {
  const user = await sql`SELECT * FROM users WHERE name = ${email}`
  if (user.rowCount < 1) {
    return null
  }
  return user.rows[0]
}
