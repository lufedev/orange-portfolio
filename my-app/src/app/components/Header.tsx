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
  Badge,
  ListItem
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import { Page, UserProps } from '../lib/definiton'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ts from 'typescript'

const pages: Page[] = [
  {
    name: 'Meus projetos',
    path: '/'
  },
  {
    name: 'Descobrir',
    path: '/discover'
  },
  {
    name: 'Sair',
    path: ''
  }
]

export default function Header({ user }: UserProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' })
  }

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

  const renderPage = (page: Page, index: number): React.ReactElement => {
    const redirectPage = (pageName) => {
      if (pageName === 'Descobrir') {
        redirect('/discover')
      } else if (pageName === 'Meus projetos') {
        redirect('/')
      }
    }

    return (
      <div>
        {index !== 0 && page.name === 'Sair' && <Divider />}
        <MenuItem
          onClick={page.name === 'Sair' ? handleLogout : handleCloseNavMenu}
          className="flex self-stretch items-start"
        >
          {page.name === 'Sair' ? (
            <>
              <LogoutIcon className="text-2xl mr-3" />
              <Typography textAlign="left">Sair</Typography>
            </>
          ) : (
            <Link
              href={page.path}
              onClick={() => redirectPage(page.name)}
              className="text-[#000000DE] text-base normal-case no-underline"
            >
              <Typography textAlign="left">{page.name}</Typography>
            </Link>
          )}
        </MenuItem>
      </div>
    )
  }

  return (
    <ThemeProvider theme={MainTheme}>
      <AppBar position="static" color="primary" className="rounded-b">
        <Container
          maxWidth="xl"
          className="py-3 px-6 md:py-4 md:px-8"
          sx={{ maxWidth: { xl: '100%' } }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: '100%', sm: '100%' }
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' }
              }}
            >
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
                  className="flex flex-col items-start text-start"
                >
                  <p>{user.name}</p>
                  <p className="text-[#00000099]">{user.email}</p>
                </ListItem>
                <Divider />
                {pages.map(renderPage)}
              </Menu>
              <img src={Logo.src} alt="logo" className="w-[6rem] h=[3rem]" />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                gap: 3
              }}
            >
              <img
                src={Logo.src}
                alt="logo"
                className="ml-7 w-[6.9rem] mr-[100px]"
              />
              {pages.slice(0, 2).map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  className="block mt-2 mb-2"
                >
                  <Link
                    href={page.path}
                    onClick={() => renderPage(page.name, '/')}
                    className="text-white text-base normal-case no-underline"
                  >
                    <Typography textAlign="left">{page.name}</Typography>
                  </Link>
                </Button>
              ))}
            </Box>

            <Box
              className="
              flex-grow-0 flex justify-around
              content-between flex-row items-center
              gap-2 md:gap-4"
            >
              <Tooltip title="">
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
                sx={{
                  mt: '45px',
                  display: { xs: 'none', md: 'block' }
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {pages
                  .filter((page: Page) => page.name === 'Sair')
                  .map(renderPage)}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}
