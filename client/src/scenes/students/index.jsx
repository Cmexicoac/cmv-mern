import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, Avatar, Chip, Grid, Card, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6001';

// Helper function to format seconds to readable time
const formatTime = (seconds) => {
  if (!seconds || seconds === 0) return '0m';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

const Students = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [gameStats, setGameStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersResponse = await axios.get(`${API_BASE_URL}/api/getUser`);
        const studentUsers = usersResponse.data.filter((user) => user.rol === 'alumno');
        setStudents(studentUsers);

        const statsResponse = await axios.get(`${API_BASE_URL}/api/game-stats`);
        const statsByStudent = {};

        statsResponse.data.forEach((stat) => {
          const studentId = stat.studentId?.toString() || stat._id?.studentId?.toString();
          if (!studentId) return;

          if (!statsByStudent[studentId]) {
            statsByStudent[studentId] = {};
          }

          const gameName = stat.gameName || stat._id?.gameName;
          statsByStudent[studentId][gameName] = {
            totalTime: stat.totalTime || 0,
            totalSessions: stat.totalSessions || 0,
            highestScore: stat.highestScore || 0
          };
        });

        setGameStats(statsByStudent);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get game time for a specific student and game
  const getGameTime = (studentId, gameName) => {
    const studentStats = gameStats[studentId];
    if (studentStats && studentStats[gameName]) {
      return studentStats[gameName].totalTime;
    }
    return 0;
  };

  // Get total time across all games for a student
  const getTotalTime = (studentId) => {
    const studentStats = gameStats[studentId];
    if (!studentStats) return 0;
    
    return Object.values(studentStats).reduce((total, game) => total + (game.totalTime || 0), 0);
  };

  const totalStudents = students.length;
  const totalTrackedTime = students.reduce((acc, student) => acc + getTotalTime(student._id), 0);
  const activeStudents = students.filter((student) => getTotalTime(student._id) > 0).length;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
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
    <Box p="1.5rem">
      <Typography variant="h4" component="h1" gutterBottom>
        Alumnos
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={2}>
        Consulta el avance por juego y entra al perfil de cada estudiante.
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              backgroundColor: theme.palette.background.alt,
              border: `1px solid ${theme.palette.primary[200]}`
            }}
          >
            <CardContent>
              <Typography variant="overline" sx={{ color: theme.palette.secondary.main }}>Total de alumnos</Typography>
              <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>{totalStudents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              backgroundColor: theme.palette.background.alt,
              border: `1px solid ${theme.palette.primary[200]}`
            }}
          >
            <CardContent>
              <Typography variant="overline" sx={{ color: theme.palette.secondary.main }}>Alumnos activos</Typography>
              <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>{activeStudents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              backgroundColor: theme.palette.background.alt,
              border: `1px solid ${theme.palette.primary[200]}`
            }}
          >
            <CardContent>
              <Typography variant="overline" sx={{ color: theme.palette.secondary.main }}>Tiempo total jugado</Typography>
              <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>{formatTime(totalTrackedTime)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.alt,
          border: `1px solid ${theme.palette.primary[200]}`
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100], fontWeight: 600 }}>Foto</TableCell>
              <TableCell sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100], fontWeight: 600 }}>Nombre</TableCell>
              <TableCell sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100], fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100], fontWeight: 600 }}>Matrícula</TableCell>
              <TableCell sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100], fontWeight: 600 }} align="center">Colón</TableCell>
              <TableCell sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100], fontWeight: 600 }} align="center">Conquista</TableCell>
              <TableCell sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100], fontWeight: 600 }} align="center">Cronología</TableCell>
              <TableCell sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100], fontWeight: 600 }} align="center">Preguntas</TableCell>
              <TableCell sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100], fontWeight: 600 }} align="center">Total</TableCell>
              <TableCell sx={{ backgroundColor: theme.palette.primary[400], color: theme.palette.secondary[100], fontWeight: 600 }} align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student._id}
                hover
                sx={{
                  backgroundColor: theme.palette.background.alt,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: theme.palette.primary[100] }
                }}
                onClick={() => navigate(`/home/students/${student._id}`)}
              >
                <TableCell>
                  <Avatar 
                    src={student.foto} 
                    alt={student.nombre}
                    sx={{ width: 40, height: 40 }}
                  >
                    {student.nombre ? student.nombre.charAt(0).toUpperCase() : 'A'}
                  </Avatar>
                </TableCell>
                <TableCell>{student.nombre || 'Sin nombre'}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.matricula}</TableCell>
                <TableCell align="center">
                  <Chip 
                    icon={<AccessTimeIcon />} 
                    label={formatTime(getGameTime(student._id, 'colon'))}
                    size="small"
                    variant="outlined"
                    color={getGameTime(student._id, 'colon') > 0 ? 'primary' : 'default'}
                    sx={getGameTime(student._id, 'colon') > 0 ? { borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main } : {}}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    icon={<AccessTimeIcon />} 
                    label={formatTime(getGameTime(student._id, 'conquista'))}
                    size="small"
                    variant="outlined"
                    color={getGameTime(student._id, 'conquista') > 0 ? 'primary' : 'default'}
                    sx={getGameTime(student._id, 'conquista') > 0 ? { borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main } : {}}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    icon={<AccessTimeIcon />} 
                    label={formatTime(getGameTime(student._id, 'cronologia'))}
                    size="small"
                    variant="outlined"
                    color={getGameTime(student._id, 'cronologia') > 0 ? 'primary' : 'default'}
                    sx={getGameTime(student._id, 'cronologia') > 0 ? { borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main } : {}}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    icon={<AccessTimeIcon />} 
                    label={formatTime(getGameTime(student._id, 'preguntas'))}
                    size="small"
                    variant="outlined"
                    color={getGameTime(student._id, 'preguntas') > 0 ? 'primary' : 'default'}
                    sx={getGameTime(student._id, 'preguntas') > 0 ? { borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main } : {}}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    icon={<AccessTimeIcon />} 
                    label={formatTime(getTotalTime(student._id))}
                    size="small"
                    color={getTotalTime(student._id) > 0 ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.main,
                      '&:hover': {
                        borderColor: theme.palette.secondary.light,
                        backgroundColor: theme.palette.primary[100]
                      }
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/home/students/${student._id}`);
                    }}
                  >
                    Ver perfil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {students.length === 0 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="body1" color="textSecondary">
            No hay estudiantes registrados
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Students;
