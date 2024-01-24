import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, useTheme, TextField, Typography, Paper, Grid } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { setMode } from 'state'
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import logocmv from 'assets/images/logocmv.png'

function LoginPage() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email: email,
        password: password
      });
  
      if (response.data.message === 'Login successful') {
        // Store the token and user data in cookies
        Cookies.set('token', response.data.token);

        // Decode the token to get the user data
        const user = jwtDecode(response.data.token);
        //console log decoded token
        console.log(user);
        Cookies.set('nombre', user.nombre);
        Cookies.set('email', user.email);
        Cookies.set('rol', user.rol);
        Cookies.set('id', user.id);

        navigate('/home');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage('usario o contra incorrecto');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', width: '100vw' }}>
      <Grid item xs={12} sm={8} md={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          <img src={logocmv} alt="Logo CMV" style={{ width: '100%', maxWidth: '200px' }} />
        </div>
        <Paper elevation={3} sx={{ padding: 3, width: '100%', marginBottom: "10px" }}>
          <Typography variant="h5" sx={{marginLeft : 10 }}>Cambiando México con Valores, A.C.</Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 7 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              sx = {{ marginBottom: 4 }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop: 2 }}
            >
              Iniciar Sesión
            </Button>
          </form> 
        </Paper>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item>
            <IconButton onClick={() => dispatch(setMode("dark"))}>
              <DarkModeOutlined sx={{fontSize: "25px", color: theme.palette.mode === "dark" ? "white" : "gray"}}/>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={() => dispatch(setMode())}>
              <LightModeOutlined sx={{fontSize: "25px", color: theme.palette.mode === "dark" ? "gray" : "black"}}/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
