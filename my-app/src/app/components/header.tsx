"use client";

import * as React from 'react';
import Logo from '../assets/img/logo-orangeportifolio.png';
import AvatarUser from '../assets/img/avatar.png';
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
    Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';


const pages = ['Meus Projetos', 'Descobrir', 'Configurações'];
const settings = ['Perfil', 'Sair'];

export default function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const isMobile: boolean = useMediaQuery('(max-width: 899px)');

    return (
        <AppBar position="static" className="bg-color-principal-100">
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
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="left" width={100} className='divide-y'>
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                            <img src={Logo.src} alt='logo' width={150} />
                        </Box>

                    ) : (
                        <img src={Logo.src} alt='logo' width={150} />
                    )}


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.slice(0, 2).map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', textTransform: 'capitalize' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ 
                        flexGrow: 0,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '25px',
                    }}
                    >
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Foto perfil" src={AvatarUser.src} />
                            </IconButton>
                        </Tooltip>
                        <Box sx={{ flexGrow: 0, marginRight: '15px' }}>
                            <Badge>
                                <IconButton
                                    color="inherit"
                                    size="medium"
                                >
                                    <NotificationsIcon/>

                                </IconButton>
                            </Badge>
                        </Box>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>

                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

