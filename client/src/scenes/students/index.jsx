import React, { useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
const students = [
  { id: 1, name: 'John Doe', grade: 'A', status: 'Activo', gameScore: 85, timePlayed: 25, activeInGame: true, color: '#8B1A1A' }, // vino
  { id: 2, name: 'Jane Smith', grade: 'B', status: 'Inactivo', gameScore: 70, timePlayed: 15, activeInGame: false, color: '#1976d2' }, // azul
  { id: 3, name: 'Bob Johnson', grade: 'C', status: 'Activo', gameScore: 60, timePlayed: 30, activeInGame: true, color: '#388e3c' }, // verde
  { id: 4, name: 'Alice Williams', grade: 'A', status: 'Inactivo', gameScore: 90, timePlayed: 40, activeInGame: false, color: '#fbc02d' }, // amarillo
];

// Generate random game score data for each student over time
const generateRandomGameData = (student, numDataPoints) => {
  const data = [];
  let score = student.gameScore;
  for (let i = 0; i < numDataPoints; i++) {
    // Simulate incremental changes in the game score
    const scoreChange = Math.floor(Math.random() * 20) - 10; // Random value between -10 and 10
    score += scoreChange;
    data.push(score);
  }
  return data;
};

const createPieChart = (canvas, student, theme) => {
  // Check if the chart already exists, and destroy it if it does.
  const existingChart = Chart.getChart(canvas);
  if (existingChart) {
    existingChart.destroy();
  }


  // Usa el color vinculado para cada alumno
  const mainColor = student.color || theme.palette.primary.main;

  const chartData = {
    labels: ['Puntuación', 'Tiempo jugado', 'Activo en el juego'],
    datasets: [{
      data: [student.gameScore, student.timePlayed, student.activeInGame ? 1 : 0],
      backgroundColor: [
        mainColor,
        theme.palette.secondary.main,
        theme.palette.error.main,
      ],
    }],
  };

  // Plugin para mostrar solo el porcentaje en el centro
  const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
      const { ctx, chartArea: { width, height } } = chart;
      ctx.save();
  ctx.font = 'bold 22px Inter, Roboto, "Open Sans", Arial, sans-serif';
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${student.gameScore}%`, width / 2, height / 2);
      ctx.restore();
    }
  };

  new Chart(canvas, {
    type: 'pie',
    data: chartData,
    options: {
      plugins: {
        legend: { display: false }
      }
    },
    plugins: [centerTextPlugin]
  });
};

const lineChartData = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: students.map((student) => ({
    label: student.name,
    fill: false,
    lineTension: 0.1,
    borderColor: student.color || `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    borderWidth: 2,
    pointRadius: 5, // Mostrar un punto en cada valor
    pointBackgroundColor: student.color || '#fff',
    pointBorderColor: '#fff',
    pointBorderWidth: 2,
    data: generateRandomGameData(student, 6), // 6 data points for each student
  })),
};


const lineChartOptions = {
  scales: {
    x: {
      ticks: {
  color: '#222',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      grid: {
        color: 'rgba(255,255,255,0.2)',
      },
    },
    y: {
      beginAtZero: false,
      ticks: {
  color: '#222',
        font: {
          size: 14,
        },
      },
      grid: {
        color: 'rgba(255,255,255,0.2)',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
  color: '#222',
        font: {
          size: 14,
        },
      },
    },
  },
};

const Students = () => {
  const theme = useTheme();

  useEffect(() => {
    students.forEach((student) => {
      const canvas = document.getElementById(`pieChart-${student.id}`);
      if (canvas) {
        createPieChart(canvas, student, theme);
      }
    });
  }, [theme]);

  return (
    <div style={{ fontFamily: 'Inter, Roboto, "Open Sans", Arial, sans-serif' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Alumnos
      </Typography>

  {/* Card para la tabla de alumnos */}
      <Typography 
        variant="h5" 
        style={{ 
          fontWeight: 700, 
          marginBottom: 12, 
          textAlign: 'center', 
          fontFamily: 'Inter, Roboto, "Open Sans", Arial, sans-serif' 
        }}
      >
        Resultados de Alumnos
      </Typography>
  <Card elevation={3} style={{ borderRadius: 18, boxShadow: '0 2px 12px 0 rgba(60,60,60,0.07)', marginBottom: 40, padding: 24 }}>
        <TableContainer component={Paper} style={{ boxShadow: 'none', borderRadius: 12 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: '#f0f4f8', color: theme.palette.primary.dark, fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell style={{ backgroundColor: '#f0f4f8', color: theme.palette.primary.dark, fontWeight: 'bold' }}>Calificación</TableCell>
                <TableCell style={{ backgroundColor: '#f0f4f8', color: theme.palette.primary.dark, fontWeight: 'bold' }}>Estatus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, idx) => (
                <TableRow
                  key={student.id}
                  style={{ backgroundColor: theme.palette.background.default, borderBottom: '1px solid #e0e0e0' }}
                >
                  <TableCell style={{ paddingTop: 14, paddingBottom: 14 }}>{student.name}</TableCell>
                  <TableCell style={{ paddingTop: 14, paddingBottom: 14 }}>{student.grade}</TableCell>
                  <TableCell style={{ paddingTop: 14, paddingBottom: 14 }}>
                    {student.status === 'Activo' ? (
                      <Chip label="Activo" style={{ backgroundColor: '#4caf50', color: 'white', fontWeight: 'bold' }} size="small" />
                    ) : (
                      <Chip label="Inactivo" style={{ backgroundColor: '#f44336', color: 'white', fontWeight: 'bold' }} size="small" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

  {/* Card para las gráficas */}
      <Typography 
        variant="h5" 
        style={{ 
          fontWeight: 700, 
          marginBottom: 12, 
          marginTop: 48, 
          textAlign: 'center', 
          fontFamily: 'Inter, Roboto, "Open Sans", Arial, sans-serif' 
        }}
      >
        Evolución Mensual
      </Typography>
  <Card elevation={3} style={{ borderRadius: 18, boxShadow: '0 2px 12px 0 rgba(60,60,60,0.07)', padding: 24 }}>
        {/* Display pie charts separately */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '32px', flexWrap: 'nowrap' }}>
          {students.map((student) => (
            <div key={student.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
              <canvas id={`pieChart-${student.id}`} width="110" height="110" style={{ display: 'block', margin: '0 auto' }}></canvas>
              <Typography variant="body2" align="center" style={{ marginTop: 8 }}>{student.name}</Typography>
            </div>
          ))}
        </div>

        {/* Espacio entre pie charts y line chart */}
        <div style={{ marginTop: '40px', background: 'rgba(240,244,248,0.85)', borderRadius: 16, padding: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: 700 }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
      </Card>
  </div>
  );
};

export default Students;
