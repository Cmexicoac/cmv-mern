import React, { useState } from 'react';
import { Card, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, Button, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LockIcon from '@mui/icons-material/Lock';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GamepadIcon from '@mui/icons-material/Gamepad';
import StarIcon from '@mui/icons-material/Star';

const StudentPage = () => {
  const theme = useTheme();

  // Dummy student data
  const [student, setStudent] = useState({
    fullName: 'Juan Pérez',
    classroom: 'Salón 1',
    rollNumber: 'A0012332',
    schoolGrade: 'Sexto Grado',
    profileImage: 'https://picsum.photos/200',
    username: 'juanperez',
    password: '********',
    status: 'Activo',
    gamePlaying: 'Cristóbal Colón',
    points: 100,
  });

  const [username, setUsername] = useState(student.username);
  const [password, setPassword] = useState(student.password);

  const handleProfilePictureChange = () => {
    // TODO: Implement profile picture change logic
    console.log('Profile picture changed');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSaveChanges = () => {
    setStudent({
      ...student,
      username,
      password,
    });
  };

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <img src={student.profileImage} alt="Perfil" style={{ maxWidth: '200px', borderRadius: '50%' }} />
              <Button variant="contained" color="primary" onClick={handleProfilePictureChange} style={{ marginTop: '16px' }}>
                Cambiar Foto de Perfil
              </Button>
            </Grid>
            <Grid item xs={12} md={8} container direction="column" justifyContent="center">
              <Typography variant="h5" component="h2" gutterBottom>
                {student.fullName}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <SchoolIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Salón" secondary={student.classroom} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <PermIdentityIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Número de Registro" secondary={student.rollNumber} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <SquareFootIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Grado Escolar" secondary={student.schoolGrade} />
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
                      <ListItemText primary="Estado" secondary={student.status} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <GamepadIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Juego Jugando" secondary={student.gamePlaying} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <StarIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Puntos en Juego" secondary={student.points} />
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
            Información de Cuenta
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                  <PermIdentityIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Nombre de Usuario" secondary={student.username} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                  <LockIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Contraseña" secondary={student.password} />
            </ListItem>
          </List>
          <TextField label="Nombre de Usuario" value={username} onChange={handleUsernameChange} fullWidth margin="normal" />
          <TextField label="Contraseña" value={password} onChange={handlePasswordChange} fullWidth margin="normal" />
          <Button variant="contained" color="primary" onClick={handleSaveChanges} style={{ marginTop: '16px' }}>
            Guardar Cambios
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default StudentPage;