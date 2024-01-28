'use client'

import { useGoogleLogin } from '@react-oauth/google'
import Image from 'next/image'
import LogoGoogle from '../assets/img/logo-google.svg'

export default function GoogleLoginButton() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse)
  })

  return (
    <div className="flex justify-center items-center">
      <div className="w-[181px] p-[0.1875rem] hover:bg-[rgba(66,133,244,0.1)] hover:rounded-sm active:bg-transparent">
        <button
          type="submit"
          aria-label="awdwadawd"
          onClick={() => login()}
          className="GoogleLoginButton"
        >
          <Image
            src={LogoGoogle}
            alt=""
            width={18}
            height={18}
            className="mr-6"
          />
          Entrar com Google
        </button>
      </div>
    </div>
  )
}
