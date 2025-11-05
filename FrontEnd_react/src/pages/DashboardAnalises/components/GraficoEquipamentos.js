import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const GraficoEquipamentos = () => {
  const top5Data = {
    labels: ['Centrífuga', 'Microscópio', 'Balança', 'Estufa', 'Phmetro'],
    datasets: [{
      label: 'Usos',
      data: [30, 25, 22, 18, 10],
      backgroundColor: 'rgba(153,102,255,0.6)',
    }],
  };

  const statusData = {
    labels: ['Ativo', 'Manutenção', 'Inativo'],
    datasets: [{
      data: [10, 2, 3],
      backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
    }],
  };

  const procedimentoData = {
    labels: ['Análise 1', 'Análise 2', 'Análise 3'],
    datasets: [{
      label: 'Equipamentos por Procedimento',
      data: [5, 8, 6],
      backgroundColor: 'rgba(75,192,192,0.6)',
    }],
  };

  const usoData = {
    labels: ['Equipamento 1', 'Equipamento 2', 'Equipamento 3'],
    datasets: [{
      label: 'Quantidade de Usos',
      data: [20, 15, 9],
      backgroundColor: 'rgba(255,159,64,0.6)',
    }],
  };

  return (
    <div className="container">
      <h2>Dashboard de Equipamentos</h2>

      <div className="card mb-4">
        <div className="card-header">Top 5 Equipamentos Mais Utilizados</div>
        <div className="card-body">
          <Bar data={top5Data} options={{ indexAxis: 'y', scales: { x: { beginAtZero: true } } }} />
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Distribuição de Equipamentos por Status</div>
        <div className="card-body">
          <Pie data={statusData} />
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Distribuição por Procedimento</div>
        <div className="card-body">
          <Bar data={procedimentoData} options={{ scales: { y: { beginAtZero: true } } }} />
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Contagem de Uso</div>
        <div className="card-body">
          <Bar data={usoData} options={{ scales: { y: { beginAtZero: true } } }} />
        </div>
      </div>
    </div>
  );
};

export default GraficoEquipamentos;
