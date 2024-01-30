'use client'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { TextFieldTheme } from '../themes/TextField'
import { ThemeProvider } from '@mui/material/styles'
import CustomButton from './CustomButton'
import CustomSnackbar from './CustomSnackbar'
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
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function LoginForm() {
  const [handleState, setHandleState] = useState(false)
  const [error, setError] = useState({ status: false, type: '', message: '' })
  const [email, setEmail] = useState('')
  const [handleLoading, setHandleLoading] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setHandleState(false)
  }

  if (isUserLoggedIn) {
    redirect('/dashboard')
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleLogin = async () => {
    setHandleLoading(true)
    const loginStatus = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    if (loginStatus?.ok) {
      setIsUserLoggedIn(true)
    } else {
      if (loginStatus?.error?.includes('Email')) {
        setError({
          status: true,
          type: 'email',
          message: loginStatus?.error as string
        })
      } else {
        setError({
          status: true,
          type: 'pass',
          message: loginStatus?.error as string
        })
      }
    }
    setHandleLoading(false)
    setHandleState(true)
  }
  return (
    <div className="flex flex-col">
      <p className="my-8 subtitle-1 text-color-neutral-110">
        Faça login com email
      </p>
      <ThemeProvider theme={TextFieldTheme}>
        <TextField
          label="Email address"
          variant="outlined"
          size="medium"
          className="mb-4"
          type="email"
          onChange={handleEmailChange}
          error={error.status && error.type === 'email'}
          helperText={error.type === 'email' ? error.message : null}
        />
        <FormControl variant="outlined" className="mb-4">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handlePasswordChange}
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
            error={error.status && error.type === 'pass'}
          />
          {error.status && (
            <FormHelperText id="outlined-adornment-password-helper">
              {error.type === 'pass' ? error.message : null}
            </FormHelperText>
          )}
        </FormControl>
      </ThemeProvider>
      <CustomButton
        theme={true}
        variant="contained"
        color="primary"
        size="large"
        disabled={false}
        name="ENTRAR"
        loading={handleLoading}
        onClick={handleLogin}
      />
      <CustomSnackbar
        handleClose={handleClose}
        state={handleState}
        text="Cadastro feito com sucesso"
        severity="success"
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
