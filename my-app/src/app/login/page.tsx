import GoogleLoginButton from '../components/GoogleLoginButton'
import LoginForm from '../components/LoginForm'
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export default async function Login() {
  const session = await getServerSession(options)
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col justify-center h-lvh">
      <div className="px-6 flex flex-col">
        <h5 className="h5 text-color-principal-90 text-center mb-8">
          Entre no Orange Portfólio
        </h5>
        <GoogleLoginButton className="mb-8" />
        <LoginForm />
      </div>
    </div>
  )
}
