import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getEquipamentosMaisUsados } from '../../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoEquipamentos = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEquipamentosMaisUsados();
        const data = response.data;  // Ex: [{ nome: 'Espectrofotômetro', count: 10 }, ...]
        setChartData({
          labels: data.map(item => item.nome),
          datasets: [{
            label: 'Usos',
            data: data.map(item => item.count),
            backgroundColor: 'rgba(153,102,255,0.6)',
          }],
        });
      } catch (error) {
        console.error('Erro ao carregar equipamentos:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="card">
      <div className="card-header">Equipamentos Mais Utilizados</div>
      <div className="card-body">
        <Bar 
          data={chartData} 
          options={{ indexAxis: 'y', scales: { x: { beginAtZero: true } } }} 
        />
      </div>
    </div>
  );
};

export default GraficoEquipamentos;