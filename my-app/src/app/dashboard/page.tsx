import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

export default async function Home() {
  const session = await getServerSession(options)
  console.log(session)
  return (
    <div className="bg-red-800">
      <h1>DASHBOARD LEGAL</h1>
      <h1>DASHBOARD LEGAL</h1>
      <h1>DASHBOARD LEGAL</h1>
    </div>
  )
}
