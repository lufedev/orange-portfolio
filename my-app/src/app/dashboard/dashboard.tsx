'use client'
import React from 'react'
import CardProfile from '../components/CardProfile'
import Header from '../components/Header'
import AvatarUser from '.././assets/img/avatar.svg'
import { User, Session } from '../lib/definiton'
import { TextFieldTheme } from '../themes/TextField'
import { ThemeProvider } from '@mui/material/styles'
import { TextField } from '@mui/material'
import ModalAddProject from '../components/ModalAddProject'
import UserPortfolio from '../components/UserPorfolio'

export default function Home({ sessionData }: Session) {
  const [modalOpen, setModalOpen] = React.useState(false)

  const user: User = {
    name: sessionData.name,
    email: sessionData.email,
    image: AvatarUser
  }

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
        <ModalAddProject states={modalOpen} onClose={closeModal} />
        <div className="w-full mb-6">
          <h4 className="h6 text-color-neutral-130 mb-4">Meus projetos</h4>
          <ThemeProvider theme={TextFieldTheme}>
            <TextField
              name="Buscar tags"
              label="Buscar tags"
              variant="outlined"
              size="medium"
              className="w-full sm:w-[32rem]"
              type="text"
            />
          </ThemeProvider>
          <UserPortfolio />
        </div>
      </div>
    </div>
  )
}
