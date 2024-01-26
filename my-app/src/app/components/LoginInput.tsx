import { ThemeProvider } from '@mui/material/styles'
import { TextField } from '@mui/material'
import CustomButton from './CustomButton'

export default function LoginInput() {
  return (
    <div className="flex flex-col">
      <h5 className="mb-8 h5 text-color-neutral-110">Faça login com email</h5>
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
      <CustomButton
        theme={true}
        variant="contained"
        color="primary"
        size="large"
        disabled={false}
        name="LABEL"
        className="mb-[1.13rem]"
      />
      <a
        href="https://www.youtube.com/"
        className="subtitle-1 text-color-neutral-100"
      >
        Cadastre-se
      </a>
    </div>
  )
}