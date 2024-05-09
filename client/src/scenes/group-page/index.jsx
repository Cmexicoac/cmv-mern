import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import {useParams} from "react-router-dom"
import SchoolIcon from '@mui/icons-material/School';
import { Link } from "react-router-dom";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LockIcon from '@mui/icons-material/Lock';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GamepadIcon from '@mui/icons-material/Gamepad';
import StarIcon from '@mui/icons-material/Star';

import Cookies from 'js-cookie';

const GroupPage = () => {
  const userId = Cookies.get('id');

  const theme = useTheme();
  const params = useParams();

  const [group, setGroup] = useState({
    groupName: params.id,
    averageGrade: "C",
    students: [],
    studentNumber: 0,
    schoolGrade: 'Sexto Grado',
    bestGame: 'Cristóbal Colón',
    worstGame: 'Preguntas y respuestas',
    bestStudent: "John Doe",
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/getAlumnos')  // replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
        setGroup(prevState => ({
          ...prevState,
          students: data,
          studentNumber: data.length
        }));
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <Typography variant="h1" component="h1" gutterBottom style={{ maxWidth: '200px', marginTop: "50%"}} >
                {params.id}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8} container direction="column" justifyContent="center">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <SchoolIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Nota media" secondary={group.averageGrade} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <PermIdentityIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Cantidad de estudiantes" secondary={group.studentNumber} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <SquareFootIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Grado Escolar" secondary={group.schoolGrade} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <CheckCircleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Mejor Juego" secondary={group.bestGame} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <GamepadIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Peor Juego" secondary={group.worstGame} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <StarIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Mejor estudiante" secondary={group.bestStudent} />
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
        <Typography variant="h3" component="h3" gutterBottom >
          Estudiantes en el grupo
        </Typography>
        <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Calificación</TableCell>
                  <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Estatus</TableCell>
                  <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Juego Jugando</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {group.students.map((student) => (
                  <TableRow key={student.id} style={{ backgroundColor: theme.palette.background.default }}>
                    <TableCell><Link to={`/home/students/${student.name}`}>{student.name}</Link></TableCell>
                    <TableCell>{student.grado}</TableCell>
                    <TableCell>{student.status}</TableCell>
                    <TableCell>{student.gamePlaying}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default GroupPage