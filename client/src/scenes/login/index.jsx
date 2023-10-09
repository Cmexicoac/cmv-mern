import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, useTheme, TextField, Container, Typography, Paper, Grid } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon,Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import { setMode } from 'state'

function LoginPage() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Authentication logic here...
    if (true) {
        navigate('/home')
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 3, width: '100%', marginBottom: "10px" }}>
          <Typography variant="h5">Iniciar Sesión</Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
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
        
        {/* Contenedor de iconos centrados horizontalmente */}
        <Grid container justifyContent="center" spacing={1}>
          {/* Primer icono */}
          <Grid item>
            <IconButton onClick={() => dispatch(setMode("dark"))}>
                <DarkModeOutlined sx={{fontSize: "25px", color: theme.palette.mode == "dark" ? "white" : "gray"}}/>
            </IconButton>
          </Grid>
          {/* Segundo icono */}
          <Grid item>
            <IconButton onClick={() => dispatch(setMode())}>
                <LightModeOutlined sx={{fontSize: "25px", color: theme.palette.mode == "dark" ? "gray" : "black"}}/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );


  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
          <Typography variant="h5">Iniciar Sesión</Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
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
        {/* Icono SVG justo debajo del bloque de inicio de sesión */}
        <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlined sx={{fontSize: "25px"}}/>
                ) : (
                    <LightModeOutlined sx={{fontSize: "25px"}}/>
                )}
            </IconButton>
      </Grid>
    </Grid>
  )
}

export default LoginPage;
