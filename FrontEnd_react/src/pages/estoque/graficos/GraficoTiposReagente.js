import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const GraficoTiposReagente = () => {
    const [dados, setDados] = useState([]);

    const fetchReagentesPorTipo = async () => {
        try {
            const response = await fetch('http://localhost:8080/reagente/quantidade-por-tipo');
            const data = await response.json();
            //objeto em array para o gráfico
            const dadosFormatados = Object.entries(data).map(([tipo, quantidade]) => ({
                tipo,
                quantidade
            }));
            setDados(dadosFormatados);
        } catch (error) {
            console.error('Erro ao buscar quantidade por tipo:', error);
        }
    };

    useEffect(() => {
        fetchReagentesPorTipo();
    }, []);

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>Quantidade de Reagentes por Tipo</Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dados}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tipo" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="quantidade" fill="#1976d2" />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default GraficoTiposReagente;
