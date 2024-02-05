'use server'
import { NextResponse } from 'next/server'
import {
  createPortfolio,
  deletePortfolio,
  editPortfolio,
  getAllPortfoliosFromUser
} from './portfolio'

const ERROR_MESSAGES = {
  missingData: 'Dados não recebidos',
  notFound: 'Projeto não encontrado',
  unauthorized: 'Usuário não autorizado',
  incompleteData: 'Parametros faltando'
}

export async function GET() {
  try {
    const data = await getAllPortfoliosFromUser()
    return NextResponse.json({
      status: 200,
      data: data
    })
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(request: Request) {
  const data = await request.json()
  if (Object.keys(data).length < 5) {
    return NextResponse.json(
      { data: ERROR_MESSAGES.missingData },
      { status: 400 }
    )
  }

  if (!data.imagepath) {
    data.imagepath = ''
  }

  const { title, tags, link, description, imagepath } = data
  try {
    if (!title || !tags || !link || !description) {
      throw new Error(ERROR_MESSAGES.incompleteData)
    }
    await createPortfolio(title, tags, link, description, imagepath)
    return NextResponse.json({ data: 'Projeto adicionado' })
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(request: Request) {
  const data = await request.json()
  if (Object.keys(data).length < 1) {
    return NextResponse.json(
      { data: ERROR_MESSAGES.missingData },
      { status: 400 }
    )
  }

  const { id } = data
  try {
    if (!id) {
      throw new Error(ERROR_MESSAGES.incompleteData)
    }
    await deletePortfolio(id)
  } catch (error) {
    return handleError(error)
  }
  return NextResponse.json({ data: 'Projeto deletado' })
}

export async function PUT(request: Request) {
  const data = await request.json()
  if (Object.keys(data).length < 1) {
    return NextResponse.json({ status: 400, data: ERROR_MESSAGES.missingData })
  }

  if (!data.imagepath) {
    data.imagepath = ''
  }

  const { id, title, tags, link, description, imagepath } = data
  try {
    if (!id || !title || !tags || !link || !description) {
      throw new Error(ERROR_MESSAGES.incompleteData)
    }
    await editPortfolio(id, title, tags, link, description, imagepath)
  } catch (error) {
    return handleError(error)
  }
  return NextResponse.json({ data: 'Projeto editado' })
}

function handleError(error) {
  if (error instanceof Error) {
    if (error.message === ERROR_MESSAGES.notFound) {
      return NextResponse.json({ data: error.message }, { status: 404 })
    } else if (error.message === ERROR_MESSAGES.unauthorized) {
      return NextResponse.json({ data: error.message }, { status: 403 })
    } else {
      return NextResponse.json({ data: error.message }, { status: 400 })
    }
  }
}
