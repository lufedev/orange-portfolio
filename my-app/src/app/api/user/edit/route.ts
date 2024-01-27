import { NextResponse } from 'next/server'
import { editUser } from '../user'

export async function POST(request: Request) {
  const data = await request.json()
  const size = Object.keys(data).length
  if (size < 1) {
    return NextResponse.json({
      status: 400,
      data: 'Dados não recebidos'
    })
  }
  const { name, surname, email, password } = data
  if (!name || !surname || !email || !password) {
    return NextResponse.json({
      status: 400,
      data: 'Dados incompletos'
    })
  }
  try {
    const userTest = await editUser(name, surname, email, password)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 400,
        data: 'Erro ao criar usuário',
        error: error.message
      })
    }
  }

  return NextResponse.json({
    status: 200,
    data: 'Usuário editado com sucesso'
  })
}
