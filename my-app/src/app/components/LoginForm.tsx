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
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function LoginForm() {
  const [error, setError] = useState({ status: false, message: '' })
  const [email, setEmail] = useState('')
  const [userLogged, setUserLogged] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = React.useState(false)

  if (userLogged) {
    redirect('/dashboard')
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  //LOGIN API FUNCTION
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
    if (loginStatus?.ok) {
      setUserLogged(true)
    } else {
      setError({ status: true, message: loginStatus?.error as string })
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
          error={error.status}
          helperText={error.message}
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
            error={error.status}
          />
          {error.status && (
            <FormHelperText id="outlined-adornment-password-helper">
              {error.message}
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
