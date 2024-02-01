import { redirect } from 'next/navigation'
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

export default async function Dashboard() {
  const session = await getServerSession(options)
  console.log(session + 'dentro da Dashboard')

  if (!session) {
    redirect('/login')
  }
  return (
    <>
      {session ? (
        <>
          <h1> LOGADO !</h1>
          <h2> {session.user?.email} </h2>
          <h2> {session.user?.name} </h2>
          <a href="/api/auth/signout">Sair</a>
        </>
      ) : (
        <h1> NÃO LOGADO !</h1>
      )}
    </>
  )
}
