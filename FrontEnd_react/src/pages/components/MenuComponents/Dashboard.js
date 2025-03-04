import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

// Dados para o gráfico de barras
const barData = [
    { name: 'Análises Atrasadas', valueAtrasadas: 40, valueEmAndamento: 30, valueConcluidas: 30 },
];

// Cores para as barras
const COLORS = ['#D32F2F', '#FFEB3B', '#66BB6A'];

const Dashboard = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 4,
            }}
        >
            {/* Gráfico de Barras */}
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: 2, // Menor padding
                    borderRadius: 3,
                    boxShadow: 5,
                    width: '450px', // Reduzir a largura do gráfico
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Status das Análises
                </Typography>

                <ResponsiveContainer width="100%" height={300}> {/* Reduzir a altura do gráfico */}
                    <BarChart data={barData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* Barra para Análises Atrasadas */}
                        <Bar dataKey="valueAtrasadas" fill={COLORS[0]} />
                        {/* Barra para Em Andamento */}
                        <Bar dataKey="valueEmAndamento" fill={COLORS[1]} />
                        {/* Barra para Concluídas */}
                        <Bar dataKey="valueConcluidas" fill={COLORS[2]} />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default Dashboard;
