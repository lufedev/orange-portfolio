import { createTheme } from '@mui/material'

export const ContainedTheme = createTheme({
  palette: {
    primary: {
      main: '#FF5522',
      dark: '#CC4400'
    },
    secondary: {
      main: '#444466',
      dark: '#222244'
    },
    error: {
      main: '#DD0000',
      dark: '#BB0000'
    }
  }
})

export const TextTheme = createTheme({
  palette: {
    primary: {
      main: '#2196F3'
    }
  }
})
