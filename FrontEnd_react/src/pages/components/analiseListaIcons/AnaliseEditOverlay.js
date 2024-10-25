import React, { useState, useEffect } from 'react';
import {
    Box, Modal, Typography, Autocomplete, IconButton, RadioGroup,
    FormControlLabel,
    Radio, TextField, Button
} from '@mui/material';
import { FaTimes } from 'react-icons/fa';

const AnaliseEditOverlay = ({ open, onClose, analise, onSave }) => {

    const [selectedMatriz, setSelectedMatriz] = useState(analise ? analise.matriz : null);
    const [matrizes, setMatrizes] = useState([]); // Para armazenar as matrizes
    const [editAnalise, setEditAnalise] = useState({
        nome: '',
        prazoFinalizacao: '',
        status: 'EM_ANDAMENTO', // Defina um valor padrão para o status
        id: analise ? analise.id : null, // Certifique-se de que o ID está definido
    });
    const [message, setMessage] = useState(''); // Estado para mensagem de erro/sucesso

    const fetchMatrizes = async () => {
        console.log("Buscando matrizes...");
        try {
            const response = await fetch('http://localhost:8080/matriz');
            console.log("Status da resposta:", response.status);
            const responseText = await response.text();
            console.log("Conteúdo da resposta:", responseText);

            if (response.ok) {
                const data = JSON.parse(responseText);
                console.log("Dados das matrizes:", data);
                setMatrizes(data);
            } else {
                console.error('Erro ao buscar matrizes:', responseText);
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
    };

    useEffect(() => {
        fetchMatrizes();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditAnalise((prev) => ({
            ...prev,
            [name]: value || '', // Define um valor padrão para evitar undefined
        }));
    };

    const handleSave = async () => {
        try {
            if (!editAnalise.id) {
                console.error('ID da análise não definido');
                return;
            }

            const response = await fetch(`http://localhost:8080/analise/${editAnalise.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editAnalise),
            });

            console.log("Status da resposta:", response.status); // Log do status da resposta

            if (response.ok) {
                const updatedAnalise = await response.json();
                onSave(updatedAnalise);
                setMessage('Análise atualizada com sucesso!'); // Mensagem de sucesso
                onClose();
            } else {
                const errorText = await response.text();
                console.error('Erro ao atualizar análise:', errorText);
                setMessage('Erro ao atualizar análise: ' + errorText); // Mensagem de erro
            }
        } catch (error) {
            console.error('Erro ao fazer requisição:', error);
            setMessage('Erro ao fazer requisição: ' + error.message); // Mensagem de erro
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    outline: 'none',
                    maxWidth: '800px',
                    width: '100%',
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="h2">
                        Editar Detalhes da Análise
                    </Typography>
                    <IconButton onClick={onClose}>
                        <FaTimes style={{ color: '#666', fontSize: '20px' }} />
                    </IconButton>
                </Box>

                <TextField
                    label="Nome"
                    name="nome"
                    value={editAnalise.nome}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Prazo Final"
                    name="prazoFinalizacao"
                    value={editAnalise.prazoFinalizacao}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <Autocomplete
                    options={matrizes}
                    getOptionLabel={(option) => option.nomeMatriz || ''}
                    onChange={(event, value) => setSelectedMatriz(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Matriz"
                            required
                            margin="normal"
                            style={{ width: '350px' }}
                        />
                    )}
                />
                {selectedMatriz && (
                    <div>
                        <h4>Matriz Selecionada:</h4>
                        <p>{selectedMatriz.nomeMatriz}</p>
                    </div>
                )}

                <RadioGroup
                    name="status"
                    value={editAnalise.status}
                    onChange={handleChange}
                    row
                >
                    <FormControlLabel value="EM_ANDAMENTO" control={<Radio />} label="Em Andamento" />
                    <FormControlLabel value="CONCLUIDA" control={<Radio />} label="Concluída" />
                    <FormControlLabel value="ATRASADA" control={<Radio />} label="Atrasada" />
                </RadioGroup>

                {message && (
                    <Typography variant="body2" color="error" mt={2}>
                        {message}
                    </Typography>
                )}

                <Box display="flex" justifyContent="flex-end" mt={3}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AnaliseEditOverlay;
