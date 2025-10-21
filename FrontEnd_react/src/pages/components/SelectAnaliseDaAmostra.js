import React, { useState, useEffect } from 'react';
import { Modal, Autocomplete, TextField, Button, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { getAnalises } from "../../services/AnaliseService.js";

const SelectAnaliseDaAmostra = ({ open, handleClose }) => {
    const [selectedAnalise, setSelectedAnalise] = useState(null); // análise escolhida pelo usuário
    const [analises, setAnalises] = useState([]); // lista de análises disponíveis
    const navigate = useNavigate();

    const fetchAnalises = async () => {
        try {
            const data = await getAnalises(); 
            setAnalises(data); // <-- CORREÇÃO: popular o array de análises, não o selected
        } catch (error) {
            console.error("Erro ao buscar análises:", error);
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

        navigate('/amostraCadastro', { state: { selectedAnalise } });
        handleClose();
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
                    onClick={handleClose} 
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>

                <h2>PARA CADASTRAR UMA AMOSTRA VOCÊ PRECISA ASSOCIAR ELA A UMA ANÁLISE:</h2>

                <Autocomplete
                    options={analises} // <-- usar array correto
                    getOptionLabel={(option) => option.nome || ""}
                    onChange={(event, value) => setSelectedAnalise(value)} 
                    renderInput={(params) => (
                        <TextField {...params} label="Análise Associada" required margin="normal" fullWidth />
                    )}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm} 
                    sx={{ marginTop: 2 }}
                >
                    Confirmar
                </Button>
            </Box>
        </Modal>
    );
};

export default SelectAnaliseDaAmostra;
