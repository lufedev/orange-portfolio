'use client'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { TextFieldTheme } from '../themes/TextField'
import { ThemeProvider } from '@mui/material/styles'
import CustomButton from './CustomButton'
import React, { useEffect, useState } from 'react'
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
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

export default function LoginForm() {
  const [error, setError] = useState({ status: false, type: '', message: '' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = React.useState(false)

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
    const loginStatus = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    if (!loginStatus?.ok) {
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
  }
  return (
    <div className="flex flex-col">
      <p className="mb-8 subtitle-1 text-color-neutral-110">
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
              <InputAdornment position="end">
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
        className="mb-[1.13rem]"
        onClick={handleLogin}
      />
      <a
        href="../register"
        className="subtitle-1 text-color-neutral-100 !no-underline"
      >
        Cadastre-se
      </a>
    </div>
  )
}
