import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const createPieChart = (canvas, group, theme) => {
  const existingChart = Chart.getChart(canvas);
  if (existingChart) {
    existingChart.destroy();
  }

  const chartData = {
    labels: ['Aprobados', 'Reprobados'],
    datasets: [{
      data: [group.aprobados, group.reprobados],
      backgroundColor: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.error.main,
      ],
    }],
  };

  new Chart(canvas, {
    type: 'pie',
    data: chartData,
  });
};

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getGroupsByTeacherId/660cd023188073f19a417fca');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    groups.forEach((group) => {
      const canvas = document.getElementById(`pieChart-${group.id}`);
      if (canvas) {
        createPieChart(canvas, group, theme);
      }
    });
  }, [groups, theme]);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Grupos
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Grupo</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Calificación Promedio</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Estudiantes Jugando</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id} style={{ backgroundColor: theme.palette.background.default }}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.avgGrade}</TableCell>
                <TableCell>{group.studentsPlaying}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: "10%"}}>
        {groups.map((group) => (
          <div key={group.id}>
            <canvas id={`pieChart-${group.id}`} width="100" height="100"></canvas>
            <Typography variant="body2" align="center">{`Group ${group.name}`}</Typography>
          </div>
        ))}
      </div>
    </>
  );
};

export default Groups