'use client'
import * as React from 'react'
import CardProfile from './components/CardProfile'
import Header from './components/Header'
import AvatarUser from './assets/img/avatar.svg'
import { Project, User } from './lib/definiton'
import { TextFieldTheme } from './themes/TextField'
import { ThemeProvider } from '@mui/material/styles'
import { TextField } from '@mui/material'
import ModalAddProject from './components/ModalAddProject'

const user: User = {
  name: 'Camila',
  surname: 'Soares',
  email: 'Camila.ux@gmail.com',
  password: '123456',
  country: 'Brasil',
  image: AvatarUser,
  projects: [
    {
      id: 1,
      title: 'Ecommerce One Page',
      tags: ['UX', 'Web'],
      link: 'https://gumroad.com/products/wxCSL',
      description:
        'Temos o prazer de compartilhar com vocês uma variação da nosso primeiro recurso gratuito, Monoceros.',
      urlImage: 'https://i.imgur.com/r4BfaqF.png'
    }
  ]
}

const project: Project = user.projects[0]

export default function Home() {
  const [modalOpen, setModalOpen] = React.useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div>
      <Header user={user} />
      <div className="flex flex-col items-center justify-start mt-14 mx-6 gap-10">
        <CardProfile user={user} onClick={openModal} />
        <ModalAddProject project={project} states={modalOpen} onClose={closeModal} />
        <div className="w-full mb-6">
          <h4 className="h6 text-color-neutral-130 mb-4">Meus projetos</h4>
          <ThemeProvider theme={TextFieldTheme}>
            <TextField
              name="Buscar tags"
              label="Buscar tags"
              variant="outlined"
              size="medium"
              className="w-full"
              type="text"
            />
          </ThemeProvider>
        </div>
      </div>
    </div>
  )
}
