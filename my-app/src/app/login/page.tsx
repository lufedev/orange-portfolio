'use client'
import GoogleLogin from '../components/GoogleLogin'
import LoginForm from '../components/LoginForm'
import Image from 'next/image'
import imgLogin from '../assets/img/img-login.svg'
import CustomSnackbar from '../components/CustomSnackbar'
import { useEffect, useState } from 'react'
import { TypeSnackbarInfo } from '../lib/definiton'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Login() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession()
      if (session) {
        setIsUserLoggedIn(true)
      }
    }
    fetchData()
  }, [])

  if (isUserLoggedIn) {
    redirect('/')
  }
  const [snackbarInfo, setSnackbarInfo] = useState({
    status: false,
    message: '',
    severity: ''
  })

  const handleSnackbarUpdate = (snackbarInfo: TypeSnackbarInfo) => {
    setSnackbarInfo(snackbarInfo)
  }

  return (
    <>
      <div className="flex items-center justify-between h-screen">
        <Image
          src={imgLogin}
          alt=""
          width={525}
          height={832}
          className="hidden md:block relative bottom-0 left-0 h-full w-auto"
        />
        <div className="w-full px-6 md:pr-[8.44rem] md:pl-[6.44rem]">
          <CustomSnackbar
            handleClose={() =>
              setSnackbarInfo({
                ...snackbarInfo,
                status: false
              })
            }
            state={snackbarInfo.status}
            text={snackbarInfo.message}
            severity={snackbarInfo.severity}
          />
          <div className="w-full h-screen flex flex-col justify-center">
            <h5 className="h5 text-color-principal-90 text-center mb-8 md:h3">
              Entre no Orange Portfólio
            </h5>
            <div>
              <GoogleLogin />
              <LoginForm onSnackbarUpdate={handleSnackbarUpdate} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
