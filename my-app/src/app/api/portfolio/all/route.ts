'use server'
import { getAllPortfolios } from '../portfolio'
import { NextResponse } from 'next/server'
export async function GET() {
  const data = await getAllPortfolios()
  return NextResponse.json({
    status: 200,
    data: data
  })
}
