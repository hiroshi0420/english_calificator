import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

import LogoCompany from '../../../public/logoCompanyNav.png';

import { useNavigate } from 'react-router-dom';

// Components
import { BackDropComponent } from '../BackDrop/BackDropComponet';

import { Typography, IconButton, OutlinedInput, InputAdornment, FormControl, Button } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import { SecurityApi } from '../../Services/SecurityApi';

// Styles
import { Container, Form, Header, ImgLogo, CustomTypography, CustomOutlinedInput } from './Style';


// axios.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('access_token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export const LoginFormComponent = () => {

    const theme = useTheme();
    const apiLogin = new SecurityApi();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async () => {
        if (email === '' || password === '') {
            setError('Both fields are required.');
            return;
        }
    
        try {
            setOpen(true);
            const response = await apiLogin.login({ email, password });
    
            if (response.status === 200) {
                const token = response.data.access_token;
                localStorage.setItem('token', token);
                setError('');
                navigate('/menu');
            } else {
                setError('Invalid email or password.');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
        } finally {
            setOpen(false); 
        }
    };

    return (
        <>
            <Container>
                <Form>
                    <Header>
                        <ImgLogo src={LogoCompany} alt='Logo Company' />
                        <CustomTypography variant='h5' needBold={true}>¡Welcome back!</CustomTypography>
                    </Header>

                    <CustomTypography variant='subtitle2'>Email</CustomTypography>
                    <FormControl fullWidth sx={{ marginBottom: '1rem' }} variant="outlined" size='small'>
                        <CustomOutlinedInput
                            placeholder='Enter your email'
                            size='small'
                            id="outlined-adornment-password"
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!error && email === ''}
                            helperText={!!error && email === '' ? 'Email is required' : ''}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        <AlternateEmailIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <CustomTypography variant='subtitle2'>Password</CustomTypography>
                    <FormControl fullWidth variant="outlined" size='small'>
                        <CustomOutlinedInput
                            placeholder='Enter your password'
                            size='small'
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!error && password === ''}
                            helperText={!!error && password === '' ? 'Password is required' : ''}
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
                        />
                    </FormControl>
                    <Typography variant='caption' style={{ color: theme.palette.primary.main }}>Forgot your password?</Typography>
                    {error && (
                        <Typography color="error" variant="overline" fontWeight='bold' align="center" gutterBottom>
                            {error}
                        </Typography>
                    )}
                    <Button variant="contained" sx={{ marginTop: '2rem' }} size="small" onClick={handleLogin}>
                        Log in
                    </Button>
                </Form>
            </Container>
            <BackDropComponent open={open} />
        </>
    )
}
