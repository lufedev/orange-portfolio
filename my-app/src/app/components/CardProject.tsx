
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
import { ChipTheme, MenuTheme } from "../themes/Button";
import EditIcon from '@mui/icons-material/Edit'
import * as React from 'react'
import CustomChip from "./CustomChip";
import { MainTheme } from "../themes/Theme";
import NotFoundImage from '../assets/img/no-picture-available.svg'

export default function CardProject({ user, project, view }: UserProps) {
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(null);


  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorElMenu(null)
  }


  const renderMenu: string = () => {
    if (view !== undefined) {
      return view ? 'flex' : 'hidden';
    }
  }
  const tagsString = project?.tags; 

  return (
    <div className="h-[19.75rem] w-full md:w-[24.31rem] md:h-[17.87rem] mt-6">
      <Image
        src={project?.imagepath || NotFoundImage}
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
            className={renderMenu()}
          >
            <EditIcon className="bg-color-secondary-70 rounded-full" />
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
                <Button
                  onClick={() => console.log("Editar")}
                  color="primary"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => console.log("excluir")}
                  color="primary"
                >
                  Excluir
                </Button>
              </ThemeProvider>

            </ListItem>
          </Menu>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <h6 className="h6 text-color-neutral-120 md:text-color-neutral-110">
            {user.name} {user.sname}
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
    </div>
  )
}
