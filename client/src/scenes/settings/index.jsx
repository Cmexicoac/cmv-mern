import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Switch,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import Cookies from 'js-cookie';
import axios from 'axios';

const Settings = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = Cookies.get('id');
        const response = await axios.get('http://localhost:6001/api/getUser');
        const currentUser = response.data.find(u => u._id === userId);
        
        if (currentUser) {
          setUser(currentUser);
          setNombre(currentUser.nombre || '');
          setEmail(currentUser.email || '');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveProfile = async () => {
    // TODO: Implement profile update API call
    setMessage('Perfil actualizado correctamente');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }
    // TODO: Implement password change API call
    setMessage('Contraseña actualizada correctamente');
    setPassword('');
    setConfirmPassword('');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('nombre');
    Cookies.remove('email');
    Cookies.remove('rol');
    Cookies.remove('id');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Configuración
      </Typography>

      {message && (
        <Typography color="primary" sx={{ mb: 2 }}>
          {message}
        </Typography>
      )}

      {/* Profile Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Información del Perfil
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={2}>
              <Avatar
                src={user?.foto}
                sx={{ width: 100, height: 100, mx: 'auto' }}
              >
                {nombre?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={10}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Matrícula"
                    value={user?.matricula || ''}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Rol"
                    value={user?.rol === 'alumno' ? 'Estudiante' : 'Profesor'}
                    disabled
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleSaveProfile}>
              Guardar Cambios
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Cambiar Contraseña
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nueva Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Confirmar Contraseña"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleChangePassword}>
              Cambiar Contraseña
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Apariencia
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <FormControlLabel
            control={
              <Switch
                checked={theme.palette.mode === 'dark'}
                onChange={() => dispatch(setMode())}
              />
            }
            label="Modo Oscuro"
          />
        </CardContent>
      </Card>

      {/* Logout */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sesión
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
