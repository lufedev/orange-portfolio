'use client'

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CustomButton from './CustomButton'
import { TextFieldTheme } from '../themes/TextField'
import { DisabledTheme } from '../themes/Button'
import { ThemeProvider } from '@mui/material/styles'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import { Project, ProjectProps } from '../lib/definiton'
import Image from 'next/image'
import { storage } from '../firebase/firebase'
import { redirect } from 'next/navigation'
import ModalProjectPreview from './ModalProjectPreview'
import Link from 'next/link'
import loadingImage from '../assets/img/loading.gif'
import CircularProgress from '@mui/material/CircularProgress'
import SuccessModel from './SuccessModal'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})
export default function ModalAddProject({
  user,
  project,
  states,
  editing,
  onClose
}: ProjectProps) {
  const [disableButton, setDisableButton] = useState(true)
  const [newProjectData, setNewProjectData] = useState(
    project || ({} as Project)
  )
  const currentProject = project || ({} as Project)

  const [loading, setLoading] = useState(false)
  const [isimagepath, setIsimagepath] = useState(false)
  const [isAddProjectModalOpen, setAddProjectModalOpen] = useState(states)
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [messageSuccessModal, setMessageShowSuccessModal] = useState('')

  useEffect(() => {
    if (
      newProjectData.title ||
      newProjectData.tags ||
      newProjectData.link ||
      newProjectData.description
    ) {
      const { title, tags, link, description } = newProjectData
      setDisableButton(!(title && tags && link && description))
    }
  }, [newProjectData])

  useEffect(() => {
    setAddProjectModalOpen(states)
  }, [states])

  const createProject = async (project: Project) => {
    try {
      const response = await fetch('http://localhost:3000/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProjectData)
      })

      setNewProjectData({} as Project)
      setIsimagepath(false)
    } catch (error) {}
  }

  const updateProject = async (project: Project) => {
    try {
      const response = await fetch('http://localhost:3000/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProjectData)
      })
    } catch (error) {}
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const file = event.target.files?.[0]
    if (file !== undefined) {
      if (editing) {
        removeImageFromDatabase()
      }
      const storageRef = storage.ref()
      const projectFolder = `${user?.email}`
      const fileRef = storageRef.child(projectFolder + '/' + Date.now())

      setImageLoading(true)

      fileRef
        .put(file)
        .then(() => {
          console.log('Arquivo enviado com sucesso!')
          fileRef.getDownloadURL().then((url: string) => {
            setIsimagepath(true)
            setNewProjectData({ ...newProjectData, imagepath: url })
            setImageLoading(false)
          })
        })
        .catch((error) => {
          console.error('Erro ao enviar arquivo:', error)
          setImageLoading(false)
        })
    }
    setLoading(false)
  }

  const removeImageFromDatabase = () => {
    if (newProjectData.imagepath) {
      const imageRef = storage.refFromURL(newProjectData.imagepath)
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

  const handleToggle = () => {
    onClose()
    setNewProjectData(currentProject)
    if (!editing) {
      removeImageFromDatabase()
    }
  }

  const handleSave = () => {
    setLoading(true)

    if (editing) {
      updateProject(newProjectData as Project)
      setIsimagepath(true)
      setMessageShowSuccessModal('Edição concluída com sucesso!')
    } else {
      createProject(newProjectData as Project)
      setMessageShowSuccessModal('Projeto adicionado com sucesso!')
    }
    setLoading(false)
    onClose()
    setShowSuccessModal(true)
  }

  const openPreviewModal = () => {
    setPreviewModalOpen(true)
    setAddProjectModalOpen(false)
  }

  const closePreviewModal = () => {
    setPreviewModalOpen(false)
    setAddProjectModalOpen(true)
  }

  return (
    <div>
      {isAddProjectModalOpen && (
        <Modal
          open={states}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="mx-6 md:px-[195px]"
        >
          <Box
            sx={{
              position: { xs: 'absolute', md: 'relative' },
              bottom: '0',
              top: { md: '50%' },
              left: '50%',
              transform: { xs: 'translate(-50%)', md: 'translate(-50%, -50%)' },
              width: '100%',
              marginBottom: { xs: '24px', md: '0' },
              maxHeight: { xs: '84vh', md: '100%' },
              bgcolor: 'white',
              overflow: 'auto'
            }}
            className="absolute bottom-0 left-1/2 translate-x-[-50%] bg-white w-full max-h-[84vh] overflow-auto md:top-1/2 md:translate-y-[-50%] md:relative md:max-h-screen"
          >
            <div className="px-6 md:px-8 w-full">
              <h5 className="h5 my-4 md:my-6 w-full text-left">
                Adicionar projeto
              </h5>
              <div className="md:flex md:flex-row-reverse">
                <div className="w-full flex flex-col justify-center text-center gap-4 md:w-[50vw]">
                  <ThemeProvider theme={TextFieldTheme}>
                    <TextField
                      name="title"
                      label="Título"
                      variant="outlined"
                      size="medium"
                      className=""
                      type="text"
                      value={newProjectData.title || ''}
                      error={newProjectData?.title === '' ? true : false}
                      helperText={
                        newProjectData?.title === '' ? 'Campo obrigatório' : ''
                      }
                      onChange={(e) =>
                        setNewProjectData({
                          ...newProjectData,
                          title: e.target.value
                        })
                      }
                    />
                    <TextField
                      name="tags"
                      label="Tags"
                      variant="outlined"
                      size="medium"
                      className=""
                      type="text"
                      value={newProjectData.tags || ''}
                      error={newProjectData?.tags === '' ? true : false}
                      helperText={
                        newProjectData?.tags === '' ? 'Campo obrigatório' : ''
                      }
                      onChange={(e) =>
                        setNewProjectData({
                          ...newProjectData,
                          tags: e.target.value as unknown as string[]
                        })
                      }
                    />
                    <TextField
                      name="link"
                      label="Link"
                      variant="outlined"
                      size="medium"
                      className=""
                      type="text"
                      value={newProjectData.link || ''}
                      error={newProjectData?.link === '' ? true : false}
                      helperText={
                        newProjectData?.link === '' ? 'Campo obrigatório' : ''
                      }
                      onChange={(e) =>
                        setNewProjectData({
                          ...newProjectData,
                          link: e.target.value
                        })
                      }
                    />
                    <TextField
                      name="description"
                      label="Descrição"
                      variant="outlined"
                      size="medium"
                      className=""
                      type="text"
                      multiline
                      rows={3}
                      value={newProjectData.description || ''}
                      error={newProjectData?.description === '' ? true : false}
                      helperText={
                        newProjectData?.description === ''
                          ? 'Campo obrigatório'
                          : ''
                      }
                      onChange={(e) =>
                        setNewProjectData({
                          ...newProjectData,
                          description: e.target.value
                        })
                      }
                    />
                  </ThemeProvider>
                </div>
                <div className="my-4 flex flex-col md:mr-6 md:w-[50vw] md:mt-0">
                  <p className="subtitle-1 text-color-neutral-110 text-left w-full mb-4">
                    Selecione o conteúdo que você deseja fazer upload
                  </p>

                  <div className="w-full h-[304px] md:h-[307px]">
                    {newProjectData?.imagepath ? (
                      <Button
                        component="label"
                        disableElevation
                        className="h-full w-full  px-2 py-0 flex flex-col text-color-neutral-120 leading-[0.875rem] tracking-[0.01563rem] font-normal normal-case"
                      >
                        <Image
                          src={
                            loading ? loadingImage : newProjectData?.imagepath
                          }
                          alt={newProjectData?.title}
                          width={389}
                          height={304}
                          className="h-full w-full object-cover"
                        />
                        <VisuallyHiddenInput
                          type="file"
                          width={389}
                          height={304}
                          onChange={handleFileChange}
                        />
                      </Button>
                    ) : (
                      <ThemeProvider theme={DisabledTheme}>
                        <Button
                          component="label"
                          disableElevation
                          variant="contained"
                          className="h-full px-2 py-0 flex flex-col text-color-neutral-120 leading-[0.875rem] tracking-[0.01563rem] font-normal normal-case"
                        >
                          {!imageLoading ? (
                            <PhotoLibraryIcon className="text-5xl" />
                          ) : (
                            <CircularProgress />
                          )}
                          <p className="w-full text-left flex justify-center mt-4">
                            Compartilhe seu talento com milhares de pessoas
                          </p>
                          <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                          />
                        </Button>
                      </ThemeProvider>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full items-start">
                <Link
                  onClick={openPreviewModal}
                  className="subtitle-1 text-color-neutral-100 !no-underline mb-4 hover:none"
                  href={''}
                >
                  Visualizar publicação
                </Link>
                <div className="flex mb-10 md:mb-6 gap-4">
                  <CustomButton
                    theme="ContainedTheme"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={disableButton}
                    name="SALVAR"
                    loading={false}
                    onClick={handleSave}
                  />
                  <CustomButton
                    theme="disabled"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={false}
                    name="CANCELAR"
                    loading={false}
                    onClick={handleToggle}
                  />
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      )}
      {isPreviewModalOpen && newProjectData && (
        <ModalProjectPreview
          user={user}
          project={newProjectData as Project}
          onClose={closePreviewModal}
          states={isPreviewModalOpen}
          editing={false}
        />
      )}

      <SuccessModel status={showSuccessModal} title={messageSuccessModal} />
    </div>
  )
}
