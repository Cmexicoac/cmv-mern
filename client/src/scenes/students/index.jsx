import React from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const students = [
  { id: 1, name: 'John Doe', grade: 'A', status: 'Active' },
  { id: 2, name: 'Jane Smith', grade: 'B', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', grade: 'C', status: 'Active' },
  { id: 4, name: 'Alice Williams', grade: 'A', status: 'Inactive' },
];

const Students = () => {
  const theme = useTheme();

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Alumnos
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Name</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Grade</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} style={{ backgroundColor: theme.palette.background.default }}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Students