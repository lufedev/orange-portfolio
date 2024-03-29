'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CustomButton from './CustomButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { TypeModal } from '../lib/definiton'
import { redirect } from 'next/navigation'

export default function SuccessModel({ status, title }: TypeModal) {
  const [success, setSucces] = React.useState(false)

  const handleClose = () => {
    setSucces(true)
  }
  if (success) {
    redirect('/')
  }
  return (
    <Modal
      open={status}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 312,
          bgcolor: 'white',
          border: 'none',
          padding: '29px 4px'
        }}
      >
        <div className="flex flex-col justify-center items-center  w-4/5 m-auto text-center gap-3">
          <Typography
            id="modal-modal-title"
            className="text-color-neutral-110"
            variant="h5"
            component="h2"
          >
            {title}
          </Typography>
          <CheckCircleIcon color="success" className="text-[40px]" />
          <div className="mb-[1.13rem]">
            <CustomButton
              theme={''}
              variant="contained"
              color="primary"
              size="large"
              disabled={false}
              loading={false}
              name="VOLTAR PARA PROJETOS"
              onClick={handleClose}
            />
          </div>
        </div>
      </Box>
    </Modal>
  )
}
