import { Theme } from '@mui/material/styles'

interface CustomColorOptions {
  light: string
  main: string
  dark: string
  contrastText: string
}

export interface CustomTheme extends Theme {
  palette: {
    default?: CustomColorOptions
    colorPrincipal?: CustomColorOptions
    colorSecondary?: CustomColorOptions
    colorNeutral?: CustomColorOptions
    colorSucess?: CustomColorOptions
    colorAlert?: CustomColorOptions
    colorError?: CustomColorOptions
    colorInfo?: CustomColorOptions
  }
}
