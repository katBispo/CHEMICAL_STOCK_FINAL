import React, { useState } from 'react';
import { Paper, TextField, Button, Grid } from '@mui/material';

const OverlayFiltroEquipamento = ({ open, onApplyFilters, onClearFilters, onClose }) => {
    const [filtros, setFiltros] = useState({
        nome: '',
        categoria: '',
        fabricante: '',
        dataInicio: '',
        dataFim: '',
        patrimonio: ''
    });

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
    };

    const handleApply = () => {
        onApplyFilters(filtros);
    };

    const handleClear = () => {
        setFiltros({
            nome: '',
            categoria: '',
            fabricante: '',
            dataInicio: '',
            dataFim: '',
            patrimonio: ''
        });
        onClearFilters();
    };

    if (!open) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button
                    onClick={onClose}
                    style={{
                        alignSelf: 'flex-end',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '18px',
                        cursor: 'pointer',
                        color: '#444',
                        marginBottom: '10px'
                    }}
                >
                    ✕
                </button>

                <Paper elevation={2} sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Nome do Equipamento"
                                name="nome"
                                value={filtros.nome}
                                onChange={handleFiltroChange}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Categoria"
                                name="categoria"
                                value={filtros.categoria}
                                onChange={handleFiltroChange}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Fabricante"
                                name="fabricante"
                                value={filtros.fabricante}
                                onChange={handleFiltroChange}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Data Início Cadastro"
                                name="dataInicio"
                                type="date"
                                value={filtros.dataInicio}
                                onChange={handleFiltroChange}
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Data Fim Cadastro"
                                name="dataFim"
                                type="date"
                                value={filtros.dataFim}
                                onChange={handleFiltroChange}
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Patrimônio / Nº Inventário"
                                name="patrimonio"
                                value={filtros.patrimonio}
                                onChange={handleFiltroChange}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleApply}
                                sx={{ height: '56px' }}
                            >
                                Aplicar Filtros
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                onClick={handleClear}
                                sx={{ height: '56px' }}
                            >
                                Limpar Filtros
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1100,
};

const modalStyle = {
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
    maxWidth: '700px',
    width: '90%',
    maxHeight: '80%',
    overflowY: 'auto',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
};

export default OverlayFiltroEquipamento;
