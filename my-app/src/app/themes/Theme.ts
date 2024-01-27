import { createTheme } from '@mui/material'
import { CustomTheme } from '../lib/theme'

export const MainTheme: CustomTheme = createTheme({
  palette: {
    primary: {
      light: '#EDEFF2',
      main: '#111133',
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#FFEECC',
      main: '#FF5522',
      dark: '#993300',
      contrastText: '#FFFFFF'
    },
    neutral: {
      light: '#FCFDFF',
      main: '#818388',
      dark: '#303133',
      contrastText: '#FFFFFF'
    },
    success: {
      light: '#EEFFBB',
      main: '#229922',
      dark: '#004422',
      contrastText: '#FFFFFF'
    },
    alert: {
      light: '#FFFFCC',
      main: '#FFCC00',
      dark: '#664400',
      contrastText: '#FFFFFF'
    },
    error: {
      light: '#FFDDCC',
      main: '#DD0000',
      dark: '#660000',
      contrastText: '#FFFFFF'
    },
    info: {
      light: '#ADCBFA',
      main: '#2348B1',
      dark: '#091862',
      contrastText: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: 'roboto'
  }
})
