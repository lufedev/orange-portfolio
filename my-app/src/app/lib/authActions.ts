'use server'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { options } from '../api/auth/[...nextauth]/options'

export async function checkSessionAndRedirect() {
  const session = await getServerSession(options)
  if (session) {
    redirect('/')
  }
}
