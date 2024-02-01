'use client'
import RegisterForm from '../components/RegisterForm'
import Image from 'next/image'
import imgRegister from '../assets/img/img-cadastro.svg'
import { TypeSnackbarInfo } from '../lib/definiton'
import { useState } from 'react'
import CustomSnackbar from '../components/CustomSnackbar'

export default function Register() {
  const [snackbarInfo, setSnackbarInfo] = useState({
    status: false,
    message: '',
    severity: ''
  })

  const handleSnackbarUpdate = (snackbarInfo: TypeSnackbarInfo) => {
    setSnackbarInfo(snackbarInfo)
  }
  return (
    <div className="flex items-center justify-between h-screen">
      <Image
        src={imgRegister}
        alt=""
        className="hidden md:block relative bottom-0 left-0 h-full w-auto"
      />
      <div className="w-full px-6 md:pr-[8.44rem] md:pl-[4.94rem]">
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
            Cadastre-se
          </h5>
          <div>
            <RegisterForm onSnackbarUpdate={handleSnackbarUpdate} />
          </div>
        </div>
      </div>
    </div>
  )
}
