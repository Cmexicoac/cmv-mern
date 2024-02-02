import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Card, CardContent, Typography, Container, Box, alpha } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';


const Conquista = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

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
    <Container sx={{position: 'absolute', left: 275, top: 80}}>
      <Typography gutterBottom variant="h2" component="div">
        La Conquista
      </Typography>
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
              <Typography variant="h3" color="text.secondary">  {/* Nuevo Typography para cada párrafo */}
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

export default Conquista;