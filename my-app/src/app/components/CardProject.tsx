import Image from 'next/image'
import { UserProps } from '../lib/definiton'
import {
  Button,
  IconButton,
  ListItem,
  Menu,
  Stack,
  ThemeProvider
} from '@mui/material'
import { ChipTheme, MenuTheme } from '../themes/Button'
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
import CustomChip from './CustomChip'
import ModalAddProject from './ModalAddProject'
import { redirect } from 'next/navigation'
import { storage } from '../firebase/firebase'
import NotFoundImageProject from '../assets/img/no-picture-available.svg'
import SuccessModel from './SuccessModal'

export default function CardProject({ user, project, editable }: UserProps) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null
  )
  if (success) {
    redirect('/')
  }
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorElMenu(null)
  }

  const tagsString = project?.tags
  const openModal = () => {
    setModalOpen(true)
    handleCloseMenu()
  }

  const closeModal = () => {
    setModalOpen(false)
  }
  const deleteProject = async () => {
    handleCloseMenu()
    try {
      await fetch('/api/portfolio', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: project?.id })
      })
      setSuccess(true)
      removeImageFromDatabase()
      setShowSuccessModal(true)
    } catch (error) {}
  }

  const removeImageFromDatabase = () => {
    if (project?.imagepath) {
      const imageRef = storage.refFromURL(project?.imagepath as string)
      imageRef
        .delete()
        .then(() => {
          console.log('Imagem removida do Firebase Storage com sucesso.')
        })
        .catch((error) => {
          console.error('Erro ao remover a imagem do Firebase Storage:', error)
        })
    }
  }

  return (
    <div>
      <div className="mb-2 relative">
        <Image
          src={project?.imagepath || NotFoundImageProject}
          alt={project?.title}
          width={312}
          height={258}
          className="w-full h-[19.5rem] md:h-[24.31rem] object-cover"
        />
        <div className="absolute bottom-0 top-0 right-0">
          {editable ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-project"
                aria-haspopup="true"
                color="inherit"
                className="text-color-neutral-120 p-0"
                title="Configurações do projeto"
                onClick={handleOpenMenu}
              >
                <EditIcon className="bg-color-secondary-70 h-[28px] w-[28px] rounded-full p-[5px] mr-4 mt-4" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElMenu)}
                onClose={handleCloseMenu}
                sx={{
                  display: { xs: 'flex' },
                  width: '53%',
                  right: '-50%'
                }}
              >
                <ListItem
                  align-items="flex-star"
                  className="
                                flex flex-col
                                items-start w-full"
                >
                  <ThemeProvider theme={MenuTheme}>
                    <Button onClick={openModal} color="primary">
                      Editar
                    </Button>
                    <Button onClick={deleteProject} color="primary">
                      Excluir
                    </Button>
                    <ModalAddProject
                      editing={true}
                      user={user}
                      project={project}
                      states={modalOpen}
                      onClose={closeModal}
                    />
                  </ThemeProvider>
                </ListItem>
              </Menu>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-[5px]">
          <Image
            src={user.image}
            alt={user.name}
            width={40}
            height={40}
            className="mr-2 rounded"
          />
          <div className="flex flex-col gap-2 md:flex-row">
            <h6 className="subtitle-1 text-color-neutral-120 md:text-color-neutral-110">
              {user.name} {user.sname}
            </h6>
            <p className="subtitle-1 hidden text-color-neutral-110 md:block">
              •
            </p>
            <p className="text-color-neutral-110 subtitle-1">{project?.date}</p>
          </div>
        </div>
        <Stack direction="row" spacing={1}>
          <ThemeProvider theme={ChipTheme}>
            {tagsString &&
              tagsString
                .split(',')
                .map((tag: string) => (
                  <CustomChip
                    key={tag.trim()}
                    variant="filled"
                    color="default"
                    size="large"
                    disabled={false}
                    label={tag.trim()}
                  />
                ))}
          </ThemeProvider>
        </Stack>
      </div>
      <SuccessModel
        status={showSuccessModal}
        title="Projeto deletado com sucesso!"
      />
    </div>
  )
}
