"use client";
import { createTheme } from '@mui/material/styles';


export const TextFieldTheme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#515255', // Cor padrão do label
        },
    
      },
    },
  },
  
  palette: {
    primary: {
      main: '#FF5522',
      dark: '#CC4400'
    }
  }
})
