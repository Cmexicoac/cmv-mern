import React, { useEffect } from 'react';
import {
  Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Grid, Card, Box, Chip, Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const COLORS = ['#8B1A1A', '#1976d2', '#388e3c', '#8e24aa']; // paleta para cada grupo

const groups = [
  { id: 1, name: '1A', avgGrade: 'A', studentsPlaying: 10, aprobados: 15, reprobados: 15, status: 'Activo' },
  { id: 2, name: '1B', avgGrade: 'B', studentsPlaying: 5, aprobados: 14, reprobados: 16, status: 'Inactivo' },
  { id: 3, name: '2A', avgGrade: 'C', studentsPlaying: 23, aprobados: 10, reprobados: 20, status: 'Activo' },
  { id: 4, name: '2B', avgGrade: 'A', studentsPlaying: 15, aprobados: 25, reprobados: 5, status: 'Activo' }
];

const createPieChart = (canvas, group, theme) => {
  const existingChart = Chart.getChart(canvas);
  if (existingChart) {
    existingChart.destroy();
  }

  const idx = (group.id - 1) % COLORS.length;
  const groupColor = COLORS[idx];

  const chartData = {
    labels: ['Aprobados', 'Reprobados'],
    datasets: [{
      data: [group.aprobados, group.reprobados],
      backgroundColor: [
        groupColor,
        '#E6EEF4', // color suave para reprobados
      ],
      borderWidth: 0,
    }],
  };

  new Chart(canvas, {
    type: 'pie',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: { enabled: true }
      }
    },
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

  const getStatusChip = (status) => {
    if (status === 'Activo') return <Chip label="Activo" size="small" sx={{ bgcolor: '#dff6e9', color: '#1b5e20' }} />;
    return <Chip label="Inactivo" size="small" sx={{ bgcolor: '#fdecea', color: '#b71c1c' }} />;
  };

  return (
    <>
      <Box sx={{ fontFamily: 'Inter, Roboto, "Open Sans", Arial, sans-serif', pb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3, fontWeight: 700 }}>
          Resultados de Alumnos
        </Typography>

        <Grid container spacing={3}>
          {/* Resumen general: tabla en card */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" sx={{ mb: 1, textAlign: 'left', fontWeight: 700 }}>
                Resumen general
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#f0f4f8', color: theme.palette.primary.dark, fontWeight: 700 }}>Grupo</TableCell>
                      <TableCell sx={{ backgroundColor: '#f0f4f8', color: theme.palette.primary.dark, fontWeight: 700 }}>Calificación Promedio</TableCell>
                      <TableCell sx={{ backgroundColor: '#f0f4f8', color: theme.palette.primary.dark, fontWeight: 700 }}>Estudiantes Jugando</TableCell>
                      <TableCell sx={{ backgroundColor: '#f0f4f8', color: theme.palette.primary.dark, fontWeight: 700 }}>Estatus</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groups.map((group) => (
                      <TableRow key={group.id} sx={{ '&:not(:last-child)': { borderBottom: '1px solid rgba(0,0,0,0.06)' } }}>
                        <TableCell sx={{ py: 2 }}>{group.name}</TableCell>
                        <TableCell sx={{ py: 2 }}>{group.avgGrade}</TableCell>
                        <TableCell sx={{ py: 2 }}>{group.studentsPlaying}</TableCell>
                        <TableCell sx={{ py: 2 }}>{getStatusChip(group.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Evolución mensual: separada, fondo ligero distinto y divider */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1, backgroundColor: '#fbfdff' }}>
              <Typography variant="h6" sx={{ mb: 1, textAlign: 'left', fontWeight: 700 }}>
                Evolución mensual
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2} alignItems="center" justifyContent="center">
                {groups.map((group) => {
                  const total = group.aprobados + group.reprobados;
                  const pct = total ? Math.round((group.aprobados / total) * 100) : 0;
                  return (
                    <Grid item xs={6} md={3} key={group.id}>
                      <Card sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 2,
                        minHeight: 220,
                        borderRadius: '12px',
                        boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
                      }}>
                        <Box sx={{ width: 100, height: 100, position: 'relative' }}>
                          <canvas id={`pieChart-${group.id}`} className="pie-canvas" />
                          <Box className="pie-center-text">{`${pct}%`}</Box>
                        </Box>

                        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 700 }}>{group.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Promedio: {group.avgGrade}</Typography>
                        <Box sx={{ mt: 1 }}>{getStatusChip(group.status)}</Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Groups;