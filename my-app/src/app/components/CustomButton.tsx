'use client'

import { ThemeProvider } from '@mui/material/styles'
import { TypeButton } from '../lib/definiton'
import { ContainedTheme, TextTheme } from '../themes/Button'
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
  const [state, setState] = React.useState(false)
  const { vertical, horizontal, open } = state

  const handleClick = () => () => {
    setState(true)
  }

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
