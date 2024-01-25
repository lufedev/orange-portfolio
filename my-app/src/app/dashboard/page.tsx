import { redirect } from 'next/navigation'
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

export default async function Dashboard() {
  const session = await getServerSession(options)
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/dashboard')
  }
  return <>{session ? <h1> LOGADO !</h1> : <h1> NÃO LOGADO !</h1>}</>
}
