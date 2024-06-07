import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {BackDropComponent} from '../../Components/BackDrop/BackDropComponet';

export const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    if (email === '' || password === '') {
      setError('Both fields are required.');
    } else if (email !== 'englishapp@gmail.com' || password !== '123456789') {
      setError('Invalid email or password.');
    } else {
      setError('');
      setOpen(true); // Mostrar el Backdrop
      setTimeout(() => {
        setOpen(false); // Ocultar el Backdrop
        navigate('/menu'); // Redirigir al menú
      }, 2000); // Simular una espera de 2 segundos antes de redirigir
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={theme.palette.background.default}
    >
      <Paper elevation={3} sx={{ padding: theme.spacing(4), maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error && email === ''}
            helperText={!!error && email === '' ? 'Email is required' : ''}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error && password === ''}
            helperText={!!error && password === '' ? 'Password is required' : ''}
          />
          {error && (
            <Typography color="error" variant="body2" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
      <BackDropComponent open={open} />
    </Box>
  );
};

