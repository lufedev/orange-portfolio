import {
  Box,
  IconButton,
  Modal,
  Stack,
  ThemeProvider,
  Tooltip,
  useMediaQuery
} from '@mui/material'
import { ProjectProps, User } from '../lib/definiton'
import CloseIcon from '@mui/icons-material/Close'
import CardProject from './CardProject'
import Link from 'next/link'
import Image from 'next/image'
import CustomChip from './CustomChip'
import { ChipTheme } from '../themes/Button'
import NotFoundImage from '../assets/img/no-picture-available.svg'

export default function ModalProjectPreview({
  user,
  project,
  onClose,
  states
}: ProjectProps) {
  const handleClose = () => onClose()
  const isDesktop: boolean = useMediaQuery('(min-width:768px)')
  const EMPTY_FIELDS_MESSAGE = ''
  const tagsString = project?.tags || EMPTY_FIELDS_MESSAGE
  const isLink = project?.link === '' ? '' : 'Download'

  return (
    <div>
      <Modal
        keepMounted
        open={states}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            position: { xs: 'absolute', md: 'relative' },
            top: { xs: '0', md: '50%' },
            left: '50%',
            transform: {
              xs: 'translate(-50%, 27%)',
              md: 'translate(-50%, -50%)'
            },
            width: { xs: '100%', md: '81.4%' },
            maxHeight: { xs: '80vh', md: '94%' },
            height: '100%',
            bgcolor: 'white',
            overflow: { xs: 'auto', md: 'auto' },
            borderRadius: { xs: '24px 24px 0px 0px', md: '0' }
          }}
        >
          <Tooltip title="Fechar" className="absolute top-0 right-0 mr-4 mt-4">
            <IconButton className="p-[5px]" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>

          <div className="w-full flex flex-col items-center justify-center pt-14 px-6 md:px-[102px]">
            {isDesktop ? (
              <div className="flex-col w-full relative">
                <div className="flex flex-row w-full h-fit md:items-center justify-between gap-2 md:gap-0 mb-8">
                  <div className="flex gap-2">
                    <Image
                      src={user?.image}
                      alt={user?.name}
                      className="my-[.31rem] rounded"
                    />
                    <div className="flex flex-col gap-2">
                      <h6 className="h6 text-color-neutral-120 md:text-color-neutral-110">
                        {user?.name} {user?.sname}
                      </h6>
                      <p className="text-color-neutral-110">{project?.date}</p>
                    </div>
                  </div>
                  <h5 className="text-color-neutral-120 md:text-center h5">
                    {project?.title || EMPTY_FIELDS_MESSAGE}
                  </h5>
                  <Stack
                    direction="row"
                    spacing={1}
                    className="flex items-center justify-end"
                  >
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
                <h6 className="text-color-neutral-120 h5 text-center mb-8 md:text-[18px]">
                  {project?.title}
                </h6>
                <CardProject
                  user={user as User}
                  project={project}
                  view={false}
                />
              </>
            )}

            <div className="w-full flex flex-col  mt-6  md:mt-[4rem] gap-6">
              <p className="body-2">
                {project?.description || EMPTY_FIELDS_MESSAGE}
              </p>
              <div className="flex flex-col">
                <b className="body-2">{isLink}</b>
                <Link
                  href={project?.link || EMPTY_FIELDS_MESSAGE}
                  target="_blank"
                  className="text-color-info-80 no-underline body-2"
                >
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
