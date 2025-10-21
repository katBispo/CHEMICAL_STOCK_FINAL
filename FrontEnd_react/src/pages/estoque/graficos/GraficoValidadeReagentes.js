import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Paper, Typography } from '@mui/material';
import { getGraficoValidade } from '../../../services/reagenteService';

const COLORS = ['#FF6B6B', '#FFD93D', '#4CAF50'];

const GraficoValidadeReagentes = () => {
  const [dados, setDados] = useState([]);

  const fetchGraficoValidade = async () => {
    try {
      console.log('🔄 Iniciando requisição para /reagente/grafico-validade...');
      const data = await getGraficoValidade(); 
      console.log('📦 Dados recebidos do backend:', data);

      const { vencidos, vencemEm15Dias, vencemEntre15e30Dias } = data;

      const dadosFormatados = [
        { name: 'Vencidos', value: vencidos },
        { name: 'Próximos a Vencer (15 dias)', value: vencemEm15Dias },
        { name: 'No Prazo (16 a 30 dias)', value: vencemEntre15e30Dias },
      ];

      console.log('📊 Dados formatados para o gráfico:', dadosFormatados);
      setDados(dadosFormatados);
    } catch (error) {
      console.error('🚨 Erro ao buscar dados do gráfico:', error);
    }
  };

  useEffect(() => {
    fetchGraficoValidade();
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Validade dos Reagentes
      </Typography>
      <PieChart width={400} height={300}>
        <Pie
          data={dados}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {dados.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Paper>
  );
};

export default GraficoValidadeReagentes;
