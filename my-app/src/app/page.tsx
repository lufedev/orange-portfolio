import * as React from 'react'
import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import Home from './dashboard/dashboard'

export default async function Dashboard() {
  const session = await getServerSession(options)
  const user = session?.user
  if (!session) {
    redirect('/login')
  }

  //@ts-expect-error  Ignorando Props Obrigatórias
  return <Home sessionData={user} />
}
