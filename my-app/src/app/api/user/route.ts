import { NextResponse } from 'next/server'
import hashpass from '../../security/hashing'
import { createUser, deleteUser, editUser, getAllUsers } from './user'

const ERROR_MESSAGES = {
  missingData: 'Dados não recebidos',
  unauthorized: 'Usuário não autorizado',
  notFound: 'Usuário não encontrado',
  conflict: 'Usuário já existe',
  incompleteData: 'Dados incompletos'
}

export async function GET() {
  const userlist = await getAllUsers()
  return NextResponse.json({
    data: userlist
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  const size = Object.keys(data).length
  if (size < 1) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.missingData },
      { status: 400 }
    )
  }

  const { name, surname, email, password } = data
  try {
    if (!name || !surname || !email || !password)
      throw new Error(ERROR_MESSAGES.incompleteData)
    const hashedPass = await hashpass(password)
    await createUser(name, surname, email, hashedPass)
    return NextResponse.json({ data: 'Usuário criado com sucesso' })
  } catch (error) {
    return handleErrors(error)
  }
}

export async function PUT(request: Request) {
  const data = await request.json()
  const size = Object.keys(data).length
  if (size < 1) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.missingData },
      { status: 400 }
    )
  }

  const { name, surname, email, password } = data
  if (!name || !surname || !email || !password) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.incompleteData },
      { status: 400 }
    )
  }

  try {
    await editUser(name, surname, email, password)
    return NextResponse.json({
      status: 200,
      data: 'Usuário editado com sucesso'
    })
  } catch (error) {
    return handleErrors(error)
  }
}

export async function DELETE(request: Request) {
  const data = await request.json()
  const size = Object.keys(data).length
  if (size < 1) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.missingData },
      { status: 400 }
    )
  }

  const { email } = data
  try {
    if (!email) throw new Error(ERROR_MESSAGES.incompleteData)
    await deleteUser(email)
    return NextResponse.json({ data: 'Usuário deletado com sucesso' })
  } catch (error) {
    return handleErrors(error)
  }
}

function handleErrors(error) {
  if (error instanceof Error) {
    if (error.message === ERROR_MESSAGES.notFound) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    } else if (error.message === ERROR_MESSAGES.unauthorized) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    } else if (error.message === ERROR_MESSAGES.conflict) {
      return NextResponse.json({ error: error.message }, { status: 409 })
    } else {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
  }
}
