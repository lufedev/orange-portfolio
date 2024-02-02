'use client'
import { createTheme } from '@mui/material/styles'

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

export const DisabledTheme = createTheme({
  palette: {
    primary: {
      main: '#0000001F',
      contrastText: '#00000061'
    },
    secondary: {
      main: '#E6E9F2',
      contrastText: '#303133'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        }
      }
    }
  }
})

export const ChipTheme = createTheme({
  palette: {
    primary: {
      main: '#00000014',
      contrastText: '#000000DE'
    },

  }
})

export const SnackBar = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  }
})
