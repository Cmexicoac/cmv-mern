
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard"
import Layout from "scenes/layout"
import Students from "scenes/students";
import Login from "scenes/login";


function App() {

  const mode = useSelector((state) => state.global.mode) 
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  console.log("Current mode:", mode);
  console.log("Current theme:", theme);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Layout/>}>
              {/* <Route path="" element={<Navigate to='/home' replace/>}/> */}
              <Route path="dashboard" element={<Dashboard/>}/>
              <Route path="students" element={<Students/>}/>
            </Route>
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
     

    </div>
  );
}

export default App;
