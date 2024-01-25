import React from 'react';
import Cookies from 'js-cookie';

const Dashboard = () => {
  // Retrieve the user's name and role from the cookies
  const nombre = Cookies.get('nombre');
  const role = Cookies.get('role');

  return (
    <div style={{ fontSize: '35px', fontFamily: 'Calibri' }}>
      Hola Profesor: {nombre}
    </div>
    
  );
};

export default Dashboard;