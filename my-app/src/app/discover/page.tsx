import * as React from 'react'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'
import Discover from './discover'
import { options } from '../api/auth/[...nextauth]/options'

export default async function Dashboard() {
  const session = await getServerSession(options)
  if (!session) {
    redirect('/login')
  }

  return <Discover />
}
