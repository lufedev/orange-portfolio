'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CustomButton from './CustomButton'
import { TextFieldTheme } from '../themes/TextField'
import { ThemeProvider } from '@mui/material/styles'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import { Project, ProjectProps } from '../lib/definiton'
import Image from 'next/image'

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
  project,
  states,
  onClose
}: ProjectProps) {
  const handleToggle = () => onClose()

  const isUrlImage = project?.urlImage !== undefined

  return (
    <Modal
      open={states}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: 'auto',
          bgcolor: 'white',
          border: 'none',
          padding: '29px 4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4
        }}
      >
        <Typography
          id="modal-modal-title"
          className="text-color-neutral-110 w-4/5 text-left"
          variant="h5"
          component="h2"
        >
          Adicionar projeto
        </Typography>
        <div className="flex flex-col md:flex-row-reverse justify-center items-stretch w-4/5 m-auto text-center gap-3">
          <div className="w-full md:w-1/2 flex flex-col justify-center items-stretch text-center gap-3">
            <ThemeProvider theme={TextFieldTheme}>
              <TextField
                label="Título"
                variant="outlined"
                size="medium"
                className="mb-4"
                type="text"
                value={project?.title || ''}
              />
              <TextField
                label="Tags"
                variant="outlined"
                size="medium"
                className="mb-4"
                type="text"
                value={project?.tags || ''}
              />
              <TextField
                label="Link"
                variant="outlined"
                size="medium"
                className="mb-4"
                type="text"
                value={project?.link || ''}
              />
              <TextField
                label="Descrição"
                variant="outlined"
                size="medium"
                className="mb-4"
                type="text"
                multiline
                rows={4}
                value={project?.description || ''}
              />
            </ThemeProvider>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-8">
            <h4 className="subtitle-1 text-color-neutral-100">
              Selecione o conteúdo que você deseja fazer upload
            </h4>
            <div className="rounded w-full md:w-[100%] h-[100%] text-lowercase w-327 h-330 flex flex-col space-y-4 justify-center items-center">
              {isUrlImage ? (
                <Image
                  src={project?.urlImage}
                  alt={project?.title}
                  width={389}
                  height={304}
                  className="mr-6 mb-[16px]"
                />
              ) : (
                <Button
                  component="label"
                  disableElevation
                  variant="contained"
                  className="w-[100%] h-[80%] bg-color-neutral-70 hover:bg-color-neutral-70 flex flex-col justify-center items-center text-color-neutral-120 font-normal normal-case"
                >
                  <PhotoLibraryIcon className="text-5xl" />
                  <p className="w-[80%]">
                    Compartilhe seu talento com milhares de pessoas
                  </p>
                  <VisuallyHiddenInput type="file" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start gap-8 w-4/5">
          <a
            href="https://www.youtube.com/"
            className="subtitle-1 text-color-neutral-100 !no-underline"
          >
            Visualizar publicação
          </a>

          <div className="flex justify-center items-start gap-4">
            <CustomButton
              theme="ContainedTheme"
              variant="contained"
              color="primary"
              size="large"
              disabled={false}
              name="SALVAR"
              loading={false}
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
      </Box>
    </Modal>
  )
}
