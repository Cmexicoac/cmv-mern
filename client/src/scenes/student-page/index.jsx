import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, Button, Box, CircularProgress, Stack, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GamepadIcon from '@mui/icons-material/Gamepad';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6001';

const StudentPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const userIdFromCookie = Cookies.get('id');
        const selectedId = id || userIdFromCookie;

        if (!selectedId) {
          setError('No se encontró identificador del estudiante');
          return;
        }

        const usersResponse = await axios.get(`${API_BASE_URL}/api/getUser`);
        const currentStudent = usersResponse.data.find(
          (user) => user.rol === 'alumno' && (user._id === selectedId || user.matricula === selectedId)
        );

        if (!currentStudent) {
          setError('Estudiante no encontrado');
          return;
        }

        const statsResponse = await axios.get(`${API_BASE_URL}/api/game-stats/${currentStudent._id}`);
        const byGame = statsResponse.data?.byGame || [];

        const mostPlayedGame = byGame.reduce(
          (best, game) => (game.totalTime > (best?.totalTime || 0) ? game : best),
          null
        );

        const totalPoints = byGame.reduce((sum, game) => sum + (game.highestScore || 0), 0);

        setStudent({
          id: currentStudent._id,
          fullName: currentStudent.nombre || 'Sin nombre',
          email: currentStudent.email || 'Sin correo',
          matricula: currentStudent.matricula || 'Sin matrícula',
          profileImage: currentStudent.foto || '',
          status: 'Activo',
          gamePlaying: mostPlayedGame?._id || 'Sin actividad',
          points: totalPoints
        });

        setError(null);
      } catch (err) {
        setError('Error al cargar los datos del estudiante');
        console.error('Error loading student page:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p="1.5rem">
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box p="1.5rem">
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={2} spacing={1}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Bienvenido, {student.fullName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Este es tu resumen académico y progreso de juego.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
            '&:hover': {
              borderColor: theme.palette.secondary.light,
              backgroundColor: theme.palette.primary[100]
            }
          }}
          onClick={() => navigate('/home/students')}
        >
          Volver a alumnos
        </Button>
      </Stack>

      <Card
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.alt,
          border: `1px solid ${theme.palette.primary[200]}`
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <Avatar
                src={student.profileImage}
                alt="Perfil"
                sx={{
                  width: 150,
                  height: 150,
                  backgroundColor: theme.palette.primary[400],
                  color: theme.palette.secondary[100],
                  border: `3px solid ${theme.palette.secondary.main}`
                }}
              >
                {student.fullName.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={10} container direction="column" justifyContent="center">
              <Typography variant="h5" component="h2" gutterBottom>
                {student.fullName}
              </Typography>
              <Stack direction="row" spacing={1} mb={1.5}>
                <Chip
                  label={`Estado: ${student.status}`}
                  size="small"
                  sx={{ backgroundColor: theme.palette.primary[100], color: theme.palette.secondary.main }}
                />
                <Chip
                  label={`Puntos: ${student.points}`}
                  size="small"
                  sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.primary[600] }}
                />
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100] }}>
                          <EmailIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Correo Electrónico" secondary={student.email} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100] }}>
                          <SchoolIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Matrícula" secondary={student.matricula} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100] }}>
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
                        <Avatar sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100] }}>
                          <GamepadIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Juego Actual" secondary={student.gamePlaying} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100] }}>
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

      <Card
        sx={{
          mt: 2,
          backgroundColor: theme.palette.background.alt,
          border: `1px solid ${theme.palette.primary[200]}`
        }}
        elevation={0}
      >
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Juegos Disponibles
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.background.default,
                  borderColor: theme.palette.primary[200]
                }}
              >
                <CardContent>
                  <Typography variant="h6">Cristóbal Colón</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Aprende sobre el descubrimiento de América
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.primary[600],
                      '&:hover': { backgroundColor: theme.palette.secondary.light }
                    }}
                    onClick={() => navigate('/home/games/colon')}
                  >
                    Jugar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.background.default,
                  borderColor: theme.palette.primary[200]
                }}
              >
                <CardContent>
                  <Typography variant="h6">La Conquista</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Explora la historia de la conquista
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.primary[600],
                      '&:hover': { backgroundColor: theme.palette.secondary.light }
                    }}
                    onClick={() => navigate('/home/games/conquista')}
                  >
                    Jugar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.background.default,
                  borderColor: theme.palette.primary[200]
                }}
              >
                <CardContent>
                  <Typography variant="h6">Cronología</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ordena los eventos históricos
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.primary[600],
                      '&:hover': { backgroundColor: theme.palette.secondary.light }
                    }}
                    onClick={() => navigate('/home/games/cronologia')}
                  >
                    Jugar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentPage;

