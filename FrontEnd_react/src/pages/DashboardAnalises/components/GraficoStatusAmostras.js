import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoStatusAmostras = () => {
  const chartData = {
    labels: ['Em andamento', 'Concluídas', 'Atrasadas', 'Pendentes'],
    datasets: [{
      data: [12, 19, 5, 3],
      backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384', '#4BC0C0'],
    }],
  };

  return (
    <div className="card">
      <div className="card-body">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default GraficoStatusAmostras;
