'use client'

import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import Image from 'next/image'
import LogoGoogle from '../assets/img/logo-google.svg'
import LogoGoogleGray from '../assets/img/logo-google-gray.svg'

export default function GoogleLogin() {
  const [isButtonEnabled, setIsButtonEnabled] = useState(true)
  setIsButtonEnabled(true)
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse)
  })

  const handleButtonClick = () => {
    login()
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-[181px] p-[0.1875rem] ${isButtonEnabled ? 'hover:bg-[rgba(66,133,244,0.1)]' : ''} active:bg-transparent`}
      >
        <button
          type="submit"
          aria-label="awdwadawd"
          onClick={handleButtonClick}
          className="GoogleLoginButton"
          disabled={!isButtonEnabled}
        >
          <Image
            src={isButtonEnabled ? LogoGoogle : LogoGoogleGray}
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
