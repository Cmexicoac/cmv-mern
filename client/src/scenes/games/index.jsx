import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Container,
  Box,
  Grid,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const gamesList = [
  { id: 'colon', title: 'En búsqueda del Nuevo Mundo', desc: 'Sé parte de la tripulación de Cristobal Colón y explora el mundo acompañándolo en sus diferentes viajes.', img: require('assets/images/juegos/colon.png'), path: '/home/games/colon' },
  { id: 'conquista', title: 'La Conquista', desc: 'Revive algunos de los eventos más importantes de la conquista de México junto a Hernan Cortéz.', img: require('assets/images/juegos/conquista.png'), path: '/home/games/conquista' },
  { id: 'cronologia', title: 'Cronología Prehispánica', desc: 'Aprende sobre las civilizaciones prehispánicas mexicanas y algunos otros eventos importantes en la historia de México.', img: require('assets/images/juegos/cronologia.png'), path: '/home/games/cronologia' },
  { id: 'preguntas', title: 'Preguntas y Respuestas', desc: 'Descubre qué tanto sabes sobre México en este quiz lleno de preguntas de todo tipo.', img: require('assets/images/juegos/preguntas.png'), path: '/home/games/preguntas' },
];

const Games = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // opcional: cualquier setup
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Juegos</Typography>

      <Grid container spacing={3}>
        {gamesList.map((game) => (
          <Grid item key={game.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea onClick={() => navigate(game.path)} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <CardMedia
                  component="img"
                  image={game.img}
                  alt={game.title}
                  sx={{
                    width: '100%',
                    height: { xs: 160, sm: 190, md: 220 },
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {game.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {game.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Games;
