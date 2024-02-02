import React, { useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const groups = [
  { id: 1, name: '1A', avgGrade: 'A', studentsPlaying: 10, aprobados: 15, reprobados: 15,},
  { id: 2, name: '1B', avgGrade: 'B', studentsPlaying: 5, aprobados: 14, reprobados: 16,},
  { id: 3, name: '2A', avgGrade: 'C', studentsPlaying: 23, aprobados: 10, reprobados: 20,},
  { id: 4, name: '2B', avgGrade: 'A', studentsPlaying: 15, aprobados: 25, reprobados: 5,}
];

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
  const theme = useTheme();

  useEffect(() => {
    groups.forEach((group) => {
      const canvas = document.getElementById(`pieChart-${group.id}`);
      if (canvas) {
        createPieChart(canvas, group, theme);
      }
    });
  }, [theme]);

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