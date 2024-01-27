'use client'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { redirect } from 'next/navigation'
import { TextFieldTheme } from '../themes/TextField'
import { ThemeProvider } from '@mui/material/styles'
import CustomButton from './CustomButton'
import React, { useState } from 'react'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material'
import { signIn } from 'next-auth/react'

export default function LoginInput() {
  const [value, setValue] = useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/dashboard'
    })
  }

  return (
    <div className="flex flex-col w-1/2 m-auto mt-4	">
      <h5 className="mb-8 h5 text-color-neutral-110">Faça login com email</h5>
      <ThemeProvider theme={TextFieldTheme}>
        <TextField
          label="Email address"
          variant="outlined"
          size="medium"
          className="mb-4"
          type="email"
          onChange={handleEmailChange}
        />
        <FormControl variant="outlined" className="mb-4">
          <InputLabel htmlFor="outlined-adornment-password">
            Password *
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
          />
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
        href="https://www.youtube.com/"
        className="subtitle-1 text-color-neutral-100 !no-underline"
      >
        Cadastre-se
      </a>
    </div>
  )
}
