import { ThemeProvider } from '@mui/material/styles'
import { TypeButton } from '../lib/definiton'
import { ContainedTheme, TextTheme } from '../themes/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import React, { useState } from 'react'

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
  return (
    <ThemeProvider theme={theme ? ContainedTheme : TextTheme}>
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
