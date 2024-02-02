import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardMedia, CardActionArea, Typography, Container, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Cookies from 'js-cookie';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from "react-router-dom";

const Games = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const theme = useTheme();
  const navigate = useNavigate();

  // Retrieve the user's name and role from the cookies
  const nombre = Cookies.get('nombre');
  const role = Cookies.get('role');

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Container maxWidth='sm'>
      <Box sx={{ position: 'absolute', left: 300, top: 100, width: (windowSize.innerWidth - 360)}}>
        <Grid container spacing={4}>
        {/* Add Grid item for each game. Change info, image and route */}
          <Grid item xs={4}>
              <Card sx={{ 
                maxWidth: 800 
                }}>
                <CardActionArea onClick={() => navigate('/home/games/colon')}>   {/* Game path */}
                  <CardMedia
                    component="img"
                    height="250"
                    image={require('assets/images/juegos/colon.png')}
                    alt="Colón"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                      En búsqueda del Nuevo Mundo
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Sé parte de la tripulación de Cristobal Colón y explora el mundo acompañándolo en sus diferentes viajes.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ 
              maxWidth: 800 
              }}>
              <CardActionArea onClick={() => navigate('/home/games/conquista')}>
                <CardMedia
                  component="img"
                  height="250"
                  image={require('assets/images/juegos/conquista.png')}
                  alt="Conquista"
                />
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    La Conquista
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Revive algunos de los eventos más importantes de la conquista de México junto a Hernan Cortéz.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ 
              maxWidth: 800 
              }}>
              <CardActionArea onClick={() => navigate('/home/games/cronologia')}>
                <CardMedia
                  component="img"
                  height="250"
                  image={require('assets/images/juegos/cronologia.png')}
                  alt="Cronos"
                />
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    Cronología Prehispánica
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Aprende sobre las civilizaciones prehispánicas mexicanas y algunos otros eventos importantes en la historia de México.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ 
              maxWidth: 800 
              }}>
              <CardActionArea onClick={() => navigate('/home/games/preguntas')}>
                <CardMedia
                  component="img"
                  height="250"
                  image={require('assets/images/juegos/preguntas.png')}
                  alt="Preguntas"
                />
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    Preguntas y Respuestas
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Descubre qué tanto sabes sobre México en este quiz lleno de preguntas de todo tipo.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};


function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

export default Games;
