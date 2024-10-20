import React, { useState } from 'react';
import { Box, Button, TextField, Paper, Backdrop } from '@mui/material';

const FilterOverlay = ({ onApply, onCancel }) => {
    // Estados locais para armazenar os valores dos filtros
    const [nome, setNome] = useState('');
    const [matriz, setMatriz] = useState('');
    const [analito, setAnalito] = useState('');

    // Função para lidar com a aplicação do filtro
    const handleApply = () => {
        onApply({ nome, matriz, analito });
    };

    return (
        <Backdrop open={true} style={{ zIndex: 1200 }}>
            <Paper 
                style={{ 
                    padding: '20px', 
                    borderRadius: '10px', 
                    maxWidth: '400px', 
                    margin: '0 auto',
                    backgroundColor: '#fff'
                }}
            >
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Nome"
                        variant="outlined"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <TextField
                        label="Matriz"
                        variant="outlined"
                        value={matriz}
                        onChange={(e) => setMatriz(e.target.value)}
                    />
                    <TextField
                        label="Analito"
                        variant="outlined"
                        value={analito}
                        onChange={(e) => setAnalito(e.target.value)}
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button variant="contained" color="success" onClick={handleApply}>
                            Aplicar
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={onCancel}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>
    );
};

export default FilterOverlay;
