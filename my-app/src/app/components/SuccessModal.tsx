"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CustomButton from './CustomButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TypeModal } from '../lib/definiton';


export default function SuccessModel({ status, title }: TypeModal) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (


        <Modal
            open={status}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 312,
                bgcolor: 'white',
                border: 'none',
                padding: '29px 4px'
            }}>
                <div className="flex flex-col justify-center items-center  w-4/5 m-auto text-center gap-3">
                    <Typography id="modal-modal-title" className="text-color-neutral-110" variant="h5" component="h2">
                        {title}
                    </Typography>
                    <CheckCircleIcon color="success" className="text-[40px]" />
                    <CustomButton
                        theme={true}
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={false}
                        name="VOLTAR PARA PROJETOS"
                        className="mb-[1.13rem]"
                        onClick={handleClose}
                    />
                </div>
            </Box>
        </Modal>

    )
}