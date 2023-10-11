import React, { useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
const students = [
  { id: 1, name: 'John Doe', grade: 'A', status: 'Active', gameScore: 85, timePlayed: 25, activeInGame: true },
  { id: 2, name: 'Jane Smith', grade: 'B', status: 'Inactive', gameScore: 70, timePlayed: 15, activeInGame: false },
  { id: 3, name: 'Bob Johnson', grade: 'C', status: 'Active', gameScore: 60, timePlayed: 30, activeInGame: true },
  { id: 4, name: 'Alice Williams', grade: 'A', status: 'Inactive', gameScore: 90, timePlayed: 40, activeInGame: false },
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

  const chartData = {
    labels: ['Game Score', 'Time Played', 'Active in Game'],
    datasets: [{
      data: [student.gameScore, student.timePlayed, student.activeInGame ? 1 : 0],
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

const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: students.map((student) => ({
    label: student.name,
    fill: false,
    lineTension: 0.1,
    borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`, // Random color
    borderWidth: 2,
    pointRadius: 0, // No data points
    data: generateRandomGameData(student, 6), // 6 data points for each student
  })),
};


const lineChartOptions = {
  scales: {
    y: {
      beginAtZero: false,
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
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Alumnos
      </Typography>

      {/* Display the table of students */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Name</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Grade</TableCell>
              <TableCell style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} style={{ backgroundColor: theme.palette.background.default }}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Display pie charts separately */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {students.map((student) => (
          <div key={student.id}>
            <canvas id={`pieChart-${student.id}`} width="100" height="100"></canvas>
            <Typography variant="body2" align="center">{student.name}</Typography>
          </div>
        ))}
      </div>

      {/* Display Line chart for students' game points */}
      <div style={{ marginTop: '20px' }}>
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
    </>
  );
};

export default Students;
