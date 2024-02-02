'use client'

import React, { useState } from 'react'
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
import { ProjectProps } from '../lib/definiton'
import Image from 'next/image'
import { StaticImageData } from 'next/image'
import sam from '../assets/img/images.jpg'
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
interface ProjectData {
  title?: string
  tags?: string
  link?: string
  description?: string
  [key: string]: string | undefined
}
export default function ModalAddProject({
  project,
  states,
  onClose
}: ProjectProps) {
  const handleToggle = () => onClose()
  const isUrlImage = true

  const [image, setImage] = useState(sam)

  const [handleLoading, setHandleLoading] = useState(false)
  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    tags: '',
    link: '',
    description: ''
  })
  const [error, setError] = useState({
    title: { status: false, message: '' },
    tags: { status: false, message: '' },
    link: { status: false, message: '' },
    description: { status: false, message: '' }
  })

  const handleProjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProjectData((prevState) => {
      const updatedData = { ...prevState, [name]: value }
      return updatedData
    })
  }
  const handleProject = async () => {
    setHandleLoading(true)
    const fields = ['title', 'tags', 'link', 'description']
    let hasError = false
    fields.forEach((field) => {
      if (projectData[field] === '' || !projectData[field]) {
        setError((prevState) => {
          const updatedError = {
            ...prevState,
            [field]: { status: true, message: 'Campo obrigatório' }
          }
          return updatedError
        })
        hasError = true
      } else {
        setError((prevState) => {
          const updatedError = {
            ...prevState,
            [field]: { status: false, message: '' }
          }
          return updatedError
        })
      }
    })
    if (hasError) return setHandleLoading(false)
    try {
      const response = await fetch('http://localhost:3000/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      })
      handleToggle()
    } catch (error) {}
    setHandleLoading(false)
  }
  return (
    <Modal
      open={states}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translate(-50%)',
          width: '80%',
          bgcolor: 'white',
          border: 'none',
          display: 'block',
          flexDirection: 'column',
          alignItems: 'end',
          justifyContent: 'end',
          marginBottom: '1.5rem',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        <div className="px-6 w-full">
          <h5 className="h5 my-4 w-full text-left">Adicionar projeto</h5>
          <div className="w-full flex flex-col lg:flex-row-reverse lg:h-full lg:gap-3">
            <div className="w-full flex flex-col justify-center items-stretch text-center gap-4 lg:w-3/5">
              <ThemeProvider theme={TextFieldTheme}>
                <TextField
                  name="title"
                  label="Título"
                  variant="outlined"
                  size="medium"
                  className=""
                  type="text"
                  onChange={handleProjectChange}
                  error={error.title.status}
                  helperText={error.title.message}
                  value={projectData.title}
                />
                <TextField
                  name="tags"
                  label="Tags"
                  variant="outlined"
                  size="medium"
                  className=""
                  type="text"
                  onChange={handleProjectChange}
                  error={error.tags.status}
                  helperText={error.tags.message}
                  value={projectData.tags}
                />
                <TextField
                  name="link"
                  label="Link"
                  variant="outlined"
                  size="medium"
                  className=""
                  type="text"
                  onChange={handleProjectChange}
                  error={error.link.status}
                  helperText={error.link.message}
                  value={projectData.link}
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
                  onChange={handleProjectChange}
                  error={error.description.status}
                  helperText={error.description.message}
                  value={projectData.description}
                />
              </ThemeProvider>
            </div>
            <div className="my-4 flex flex-col lg:w-3/5">
              <p className="subtitle-1 text-color-neutral-110 text-left w-full mb-4">
                Selecione o conteúdo que você deseja fazer upload
              </p>
              <div className="w-full h-[304px]">
                {isUrlImage ? (
                  <Image
                    src={image}
                    alt={project?.title}
                    width={389}
                    height={304}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ThemeProvider theme={DisabledTheme}>
                    <Button
                      component="label"
                      disableElevation
                      variant="contained"
                      className="h-full px-2 py-0 flex flex-col text-color-neutral-120 leading-[0.875rem] tracking-[0.01563rem] font-normal normal-case"
                    >
                      <PhotoLibraryIcon className="text-5xl" />
                      <p className="w-full text-left flex justify-center mt-4">
                        Compartilhe seu talento com milhares de pessoas
                      </p>
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </ThemeProvider>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full items-start">
            <a
              href="https://www.youtube.com/"
              className="subtitle-1 text-color-neutral-100 !no-underline mb-4"
            >
              Visualizar publicação
            </a>
            <div className="flex mb-10 gap-4">
              <CustomButton
                theme="ContainedTheme"
                variant="contained"
                color="primary"
                size="large"
                disabled={false}
                name="SALVAR"
                loading={handleLoading}
                onClick={handleProject}
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
  )
}

async function convertImageToBase64(image: StaticImageData): Promise<string> {
  const imagePath = image.src
  const imageBuffer = fs.readFileSync(imagePath)
  const base64Image = imageBuffer.toString('base64')
  return base64Image
}
