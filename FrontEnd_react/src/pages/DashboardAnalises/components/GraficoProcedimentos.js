import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getProcedimentosUsoTotal } from '../../../services/ProcedimentoService'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoProcedimentos = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // implementar depois getProcedimentosMaisUsados()  apenas top 5
        const response = await getProcedimentosUsoTotal();
        const data = response.data;  

        setChartData({
          labels: data.map(item => item.nome),
          datasets: [{
            label: 'Número de Usos',
            data: data.map(item => item.quantidade),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error('Erro ao carregar procedimentos:', error);
      }
    };
    fetchData();
  }, []);

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
            scales: { 
              x: { beginAtZero: true, ticks: { stepSize: 1 } } 
            },
            plugins: {
              legend: { display: false },
              title: { display: false },
            }
          }} 
        />
      </div>
    </div>
  );
};

export default GraficoProcedimentos;
