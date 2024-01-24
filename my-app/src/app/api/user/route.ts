import { NextResponse } from 'next/server'
import { QueryResult, sql } from '@vercel/postgres'

// export async function GET() {
//   return NextResponse.json({
//     status: 200,
//     data: 'Pinguei no user'
//   })
// }

export async function GET(request: Request) {
  try {
    const users = await sql`SELECT (name, password) FROM users`
    const userList = getUsers(users)
    console.log(userList)
    return NextResponse.json({ userList }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const data = await request.json()
  const size = Object.keys(data).length
  if (size < 1) {
    return NextResponse.json({
      status: 400,
      data: 'No data received'
    })
  }
  const { name, surname, email, password } = data
  try {
    if (!name || !surname || !email || !password)
      throw new Error('Parametros faltando')
    await sql`INSERT INTO Users (Name,Surname, Email, Password) VALUES (${name}, ${surname}, ${email}, ${password});`
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({
    status: 200
  })
}

const getUsers = (users: QueryResult) => {
  interface User {
    username: string
    password: string
  }
  interface RowItem {
    row: string
  }

  const userList: User[] = users.rows.map((item: RowItem) => {
    const [, username, password] = item.row.match(/"([^"]+)",([^)]+)/) || []
    return {
      username: username || 'unknown',
      password: password || 'unknown'
    }
  })
  console.log(userList)
}
