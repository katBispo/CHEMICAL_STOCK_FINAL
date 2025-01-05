import React, { useState, useEffect } from 'react';
import { Modal, Autocomplete, TextField, Button, Box, IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


const SelectAnaliseDaAmostra = ({ open, handleClose }) => {
    const [selectedAnalise, setSelectedAnalise] = useState(null);
    const [analise, setAnalise] = useState([]);
    const navigate = useNavigate();

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

    const handleConfirm = () => {
        if (!selectedAnalise) {
            alert('Você precisa associar a amostra a uma análise antes de continuar.');
            return;
        }

        // Passa a análise selecionada para a página de cadastro de amostras usando o navigate
        navigate('/amostraCadastro', { state: { selectedAnalise } }); // Passa a análise via 'state'
        handleClose(); // Fecha o modal
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'white',
                    borderRadius: 4,
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center',
                }}
            >
                <IconButton
                    onClick={handleClose} // Chama a função para fechar
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <h2>PARA CADASTRAR UMA AMOSTRA VOCÊ PRECISA ASSOCIAR ELA A UMA ANÁLISE:</h2>
                <Autocomplete
                    options={analise}
                    getOptionLabel={(option) => option.nome}
                    onChange={(event, value) => setSelectedAnalise(value)} // Salva a análise selecionada localmente
                    renderInput={(params) => (
                        <TextField {...params} label="Análise Associada" required margin="normal" fullWidth />
                    )}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm} // Chama a função handleConfirm ao clicar no botão
                    sx={{ marginTop: 2 }}
                >
                    Confirmar
                </Button>
            </Box>
        </Modal>
    );
};

export default SelectAnaliseDaAmostra;
