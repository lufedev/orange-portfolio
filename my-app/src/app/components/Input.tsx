"use client";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import CustomButton from './CustomButton'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl'; // Importar FormControl
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Input() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div style={{ width: '1280px', height: '832px', top: '1070px', left: '4068px', display: 'flex', flexDirection: 'column', gap: '15px', background: '#FFFFFF' }}>
            <h2 style={{ width: '256px', height: '40px', top: '271px', left: '792px', fontFamily: 'Roboto', fontSize: '48px', fontWeight: 400, lineHeight: '40px', letterSpacing: '0em', textAlign: 'center' }}>Cadastre-se</h2>
            <div style={{ width: '517px', height: '258px', top: '2497px', left: '998px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ width: '517px', height: '56px', display: 'flex', alignItems: 'center' }}>
                    <TextField label="Nome *" variant="outlined" size="medium" style={{ width: 'calc(50% - 8px)' }} />
                    <div style={{ width: '16px', height: '8px' }}></div>
                    <TextField label="Sobrenome *" variant="outlined" size="medium" style={{ width: 'calc(50% - 8px)' }} />
                </div>
                <TextField label="Email address *" variant="outlined" size="medium" />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password *"
                    />
                </FormControl>
                <CustomButton
                    variant="contained"
                    color="primary"
                    size="large"
                    name="Cadastrar"
                />
            </div>
        </div>
    )
}
