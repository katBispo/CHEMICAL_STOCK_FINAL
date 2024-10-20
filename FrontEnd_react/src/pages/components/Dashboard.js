import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend } from 'recharts';


// Dados para o gráfico de barras
const barData = [
    { name: 'Reagente 1', quantidade: 400 },
    { name: 'Reagente 2', quantidade: 300 },
    { name: 'Reagente 3', quantidade: 200 },
    { name: 'Reagente 4', quantidade: 278 },
    { name: 'Reagente 5', quantidade: 189 },
];

// Dados para o gráfico de pizza
const pieData = [
    { name: 'Análises Atrasadas', value: 40 },
    { name: 'Em Andamento', value: 30 },
    { name: 'Concluídas', value: 30 },
];

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

const Dashboard = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between', // Para espaço entre os gráficos
                mt: 4,
            }}
        >
            {/* Gráfico de Barras */}
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 7,
                    width: '48%', // Define a largura para deixar espaço ao lado
                    mr: 2,
                }}
            >
                <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                    Reagentes Utilizados
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quantidade" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>

            {/* Gráfico de Pizza */}
{/* Gráfico de Pizza */}
<Box
    sx={{
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 2,
        boxShadow: 7,
        width: '48%', // Mantém a largura para ficar ao lado do gráfico de barras
    }}
>

    <ResponsiveContainer width="100%" height={400}> {/* Aumente a altura aqui */}
        <PieChart>
            <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150} 
                fill="#8884d8"
                dataKey="value"
            >
                {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend
                layout="vertical" // A legenda será exibida verticalmente
                align="right"      // Alinha a legenda à direita
                verticalAlign="middle" // Centraliza verticalmente a legenda
                payload={pieData.map((entry, index) => ({
                    id: entry.name,
                    type: 'square',
                    value: entry.name,
                    color: COLORS[index % COLORS.length],
                }))}
            />
        </PieChart>
    </ResponsiveContainer>
</Box>

        </Box>
    );
};

export default Dashboard;
