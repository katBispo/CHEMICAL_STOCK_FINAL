import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Chart from 'chart.js/auto';

const barData = [
  {
    name: 'Análises',
    valueAtrasadas: 40,
    valueEmAndamento: 30,
    valueConcluidas: 30,
  },
];

const Dashboard = () => {
  React.useEffect(() => {
    const ctx = document.getElementById('dashboardChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Análises'],
        datasets: [
          {
            label: 'Atrasadas',
            data: [barData[0].valueAtrasadas],
            backgroundColor: '#EF5350',
          },
          {
            label: 'Em Andamento',
            data: [barData[0].valueEmAndamento],
            backgroundColor: '#FFCA28',
          },
          {
            label: 'Concluídas',
            data: [barData[0].valueConcluidas],
            backgroundColor: '#66BB6A',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Status das Análises em Tempo Real',
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 3,
        boxShadow: 3,
        textAlign: 'center',
        transition: 'box-shadow 0.3s ease',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 2, color: '#333' }}
      >
        Status das Análises em Tempo Real
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <canvas id="dashboardChart" style={{ maxHeight: '300px' }} />
    </Box>
  );
};

export default Dashboard;