'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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
          bottom: '0',
          left: '50%',
          transform: 'translate(-50%)',
          width: '80%',
          bgcolor: 'white',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          justifyContent: 'end',
          marginBottom: '1.5rem'
        }}
      >
        <div className="px-6 w-full">
          <h5 className="h5 my-4 w-full text-left">Adicionar projeto</h5>
          <div className="w-full flex flex-col justify-center items-stretch text-center gap-4">
            <ThemeProvider theme={TextFieldTheme}>
              <TextField
                label="Título"
                variant="outlined"
                size="medium"
                className=""
                type="text"
                value={project?.title || ''}
              />
              <TextField
                label="Tags"
                variant="outlined"
                size="medium"
                className=""
                type="text"
                value={project?.tags || ''}
              />
              <TextField
                label="Link"
                variant="outlined"
                size="medium"
                className=""
                type="text"
                value={project?.link || ''}
              />
              <TextField
                label="Descrição"
                variant="outlined"
                size="medium"
                className=""
                type="text"
                multiline
                rows={3}
                value={project?.description || ''}
              />
            </ThemeProvider>
          </div>
          <div className="my-4">
            <p className="subtitle-1 text-color-neutral-110 text-left w-full mb-4">
              Selecione o conteúdo que você deseja fazer upload
            </p>
            <div className="w-full h-[304px]">
              {isUrlImage ? (
                <Image
                  src={project?.urlImage}
                  alt={project?.title}
                  width={389}
                  height={304}
                  className="mr-6 mb-[16px]"
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
        </div>
      </Box>
    </Modal>
  )
}
