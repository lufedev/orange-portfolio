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
  name
}: TypeButton) {
  
  return (

    <ThemeProvider theme={theme ? ContainedTheme : TextTheme}>
      <Button variant={variant} color={color} size={size} disabled={disabled} className={className} >
        {name}
      </Button>
    </ThemeProvider>
  )
}
