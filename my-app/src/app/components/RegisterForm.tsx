'use client'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { TextFieldTheme } from '../themes/TextField'
import { ThemeProvider } from '@mui/material/styles'
import CustomButton from './CustomButton'
import React, { useState } from 'react'
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material'
import { redirect } from 'next/navigation'
import { FormProps } from '../lib/definiton'

interface RegisterData {
  name?: string
  surname?: string
  email?: string
  password?: string
  [key: string]: string | undefined
}

export default function RegisterForm({ onSnackbarUpdate }: FormProps) {
  const [success, setSuccess] = useState(false)
  const [handleLoading, setHandleLoading] = useState(false)
  const [error, setError] = useState({
    name: { status: false, message: '' },
    surname: { status: false, message: '' },
    email: { status: false, message: '' },
    password: { status: false, message: '' }
  })
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    surname: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = React.useState(false)

  if (success) {
    redirect('http://localhost:3000/login?success=true')
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setRegisterData((prevState) => {
      const updatedData = { ...prevState, [name]: value }
      return updatedData
    })
  }

  const handleRegister = async () => {
    setHandleLoading(true)
    const fields = ['name', 'surname', 'email', 'password']
    let hasError = false
    fields.forEach((field) => {
      if (registerData[field] === '' || !registerData[field]) {
        setError((prevState) => {
          const updatedError = {
            ...prevState,
            [field]: { status: true, message: 'Campo obrigatório' }
          }
          return updatedError
        })
        hasError = true
      } else {
        setError((prevState) => {
          const updatedError = {
            ...prevState,
            [field]: { status: false, message: '' }
          }
          return updatedError
        })
      }
    })
    if (hasError) {
      return setHandleLoading(false)
    }
    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      })
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('Email já cadastrado')
        } else {
          throw new Error('Ocorreu um erro ao tentar realizar o cadastro')
        }
      }
      setSuccess(true)
    } catch (error) {
      if (error instanceof Error) {
        onSnackbarUpdate({
          status: true,
          message: error.message,
          severity: 'error'
        })
      }
    }
    setHandleLoading(false)
  }
  return (
    <div className="flex flex-col">
      <ThemeProvider theme={TextFieldTheme}>
        <div className="block md:flex">
          <TextField
            name="name"
            label="Nome"
            variant="outlined"
            size="medium"
            className="mb-4 w-full md:w-[50%] md:mr-[1.13rem]"
            type="text"
            value={registerData.name}
            onChange={handleRegisterChange}
            error={error.name.status}
            helperText={error.name.message}
          />
          <TextField
            name="surname"
            label="Sobrenome"
            variant="outlined"
            size="medium"
            className="mb-4 w-full md:w-[50%]"
            type="text"
            onChange={handleRegisterChange}
            value={registerData.surname}
            error={error.surname.status}
            helperText={error.surname.message}
          />
        </div>
        <TextField
          name="email"
          label="Email address"
          variant="outlined"
          size="medium"
          className="mb-4"
          type="email"
          onChange={handleRegisterChange}
          value={registerData.email}
          error={error.email.status}
          helperText={error.email.message}
        />
        <FormControl
          variant="outlined"
          className="mb-4"
          error={error.password.status}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleRegisterChange}
            value={registerData.password}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password *"
          />
          {error.password.status && (
            <FormHelperText id="outlined-adornment-password-helper">
              {error.password.message}
            </FormHelperText>
          )}
        </FormControl>
      </ThemeProvider>
      <CustomButton
        theme="ContainedTheme"
        variant="contained"
        color="primary"
        size="large"
        loading={handleLoading}
        disabled={false}
        name="CADASTRAR"
        onClick={handleRegister}
      />
      <a
        href="../register"
        className="subtitle-1 mt-[1.13rem] text-color-neutral-100 !no-underline"
      ></a>
    </div>
  )
}
