import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Etiqueta = ({ analise }) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Box
            sx={{
                bgcolor: 'white',
                p: 2,
                border: '2px solid green',
                borderRadius: 2,
                maxWidth: '300px',
                width: '100%',
                '@media print': {
                    border: 'none',
                    boxShadow: 'none',
                    width: '100%',
                    maxWidth: '100%',
                },
            }}
        >
            <Typography variant="h6" align="center" gutterBottom sx={{ color: 'green', fontWeight: 'bold' }}>
                Etiqueta da Análise
            </Typography>
            
            <Typography variant="body2"><strong>N° do Pedido:</strong> {analise.pedido || 'N/A'}</Typography>
            <Typography variant="body2"><strong>Cliente:</strong> {analise.contrato ? analise.contrato.nomeContrato : 'N/A'}</Typography>
            <Typography variant="body2"><strong>Ponto de Coleta:</strong> {analise.pontoColeta || 'N/A'}</Typography>
            <Typography variant="body2"><strong>Coletor:</strong> {analise.coletor || 'N/A'}</Typography>
            <Typography variant="body2"><strong>Data:</strong> {analise.prazoFinalizacao}</Typography>
            <Typography variant="body2"><strong>Hora:</strong> {analise.hora || 'N/A'}</Typography>
            <Typography variant="body2"><strong>Matriz:</strong> {analise.matriz ? analise.matriz.nomeMatriz : 'N/A'}</Typography>
            <Typography variant="body2"><strong>Analito:</strong> {analise.analito || 'N/A'}</Typography>

            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" sx={{ bgcolor: 'green', color: 'white' }} onClick={handlePrint}>
                    Imprimir Etiqueta
                </Button>
            </Box>
        </Box>
    );
};

export default Etiqueta;