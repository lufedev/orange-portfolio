'use client'

import { ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { TypeButton } from '../lib/definiton'
import { ButtonTheme } from '../themes/Button'

export default function CustomButton({
  variant,
  color,
  size,
  name
}: TypeButton) {
  return (
    <ThemeProvider theme={ButtonTheme}>
      <Button variant={variant} color={color} size={size}>
        {name}
      </Button>
    </ThemeProvider>
  )
}
