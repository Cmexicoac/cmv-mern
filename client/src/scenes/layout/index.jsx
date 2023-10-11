import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from "components/Navbar"
import Sidebar from "components/Sidebar"

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const isSidebarVisible = location.pathname !== "/";
  const isLoginPage = location.pathname === "/";

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
  {isSidebarVisible && (
    <Sidebar
      isNonMobile={isNonMobile}
      drawerWidth="250px"
      isSidebarOpen={true}
    />
  )}
  <Box width="100%"> {/* Ensure the parent Box takes full width */}
    {!isLoginPage && (
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    )}
    <Outlet />
  </Box>
</Box>
  );
};
export default Layout;