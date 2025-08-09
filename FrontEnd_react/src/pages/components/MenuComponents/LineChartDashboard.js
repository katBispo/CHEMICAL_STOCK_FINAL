import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Box, Button, Typography } from '@mui/material';

const dadosMock = {
  amostrasAtrasadas: [
    { mes: 'Jan', quantidade: 15 },
    { mes: 'Fev', quantidade: 10 },
    { mes: 'Mar', quantidade: 25 },
    { mes: 'Abr', quantidade: 30 },
    { mes: 'Mai', quantidade: 5 },
    { mes: 'Jun', quantidade: 8 },
    { mes: 'Jul', quantidade: 12 },
    { mes: 'Ago', quantidade: 6 },
    { mes: 'Set', quantidade: 4 },
    { mes: 'Out', quantidade: 7 },
    { mes: 'Nov', quantidade: 10 },
    { mes: 'Dez', quantidade: 9 },
  ],
  reagentesVencidos: [
    { mes: 'Jan', quantidade: 5 },
    { mes: 'Fev', quantidade: 8 },
    { mes: 'Mar', quantidade: 12 },
    { mes: 'Abr', quantidade: 2 },
    { mes: 'Mai', quantidade: 6 },
    { mes: 'Jun', quantidade: 4 },
    { mes: 'Jul', quantidade: 7 },
    { mes: 'Ago', quantidade: 3 },
    { mes: 'Set', quantidade: 1 },
    { mes: 'Out', quantidade: 5 },
    { mes: 'Nov', quantidade: 9 },
    { mes: 'Dez', quantidade: 2 },
  ],
  reagentesCadastrados: [
    { mes: 'Jan', quantidade: 20 },
    { mes: 'Fev', quantidade: 22 },
    { mes: 'Mar', quantidade: 18 },
    { mes: 'Abr', quantidade: 25 },
    { mes: 'Mai', quantidade: 10 },
    { mes: 'Jun', quantidade: 15 },
    { mes: 'Jul', quantidade: 19 },
    { mes: 'Ago', quantidade: 13 },
    { mes: 'Set', quantidade: 16 },
    { mes: 'Out', quantidade: 21 },
    { mes: 'Nov', quantidade: 14 },
    { mes: 'Dez', quantidade: 11 },
  ],
};

const LineChartDashboard = () => {
  const [data, setData] = useState([]);
  const [tipo, setTipo] = useState('amostrasAtrasadas');

  useEffect(() => {
    setData(dadosMock[tipo]);
  }, [tipo]);

  const handleButtonClick = (type) => {
    setTipo(type);
  };

  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: 3,
        p: 3,
        boxShadow: 2,
        transition: 'box-shadow 0.3s ease',
        '&:hover': { boxShadow: 4 },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, textAlign: 'center', fontSize: '1.25rem' }}>
        {tipo === 'amostrasAtrasadas' ? 'Amostras Atrasadas' : tipo === 'reagentesVencidos' ? 'Reagentes Vencidos' : 'Reagentes Cadastrados'}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 3 }}>
        {[
          { type: 'amostrasAtrasadas', label: 'Amostras Atrasadas', icon: '📊' },
          { type: 'reagentesVencidos', label: 'Reagentes Vencidos', icon: '⏰' },
          { type: 'reagentesCadastrados', label: 'Reagentes Cadastrados', icon: '🧪' },
        ].map((btn) => (
          <Button
            key={btn.type}
            variant={tipo === btn.type ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick(btn.type)}
            sx={{
              bgcolor: tipo === btn.type ? '#4CAF50' : 'white',
              borderColor: '#4CAF50',
              color: tipo === btn.type ? 'white' : '#333',
              px: 3,
              py: 1,
              borderRadius: '12px',
              boxShadow: 2,
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              '&:hover': {
                bgcolor: tipo === btn.type ? '#388E3C' : '#F1F3F4',
                borderColor: '#4CAF50',
                boxShadow: 4,
                transform: 'scale(1.03)',
              },
              textTransform: 'none',
            }}
            aria-label={btn.label}
          >
            <Box sx={{ mr: 1, bgcolor: tipo === btn.type ? 'white' : '#4CAF50', color: tipo === btn.type ? '#4CAF50' : 'white', borderRadius: '50%', p: 1, fontSize: '14px' }}>
              {btn.icon}
            </Box>
            {btn.label}
          </Button>
        ))}
      </Box>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis dataKey="mes" interval={0} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            labelStyle={{ color: '#333' }}
          />
          <Legend wrapperStyle={{ fontSize: 14, paddingTop: 10 }} />
          <Line
            type="monotone"
            dataKey="quantidade"
            stroke={
              tipo === 'amostrasAtrasadas' ? '#3b82f6' : tipo === 'reagentesVencidos' ? '#ef4444' : '#22c55e'
            }
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChartDashboard;