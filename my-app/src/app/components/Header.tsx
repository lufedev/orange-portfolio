'use client'

import * as React from 'react'
import Logo from '../assets/img/logo-orangeportifolio.svg'
import AvatarUser from '../assets/img/avatar.svg'
import { ThemeProvider } from '@mui/material/styles'
import { MainTheme } from '../themes/Theme'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Divider,
  useMediaQuery,
  Badge,
  ListItem
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { UserProps } from '../lib/definiton'

const pages = ['Meus projetos', 'Descobrir', 'Sair']
const settings = ['Perfil', 'Sair']

export default function Header({ user }: UserProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const isMobile: boolean = useMediaQuery('(max-width: 899px)')

  return (
    <ThemeProvider theme={MainTheme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile ? (
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' }
                  }}
                >
                  <ListItem
                    align-items="flex-star"
                    className="flex flex-col items-start gap-0 flex-1"
                  >
                    <p>{user.name}</p>
                    <p className="text-[#00000099]">{user.email}</p>
                  </ListItem>
                  <Divider />
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="left">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
                <img src={Logo.src} alt="logo" className="w-[6rem] h=[3rem]" />
              </Box>
            ) : (
              <img src={Logo.src} alt="logo" className="ml-7 w-[6.9rem]" />
            )}

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                pl: '100px',
                gap: 3
              }}
            >
              {pages.slice(0, 2).map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  className="text-white block text-base normal-case mt-2 mb-2"
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box className="flex-grow-0 flex justify-around content-between flex-row items-center gap-2 md:gap-4">
              <Tooltip title="Abrir configurações">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Foto perfil" src={AvatarUser.src} />
                </IconButton>
              </Tooltip>
              <Box className="flex-grow-0">
                <Badge>
                  <IconButton color="inherit" size="medium">
                    <NotificationsIcon />
                  </IconButton>
                </Badge>
              </Box>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {/* ADICIONAR O MÉTODO DE LOGOUT */}
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}
