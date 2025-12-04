import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Card, CardContent, Typography, Container, Box, alpha, Chip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useGameTracking from '../../hooks/useGameTracking';


const Cronologia = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const { 
    sessionStarted, 
    formattedTime, 
    startGame, 
    endGame 
  } = useGameTracking('cronologia');

  // Retrieve the user's name and role from the cookies
  const nombre = Cookies.get('nombre');
  const role = Cookies.get('rol');

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // Start tracking when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      startGame();
    }, 1000);

    return () => {
      clearTimeout(timer);
      endGame();
    };
  }, []);

  return (
    <Container sx={{position: 'absolute', left: 275, top: 80}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography gutterBottom variant="h2" component="div">
          Cronología Prehispánica
        </Typography>
        {sessionStarted && role === 'alumno' && (
          <Chip 
            icon={<AccessTimeIcon />} 
            label={`Tiempo: ${formattedTime}`} 
            color="primary" 
            variant="outlined"
            sx={{ fontSize: '1.2rem', padding: '20px 10px' }}
          />
        )}
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box sx={{ width: (windowSize.innerWidth - 360), height: 750, bgcolor: alpha('#6C6C6C', 0.5) }}/>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h2" component="div">
                Controles
              </Typography>
              <Typography variant="h3" color="text.secondary">
                Flechas: Moverse
              </Typography>
              <Typography variant="h3" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Curabitur pretium lectus in lacus interdum, a tempus sem ornare.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      
    </Container>
    
  );
};

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

export default Cronologia;