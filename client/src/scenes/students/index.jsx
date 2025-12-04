import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const Students = () => {
  const theme = useTheme();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:6001/api/getUser');
        // Filter only students (rol: "alumno")
        const studentUsers = response.data.filter(user => user.rol === 'alumno');
        setStudents(studentUsers);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los estudiantes');
        setLoading(false);
        console.error('Error fetching students:', err);
      }
    };

    fetchStudents();
  }, []);

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
