import { NextResponse } from 'next/server'
import { QueryResult, sql } from '@vercel/postgres'
import hashpass from '../../security/hashing'
// export async function GET() {
//   return NextResponse.json({
//     status: 200,
//     data: 'Pinguei no user'
//   })
// }

export async function GET() {
  return NextResponse.json({
    status: 200,
    data: 'Pinguei no user'
  })
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
    const hashedPass = await hashpass(password)
    await sql`INSERT INTO Users (Name,Surname, Email, Password) VALUES (${name}, ${surname}, ${email}, ${hashedPass});`
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({
    status: 200
  })
}
