import React from 'react';
import Cookies from 'js-cookie';

const mGame = () => {
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
          <Grid item xs={12}>
            
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

export default mGame;