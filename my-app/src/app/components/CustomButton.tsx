'use client'

import { ThemeProvider } from '@mui/material/styles'
import { TypeButton } from '../lib/definiton'
import { ContainedTheme, DisabledTheme, TextTheme } from '../themes/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import * as React from 'react'

export default function CustomButton({
  theme,
  variant,
  color,
  size,
  disabled,
  name,
  loading,
  onClick
}: TypeButton) {
  const getTheme = (theme: string) => {
    if (theme === 'contained') {
      return ContainedTheme
    } else if (theme === 'text') {
      return TextTheme
    } else if (theme === 'disabled') {
      return DisabledTheme
    } else {
      return ContainedTheme // Defina um tema padrão, se necessário
    }
  }
  return (
    <ThemeProvider theme={getTheme(theme)}>
      <LoadingButton
        variant={variant}
        color={color}
        size={size}
        onClick={onClick}
        loading={loading}
        disabled={disabled}
      >
        {name}
      </LoadingButton>
    </ThemeProvider>
  )
}
