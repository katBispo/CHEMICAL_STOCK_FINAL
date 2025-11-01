import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { 
  getTop5MaisUsados, 
  getStatusEquipamentos, 
  getDistribuicaoPorProcedimento, 
  getContagemDeUso 
} from '../../../services/EquipamentoService'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const GraficoEquipamentos = () => {
  const [top5Data, setTop5Data] = useState({ labels: [], datasets: [] });
  const [statusData, setStatusData] = useState({ labels: [], datasets: [] });
  const [procedimentoData, setProcedimentoData] = useState({ labels: [], datasets: [] });
  const [usoData, setUsoData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ===== Top 5 mais usados =====
        const top5 = await getTop5MaisUsados();
        setTop5Data({
          labels: top5.data.map(item => item.nome),
          datasets: [{
            label: 'Usos',
            data: top5.data.map(item => item.quantidade),
            backgroundColor: 'rgba(153,102,255,0.6)',
          }],
        });

        // ===== Distribuição por status =====
        const status = await getStatusEquipamentos();
        setStatusData({
          labels: status.data.map(item => item.nome),
          datasets: [{
            data: status.data.map(item => item.quantidade),
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
          }],
        });

        // ===== Distribuição por procedimento =====
        const procedimento = await getDistribuicaoPorProcedimento();
        setProcedimentoData({
          labels: procedimento.data.map(item => item.nome),
          datasets: [{
            label: 'Quantidade de Equipamentos',
            data: procedimento.data.map(item => item.quantidade),
            backgroundColor: 'rgba(75,192,192,0.6)',
          }],
        });

        // ===== Contagem de uso total =====
        const uso = await getContagemDeUso();
        setUsoData({
          labels: uso.data.map(item => item.nome),
          datasets: [{
            label: 'Quantidade de usos',
            data: uso.data.map(item => item.quantidade),
            backgroundColor: 'rgba(255,159,64,0.6)',
          }],
        });

      } catch (error) {
        console.error('Erro ao carregar dados dos equipamentos:', error);
      }
    };

    fetchData();
  }, []);

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
        <div className="card-header">Distribuição de Equipamentos por Procedimento</div>
        <div className="card-body">
          <Bar data={procedimentoData} options={{ scales: { y: { beginAtZero: true } } }} />
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Contagem de Uso de Cada Equipamento</div>
        <div className="card-body">
          <Bar data={usoData} options={{ scales: { y: { beginAtZero: true } } }} />
        </div>
      </div>
    </div>
  );
};

export default GraficoEquipamentos;
