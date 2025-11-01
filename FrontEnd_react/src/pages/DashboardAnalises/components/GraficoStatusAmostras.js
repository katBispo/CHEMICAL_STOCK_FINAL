import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getStatusAmostras } from '../../services/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoStatusAmostras = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatusAmostras();
        const data = response.data;  
        setChartData({
          labels: data.map(item => item.status),
          datasets: [{
            data: data.map(item => item.count),
            backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384', '#4BC0C0'],
          }],
        });
      } catch (error) {
        console.error('Erro ao carregar status:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="card">
      <div className="card-header">Distribuição de Status das Amostras</div>
      <div className="card-body">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default GraficoStatusAmostras;