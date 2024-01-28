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
  name
}: TypeButton) {
  return (
    <ThemeProvider theme={theme ? ContainedTheme : TextTheme}>
      <Button
        variant={variant}
        color={color}
        size={size}
        disabled={disabled}
      >
        {name}
      </Button>
    </ThemeProvider>
  )
}
