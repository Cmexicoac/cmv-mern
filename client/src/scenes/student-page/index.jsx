import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, Button, TextField, Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GamepadIcon from '@mui/icons-material/Gamepad';
import StarIcon from '@mui/icons-material/Star';
import Cookies from 'js-cookie';
import axios from 'axios';

const StudentPage = () => {
  const theme = useTheme();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userId = Cookies.get('id');
        const response = await axios.get('http://localhost:6001/api/getUser');
        const currentStudent = response.data.find(user => user._id === userId);
        
        if (currentStudent) {
          setStudent({
            fullName: currentStudent.nombre || 'Sin nombre',
            email: currentStudent.email,
            matricula: currentStudent.matricula,
            profileImage: currentStudent.foto || 'https://picsum.photos/200',
            status: 'Activo',
            gamePlaying: 'Cristóbal Colón',
            points: 0,
          });
        } else {
          setError('Estudiante no encontrado');
        }
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos del estudiante');
        setLoading(false);
        console.error('Error fetching student:', err);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6">
        {error}
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenido, {student.fullName}
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <Avatar
                src={student.profileImage}
                alt="Perfil"
                sx={{ width: 150, height: 150 }}
              >
                {student.fullName.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={10} container direction="column" justifyContent="center">
              <Typography variant="h5" component="h2" gutterBottom>
                {student.fullName}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <EmailIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Correo Electrónico" secondary={student.email} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <SchoolIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Matrícula" secondary={student.matricula} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <CheckCircleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Estado" secondary={student.status} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <GamepadIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Juego Actual" secondary={student.gamePlaying} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <StarIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Puntos" secondary={student.points} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card style={{ marginTop: '16px' }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Juegos Disponibles
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Cristóbal Colón</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Aprende sobre el descubrimiento de América
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/home/games/colon">
                    Jugar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">La Conquista</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Explora la historia de la conquista
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/home/games/conquista">
                    Jugar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Cronología</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ordena los eventos históricos
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/home/games/cronologia">
                    Jugar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default StudentPage;

