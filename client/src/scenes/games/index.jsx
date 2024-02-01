import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardMedia, CardActionArea, Typography, Container, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Cookies from 'js-cookie';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from "react-router-dom";
import { positions } from '@mui/system';



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
    <Container>
      <Box sx={{ position: 'absolute', left: 300, top: 100, width: (windowSize.innerWidth - 360)}}>
        <Grid container spacing={4}>
          {/* Add Grid item for each game. Change info, image and route */}
          <Grid item xs={4}>
              <Card sx={{ 
                maxWidth: 800 
                }}>
                <CardActionArea onClick={() => navigate('/home/games/game1')}>   {/* Game path */}
                  <CardMedia
                    component="img"
                    height="200"
                    image='https://picsum.photos/800/600?random=1'
                    alt="Logo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                      Lorem Ipsum
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Curabitur pretium lectus in lacus interdum, a tempus sem ornare.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ 
              maxWidth: 800 
              }}>
              <CardActionArea onClick={() => navigate('/home')}>
                <CardMedia
                  component="img"
                  height="200"
                  image='https://picsum.photos/800/600?random=2'
                  alt="Logo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Curabitur pretium lectus in lacus interdum, a tempus sem ornare.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ 
              maxWidth: 800 
              }}>
              <CardActionArea onClick={() => navigate('/home')}>
                <CardMedia
                  component="img"
                  height="200"
                  image='https://picsum.photos/800/600?random=3'
                  alt="Logo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Curabitur pretium lectus in lacus interdum, a tempus sem ornare.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ 
              maxWidth: 800 
              }}>
              <CardActionArea onClick={() => navigate('/home')}>
                <CardMedia
                  component="img"
                  height="200"
                  image='https://picsum.photos/800/600?random=4'
                  alt="Logo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Curabitur pretium lectus in lacus interdum, a tempus sem ornare.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ 
              maxWidth: 800 
              }}>
              <CardActionArea onClick={() => navigate('/home')}>
                <CardMedia
                  component="img"
                  height="200"
                  image='https://picsum.photos/800/600?random=5'
                  alt="Logo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Curabitur pretium lectus in lacus interdum, a tempus sem ornare.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ 
              maxWidth: 800 
              }}>
              <CardActionArea onClick={() => navigate('/home')}>
                <CardMedia
                  component="img"
                  height="200"
                  image='https://picsum.photos/800/600?random=6'
                  alt="Logo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Curabitur pretium lectus in lacus interdum, a tempus sem ornare.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ 
              maxWidth: 800 
              }}>
              <CardActionArea onClick={() => navigate('/home')}>
                <CardMedia
                  component="img"
                  height="200"
                  image='https://picsum.photos/800/600?random=7'
                  alt="Logo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Curabitur pretium lectus in lacus interdum, a tempus sem ornare.
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
