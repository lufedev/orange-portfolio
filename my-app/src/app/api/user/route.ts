import { NextResponse } from 'next/server'
import hashpass from '../../security/hashing'
import { createUser, deleteUser, getAllUsers } from './user'

export async function GET() {
  const userlist = await getAllUsers()
  return NextResponse.json({
    status: 200,
    data: userlist
  })
}

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
  try {
    if (!name || !surname || !email || !password)
      throw new Error('Parametros faltando')
    const hashedPass = await hashpass(password)
    await createUser(name, surname, email, hashedPass)
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
    data: 'Usuário criado com sucesso'
  })
}

export async function DELETE(request: Request) {
  const data = await request.json()
  const size = Object.keys(data).length
  if (size < 1) {
    return NextResponse.json({
      status: 400,
      data: 'Dados não recebidos'
    })
  }
  const { email } = data
  try {
    if (!email) throw new Error('Parametros faltando')
    await deleteUser(email)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 400,
        data: 'Erro ao deletar usuário',
        error: error.message
      })
    }
  }

  return NextResponse.json({
    status: 200,
    data: 'Usuário deletado com sucesso'
  })
}
