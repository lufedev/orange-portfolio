import GoogleLogin from '../components/GoogleLogin'
import LoginForm from '../components/LoginForm'
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import imgLogin from '../assets/img/img-login.svg'

export default async function Login() {
  const session = await getServerSession(options)
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex items-center justify-between h-screen">
      <Image
        src={imgLogin}
        alt=""
        className="hidden md:block relative bottom-0 left-0 h-full w-auto"
      />
      <div className="w-full px-6 md:pr-[8.44rem] md:pl-[6.44rem]">
        <h5 className="h5 text-color-principal-90 text-center mb-8 md:h3">
          Entre no Orange Portfólio
        </h5>
        <div>
          <GoogleLogin />
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
