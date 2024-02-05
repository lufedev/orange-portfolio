import {
  Box,
  IconButton,
  Modal,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
  useMediaQuery
}
  from "@mui/material";
import { useState } from "react";
import { ProjectProps, User } from "../lib/definiton";
import CloseIcon from '@mui/icons-material/Close';
import CardProject from "./CardProject";
import Link from "next/link";
import Image from "next/image";
import { MainTheme } from "../themes/Theme";
import CustomChip from "./CustomChip";
import { ChipTheme } from "../themes/Button";
import NotFoundImage from '../assets/img/no-picture-available.svg'



export default function ModalProjectPreview({ user, project, onClose, states }: ProjectProps) {
  const [open, setOpen] = useState(states);
  const handleClose = () => onClose();
  const isDesktop: boolean = useMediaQuery('(min-width:900px)');
  const EMPTY_FIELDS_MESSAGE = "Por favor, preencha todos os campos."
  const tagsString = project?.tags || EMPTY_FIELDS_MESSAGE;

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={{
          position: { xs: 'absolute', md: 'relative' },
          top: { xs: '0', md: '50%' },
          left: '50%',
          transform: { xs: 'translate(-50%, 27%)', md: 'translate(-50%, -50%)' },
          width: { xs: '100%', md: '81.4%' },
          maxHeight: { xs: '80vh', md: '94%' },
          height: '100%',
          bgcolor: 'white',
          overflow: { xs: 'auto', md: 'auto' },
          p: 4,
          borderRadius: { xs: '24px 24px 0px 0px', md: '0' }
        }}>
          <Tooltip title="Fechar" className="absolute top-0 right-0 h-16 w-16">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>

          <div className="mt-[28px] flex flex-col items-center justify-center">

            {isDesktop ? (

              <div className="flex-col md:w-full relative">
                <div className="flex flex-row md:w-full md:items-center justify-between gap-2 mb-8">
                  <div className="flex gap-2" >
                    <Image
                      src={user?.image}
                      alt={user?.name}
                      width={40}
                      height={40}
                      className="my-[.31rem] rounded"
                    />
                    <div className="flex flex-col gap-2">
                      <h6 className="h6 text-color-neutral-120 md:text-color-neutral-110">
                        {user?.name} {user?.sname}
                      </h6>
                      <p className="text-color-neutral-110">{project?.date}</p>
                    </div>
                  </div>

                  <Typography
                    id="keep-mounted-modal-title"
                    variant="h5"
                    component="h2"
                    className="text-color-neutral-120 md:text-center .h5"
                  >
                    {project?.title || EMPTY_FIELDS_MESSAGE}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    className="flex items-center justify-end"
                  >
                    <ThemeProvider theme={ChipTheme}>
                      {tagsString && tagsString.split(",").map((tag: string) => (
                        <CustomChip
                          key={tag.trim()}
                          variant="filled"
                          color="default"
                          size="large"
                          disabled={false}
                          className="mb-[1.13rem]"
                          label={tag.trim()}
                        />
                      ))}
                    </ThemeProvider>
                  </Stack>
                </div>

                <Image
                  src={project?.imagepath || NotFoundImage}
                  alt={project?.title || EMPTY_FIELDS_MESSAGE}
                  width={312}
                  height={258}
                  className="w-full h-[35.12rem] object-cover"
                />
              </div>

            ) : (
              <>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h5"
                  component="h5"
                  className="text-color-neutral-120 text-center md:text-[18px] md:text-left mt-6"
                >
                  {project?.title}
                </Typography>
                <CardProject user={user as User} project={project} view={false} />
              </>
            )}

            <div className="flex flex-col mt-6  md:mt-14 gap-6">
              <p>
                {project?.description || EMPTY_FIELDS_MESSAGE}
              </p>
              <div className="flex flex-col">
                <b>Download</b>
                <Link
                  href={project?.link || EMPTY_FIELDS_MESSAGE}
                  target="_blank"
                  className="text-color-info-80 no-underline">
                  {project?.link || EMPTY_FIELDS_MESSAGE}
                </Link>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
