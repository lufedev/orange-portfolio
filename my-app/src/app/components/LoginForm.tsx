'use client'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { TextFieldTheme } from '../themes/TextField'
import { ThemeProvider } from '@mui/material/styles'
import CustomButton from './CustomButton'
import React, { useEffect, useState } from 'react'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { FormProps } from '../lib/definiton'

export default function LoginForm({ onSnackbarUpdate }: FormProps) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [error, setError] = useState({ status: false, message: '' })
  const [login, setLogin] = useState({ email: '', password: '' })
  const [handleLoading, setHandleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    getParams()
  }, [])
  const getParams = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const success = urlParams.get('success')
    if (success === 'true') {
      onSnackbarUpdate({
        status: true,
        message: 'Usuário cadastrado com sucesso!',
        severity: 'success'
      })
    }
    window.history.replaceState({}, document.title, '/login')
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLogin((prevState) => {
      const updatedData = { ...prevState, [name]: value }
      return updatedData
    })
  }

  if (isUserLoggedIn) {
    redirect('/dashboard')
  }

  const handleLogin = async () => {
    setHandleLoading(true)

    const loginStatus = await signIn('credentials', {
      email: login.email,
      password: login.password,
      redirect: false
    })
    if (loginStatus?.ok) {
      setIsUserLoggedIn(true)
    } else {
      if (loginStatus?.error) {
        setError({
          status: true,
          message: loginStatus?.error as string
        })
        onSnackbarUpdate({
          status: true,
          message: 'Usuário ou senha incorretos',
          severity: 'error'
        })
      }
    }

    setHandleLoading(false)
  }
  return (
    <div className="flex flex-col">
      <p className="my-8 subtitle-1 text-color-neutral-110 md:h5">
        Faça login com email
      </p>
      <ThemeProvider theme={TextFieldTheme}>
        <TextField
          name="email"
          label="Email address"
          variant="outlined"
          size="medium"
          className="mb-4"
          type="email"
          value={login.email}
          onChange={handleLoginChange}
          error={error.status}
        />
        <FormControl variant="outlined" className="mb-4" error={error.status}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleLoginChange}
            value={login.password}
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
        </FormControl>
      </ThemeProvider>
      <CustomButton
        theme="ContainedTheme"
        variant="contained"
        color="primary"
        size="large"
        disabled={false}
        name="ENTRAR"
        loading={handleLoading}
        onClick={handleLogin}
      />
      <a
        href="../register"
        className="subtitle-1 mt-[1.13rem] text-color-neutral-100 !no-underline"
      >
        Cadastre-se
      </a>
    </div>
  )
}
