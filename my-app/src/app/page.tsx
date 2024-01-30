import CardProfile from "./components/CardProfile";
import Header from "./components/Header";
import AvatarUser from './assets/img/avatar.svg';
import { User } from "./lib/definiton";
import { TextFieldTheme } from './themes/TextField'
import { ThemeProvider } from '@mui/material/styles'
import {
  TextField
} from '@mui/material'

const user: User = {
  name: 'Camila',
  surname: 'Soares',
  email: 'Camila.ux@gmail.com',
  password: '123456',
  country: 'Brasil',
  image: AvatarUser
}

export default function Home() {

  return (
    <div>
      <Header user={user} />
      <div className="flex flex-col items-start justify-start mt-[112px] mx-6 gap-8">
        <CardProfile user={user} />
        <div className="flex flex-col align-start justify-around content-around items-start gap-5">
          <h4 className="h6 text-color-neutral-130 font-medium">Meus projetos</h4>
          <ThemeProvider theme={TextFieldTheme}>
            <TextField
              name="Buscar tags"
              label="Buscar tags"
              variant="outlined"
              size="medium"
              className="mb-4 w-full sm:w-[512px] md:w-[513px]"
              type="text"
            />
          </ThemeProvider>
        </div>

      </div>

    </div>
  )
}
