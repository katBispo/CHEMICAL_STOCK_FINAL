import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button, Box } from '@mui/material';



const SelectAnaliseDaAmostra = () => {
    const [showOverlay, setShowOverlay] = useState(true);
    const [selectedAnalise, setSelectedAnalise] = useState(null);
    const [analise, setAnalise] = useState([]);



    const fetchAnalises = async () => {
        try {
            const response = await fetch('http://localhost:8080/analise');
            if (response.ok) {
                const data = await response.json();
                setAnalise(data);
            }
        } catch (error) {
            console.error('Erro ao buscar análises:', error);
        }
    };

    useEffect(() => {
        fetchAnalises();
    }, []);




    const handleCloseOverlay = () => {
        if (!selectedAnalise) {
            alert('Você precisa associar a amostra a uma análise antes de continuar.');
            return;
        }
        setShowOverlay(false);
    };

    return (
        <>
            {showOverlay && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        zIndex: 1000,
                    }}
                >
                    <h2>PARA CADASTRAR UMA AMOSTRA VOCÊ PRECISA ASSOCIAR ELA A UMA ANÁLISE:</h2>
                    <Autocomplete
                        options={analise}
                        getOptionLabel={(option) => option.nome}
                        onChange={(event, value) => setSelectedAnalise(value)}
                        renderInput={(params) => (
                            <TextField {...params} label="Análise Associada" required margin="normal" sx={{ width: '300px', backgroundColor: '#fff' }} />
                        )}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCloseOverlay}
                        sx={{ marginTop: 2 }}
                    >
                        Confirmar
                    </Button>
                </Box>
            )}

            {!showOverlay && (
                <form>
                    {/* Formulário de cadastro */}
                    <h1>Cadastro de Amostra</h1>
                    {/* Campos do formulário aqui */}
                </form>
            )}
        </>
    );
};

export default SelectAnaliseDaAmostra;
