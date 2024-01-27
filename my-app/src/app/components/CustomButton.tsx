'use client'

import { ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { TypeButton } from '../lib/definiton'
import { ContainedTheme, TextTheme } from '../themes/Button'

export default function CustomButton({
  theme,
  variant,
  color,
  size,
  disabled,
  className,
  name,
  onClick
}: TypeButton) {
  return (
    <ThemeProvider theme={theme ? ContainedTheme : TextTheme}>
      <Button
        onClick={onClick}
        variant={variant}
        color={color}
        size={size}
        disabled={disabled}
        className={className}
      >
        {name}
      </Button>
    </ThemeProvider>
  )
}
