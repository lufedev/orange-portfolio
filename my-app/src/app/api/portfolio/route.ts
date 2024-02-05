'use server'
import { NextResponse } from 'next/server'
import {
  createPortfolio,
  deletePortfolio,
  editPortfolio,
  getAllPortfoliosFromUser
} from './portfolio'

export async function GET() {
  const data = await getAllPortfoliosFromUser()
  return NextResponse.json({
    status: 200,
    data: data
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
  if (data.imagepath === undefined || data.imagepath === null) {
    data.imagepath = ''
  }
  const { title, tags, link, description, imagepath } = data
  try {
    if (!title || !tags || !link || !description)
      throw new Error('Parametros faltando')
    const response = await createPortfolio(
      title,
      tags,
      link,
      description,
      imagepath
    )
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Parametros faltando') {
        return NextResponse.json({
          status: 400,
          data: error.message
        })
      }
    }
  }

  return NextResponse.json({
    data: 'Portfolio adicionado'
  })
}

export async function DELETE(request: Request) {
  const data = await request.json()
  const size = Object.keys(data).length
  if (size < 1) {
    return NextResponse.json({
      status: 400,
      data: 'No data received'
    })
  }
  const { id } = data
  try {
    if (!id) throw new Error('Parametros faltando')
    await deletePortfolio(id)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Parametros faltando') {
        return NextResponse.json({
          status: 400,
          data: error.message
        })
      }
    }
  }
  return NextResponse.json({
    data: 'Portfolio deletado'
  })
}

export async function PUT(request: Request) {
  const data = await request.json()
  const size = Object.keys(data).length
  if (size < 1) {
    return NextResponse.json({
      status: 400,
      data: 'No data received'
    })
  }
  if (data.imagepath === undefined || data.imagepath === null) {
    data.imagepath = ''
  }
  const { id, title, tags, link, description, imagepath } = data
  try {
    if (!id || !title || !tags || !link || !description)
      throw new Error('Parametros faltando')
    await editPortfolio(id, title, tags, link, description, imagepath)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Parametros faltando') {
        return NextResponse.json({
          status: 400,
          data: error.message
        })
      }
    }
  }
  return NextResponse.json({
    data: 'Portfolio editado'
  })
}
