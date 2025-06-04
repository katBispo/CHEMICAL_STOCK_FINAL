import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Box,
  Typography,
  Container,
  Divider,
  useTheme,
} from '@mui/material';

const barData = [
  {
    name: 'Análises',
    valueAtrasadas: 40,
    valueEmAndamento: 30,
    valueConcluidas: 30,
  },
];

const COLORS = {
  valueAtrasadas: '#ef5350',
  valueEmAndamento: '#ffca28',
  valueConcluidas: '#66bb6a',
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 1,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        {payload.map((entry, index) => (
          <Typography key={index} sx={{ color: entry.fill, fontSize: 14 }}>
            <strong>{entry.name}:</strong> {entry.value}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 3,
          boxShadow: 5,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            color: '#333',
          }}
        >
          Dashboard de Análises
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="valueAtrasadas"
              name="Atrasadas"
              fill={COLORS.valueAtrasadas}
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="valueEmAndamento"
              name="Em Andamento"
              fill={COLORS.valueEmAndamento}
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="valueConcluidas"
              name="Concluídas"
              fill={COLORS.valueConcluidas}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};

export default Dashboard;
