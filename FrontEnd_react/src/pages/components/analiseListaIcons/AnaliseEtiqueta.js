import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const AnaliseEtiqueta = ({ analise }) => {
    // Função para iniciar a impressão
    const handlePrint = () => {
        window.print();
    };

    return (
        <Box
            sx={{
                bgcolor: 'white',
                p: 2,
                border: '1px solid #ddd',
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
            <Typography variant="h6" align="center" gutterBottom>
                Etiqueta da Análise
            </Typography>
            
            <Typography variant="body2">
                <strong>Nome:</strong> {analise.nome}
            </Typography>
            <Typography variant="body2">
                <strong>Data Final:</strong> {analise.prazoFinalizacao}
            </Typography>
            <Typography variant="body2">
                <strong>Cliente:</strong> {analise.contrato ? analise.contrato.nomeContrato : 'N/A'}
            </Typography>
            <Typography variant="body2">
                <strong>Matriz:</strong> {analise.matriz ? analise.matriz.nomeMatriz : 'N/A'}
            </Typography>
            <Typography variant="body2">
                <strong>Analito:</strong> {analise.analito}
            </Typography>
            <Typography variant="body2">
                <strong>Quantidade de Amostras:</strong> {analise.qtdAmostras}
            </Typography>
            <Typography variant="body2">
                <strong>Status:</strong> {analise.status}
            </Typography>

            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="primary" onClick={handlePrint}>
                    Imprimir Etiqueta
                </Button>
            </Box>
        </Box>
    );
};

export default AnaliseEtiqueta;
