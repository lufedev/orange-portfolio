import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'

export default async function Home() {
  return (
    <div className="bg-red-800">
      <h1 className="text-color-principal-90">awdadadawda</h1>
      <h1>HOME</h1>
      <h1>HOME</h1>
      <h1>HOME</h1>
    </div>
  )
}
