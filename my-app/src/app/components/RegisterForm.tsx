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
import SuccessModel from './SuccessModal'

interface RegisterData {
  name?: string
  surname?: string
  email?: string
  password?: string
}

export default function RegisterForm() {
  const [success, setSuccess] = useState(false)
  const [modalOpen, setModalOpen] = useState(true)
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
    redirect('/login')
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
      return
    }
    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      })
      console.log(response)
      if (!response.ok) {
        throw new Error('Erro ao registrar usuário')
      }
      setModalOpen(true)
      console.log('Usuário registrado com sucesso!')
      setSuccess(true)
    } catch (error) {
      console.error('Erro durante o registro: ', error)
    }
  }
  return (
    <div className="flex flex-col">
      <SuccessModel status={modalOpen} titulo="Cadastro"></SuccessModel>
      <ThemeProvider theme={TextFieldTheme}>
        <TextField
          name="name"
          label="Nome"
          variant="outlined"
          size="medium"
          className="mb-4"
          type="text"
          onChange={handleRegisterChange}
          error={error.name.status}
          helperText={error.name.message}
        />
        <TextField
          name="surname"
          label="Sobrenome"
          variant="outlined"
          size="medium"
          className="mb-4"
          type="text"
          onChange={handleRegisterChange}
          error={error.surname.status}
          helperText={error.surname.message}
        />
        <TextField
          name="email"
          label="Email address"
          variant="outlined"
          size="medium"
          className="mb-4"
          type="email"
          onChange={handleRegisterChange}
          error={error.email.status}
          helperText={error.email.message}
        />
        <FormControl variant="outlined" className="mb-4">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleRegisterChange}
            error={error.password.status}
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
        theme={true}
        variant="contained"
        color="primary"
        size="large"
        disabled={false}
        name="CADASTRAR"
        onClick={handleRegister}
      />
    </div>
  )
}
