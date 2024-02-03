import Image from 'next/image'
import { UserProps } from '../lib/definiton'
import {
  Button,
  Chip,
  IconButton,
  ListItem,
  Menu,
  Stack,
  ThemeProvider
} from '@mui/material'
import { ChipTheme } from '../themes/Button'
import EditIcon from '@mui/icons-material/Edit'
import * as React from 'react'

export default function CardProject({ user, project }: UserProps) {
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorElMenu(null)
  }

  return (
    <div className="h-[19.75rem] w-full md:w-[24.31rem] md:h-[17.87rem] mt-6">
      <Image
        src={project?.imagePath}
        alt={project?.title}
        width={312}
        height={258}
        className="w-full h-[16.12rem] object-cover"
      />
      <div className="flex mt-[.5rem] md:items-center gap-2 relative">
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className="my-[.31rem] rounded"
        />
        <div className="absolute bottom-[16rem] right-[1rem] fixed border-2 border-solid border-color-secondary-70 rounded-full">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-project"
            aria-haspopup="true"
            color="inherit"
            className="text-color-neutral-120"
            title="Configurações do projeto"
            onClick={handleOpenMenu}
          >
            <EditIcon className="bg-color-secondary-70 rounded-full" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            open={Boolean(anchorElMenu)}
            onClose={handleCloseMenu}
            sx={{
              display: { xs: 'block' },
              width: '13rem'
            }}
          >
            <ListItem
              align-items="flex-star"
              className="flex flex-col items-start"
            >
              <Button onClick={() => console.log('Editar')}>Editar</Button>
              <Button onClick={() => console.log('excluir')}>Excluir</Button>
            </ListItem>
          </Menu>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <h6 className="h6 text-color-neutral-120 md:text-color-neutral-110">
            {user.name} {user.surname}
          </h6>
          <p className="hidden md:flex">•</p>
          <p className="text-color-neutral-110">{project?.date}</p>
        </div>

        <Stack
          direction="row"
          spacing={1}
          className="flex items-center grow justify-end"
        >
          <ThemeProvider theme={ChipTheme}>
            {project?.tags.map((tag: string) => (
              <Chip key={tag} label={tag} color="primary" />
            ))}
          </ThemeProvider>
        </Stack>
      </div>
    </div>
  )
}
