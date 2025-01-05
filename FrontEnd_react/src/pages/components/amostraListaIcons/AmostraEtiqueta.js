import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const AmostraEtiqueta = ({ amostra }) => {
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
                Etiqueta da Amostra
            </Typography>
            
            <Typography variant="body2">
                <strong>Nome:</strong> {amostra.nome}
            </Typography>
            <Typography variant="body2">
                <strong>ID da Amostra:</strong> {amostra.id}
            </Typography>
            <Typography variant="body2">
                <strong>Prazo Finalização:</strong> {amostra.prazoFinalizacao}
            </Typography>

            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="primary" onClick={handlePrint}>
                    Imprimir Etiqueta
                </Button>
            </Box>
        </Box>
    );
};

export default AmostraEtiqueta;
