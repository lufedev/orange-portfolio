'use client'

import { ThemeProvider } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import { TypeChip } from '../lib/definiton'
import { MainTheme } from '../themes/Theme'

export default function CustomChip({
  variant,
  color,
  size,
  disabled,
  className,
  label,
  onDelete
}: TypeChip) {
  return (
    <ThemeProvider theme={MainTheme}>
      {/* @ts-expect-error Não consigo resolver, e é necessário para compilar */}
      <Chip
        variant={variant}
        color={color}
        size={size}
        disabled={disabled}
        className={className}
        label={label}
        clickable
        onDelete={onDelete}
      />
    </ThemeProvider>
  )
}
