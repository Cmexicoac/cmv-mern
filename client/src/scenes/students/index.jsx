import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, Avatar, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
  const [students, setStudents] = useState([]);
  const [gameStats, setGameStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch students
        const usersResponse = await axios.get('http://localhost:6001/api/getUser');
        const studentUsers = usersResponse.data.filter(user => user.rol === 'alumno');
        setStudents(studentUsers);

        // Fetch game stats for all students
        const statsResponse = await axios.get('http://localhost:6001/api/game-stats');
        
        // Organize stats by student ID
        const statsByStudent = {};
        statsResponse.data.forEach(stat => {
          const studentId = stat.studentId?.toString() || stat._id?.studentId?.toString();
          if (!statsByStudent[studentId]) {
            statsByStudent[studentId] = {};
          }
          const gameName = stat.gameName || stat._id?.gameName;
          statsByStudent[studentId][gameName] = {
            totalTime: stat.totalTime,
            totalSessions: stat.totalSessions,
            highestScore: stat.highestScore
          };
        });
        
        setGameStats(statsByStudent);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos');
        setLoading(false);
        console.error('Error fetching data:', err);
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
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Alumnos
      </Typography>

      {/* Display the table of students */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Foto</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Nombre</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Email</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Matrícula</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }} align="center">Colón</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }} align="center">Conquista</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }} align="center">Cronología</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }} align="center">Preguntas</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }} align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id} style={{ backgroundColor: theme.palette.background.default }}>
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
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    icon={<AccessTimeIcon />} 
                    label={formatTime(getGameTime(student._id, 'conquista'))}
                    size="small"
                    variant="outlined"
                    color={getGameTime(student._id, 'conquista') > 0 ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    icon={<AccessTimeIcon />} 
                    label={formatTime(getGameTime(student._id, 'cronologia'))}
                    size="small"
                    variant="outlined"
                    color={getGameTime(student._id, 'cronologia') > 0 ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    icon={<AccessTimeIcon />} 
                    label={formatTime(getGameTime(student._id, 'preguntas'))}
                    size="small"
                    variant="outlined"
                    color={getGameTime(student._id, 'preguntas') > 0 ? 'primary' : 'default'}
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
    </>
  );
};

export default Students;
