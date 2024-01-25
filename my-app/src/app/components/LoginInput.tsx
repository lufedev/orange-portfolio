import { ThemeProvider } from '@mui/material/styles'
import { TextField } from '@mui/material'
import ButtonTheme from './CustomButton'
import { TextFieldTheme } from '../themes/TextField'

export default function LoginInput() {
  return (
    <div className="flex flex-col">
      <h5 className="mb-4 h5 text-color-neutral-110">Faça login com email</h5>
      <ThemeProvider theme={TextFieldTheme}>
        <TextField
          label="Email address"
          variant="outlined"
          size="medium"
          className="mb-4"
        />
        <TextField
          label="Password"
          variant="outlined"
          size="medium"
          className="mb-4"
        />
      </ThemeProvider>
      <ButtonTheme
        variant="contained"
        color="primary"
        size="large"
        name="ENTRAR"
      ></ButtonTheme>
      <a
        href="https://www.youtube.com/"
        className="subtitle-1 text-color-neutral-100"
      >
        Cadastre-se
      </a>
    </div>
  )
}
