import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

// export async function GET() {
//   return NextResponse.json({
//     status: 200,
//     data: 'Pinguei no user'
//   })
// }

export async function GET(request: Request) {
  try {
    const result = await sql`ALTER TABLE Users ADD COLUMN Surname varchar(255);`
    return NextResponse.json({ result }, { status: 200 })
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
