import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoProcedimentos = () => {
  const chartData = {
    labels: ['Procedimento A', 'Procedimento B', 'Procedimento C', 'Procedimento D'],
    datasets: [{
      label: 'Número de Usos',
      data: [8, 15, 6, 11],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="card shadow-md p-4">
      <div className="card-header font-bold text-lg mb-2">
        Procedimentos Mais Utilizados
      </div>
      <div className="card-body">
        <Bar 
          data={chartData} 
          options={{ 
            indexAxis: 'y', 
            scales: { x: { beginAtZero: true } },
            plugins: {
              legend: { display: false },
            }
          }} 
        />
      </div>
    </div>
  );
};

export default GraficoProcedimentos;
