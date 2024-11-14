import React, { useState, useEffect } from 'react';
import {
    Box, Modal, Typography, Autocomplete, IconButton,
    TextField, Button
} from '@mui/material';
import { FaTimes } from 'react-icons/fa';

const ProcedimentoEditOverlay = ({ open, onClose, procedimento, onSave }) => {
    const [selectedMatriz, setSelectedMatriz] = useState(procedimento ? procedimento.matriz : null);
    const [matrizes, setMatrizes] = useState([]);

    // Estado para armazenar os dados do procedimento a ser editado
    const [editProcedimento, setEditProcedimento] = useState({
        nome: procedimento?.nome || '',
        dataCadastro: procedimento?.dataCadastro || '',
        id: procedimento?.id || null,
    });

    const [message, setMessage] = useState('');

    // Função para buscar as matrizes
    const fetchMatrizes = async () => {
        try {
            const response = await fetch('http://localhost:8080/matriz');
            if (response.ok) {
                const data = await response.json();
                setMatrizes(data);
            } else {
                console.error('Erro ao buscar matrizes:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
    };

    useEffect(() => {
        fetchMatrizes();
    }, []);

    // Atualiza o estado quando o componente recebe um novo procedimento como prop
    useEffect(() => {
        if (procedimento) {
            setEditProcedimento({
                nome: procedimento.nome || '',
                dataCadastro: procedimento.dataCadastro || '',
                id: procedimento.id,
            });
            setSelectedMatriz(procedimento.matriz || null);
        }
    }, [procedimento]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditProcedimento((prev) => ({
            ...prev,
            [name]: value || '',
        }));
    };

    const handleSave = async () => {
        try {
            if (!editProcedimento || !editProcedimento.id) {
                console.error('ID do procedimento não está definido');
                setMessage('ID do procedimento não está definido.');
                return;
            }

            const updatedData = {
                nome: editProcedimento.nome,
                dataCadastro: editProcedimento.dataCadastro,
            };

            // Inclua a matriz se ela foi selecionada
            if (selectedMatriz && selectedMatriz.id) {
                updatedData.matriz = { id: selectedMatriz.id };
            }

            console.log("Dados que serão enviados:", updatedData);

            const response = await fetch(`http://localhost:8080/procedimento/${editProcedimento.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedProcedimento = await response.json();
                if (typeof onSave === 'function') {
                    onSave(updatedProcedimento);
                } else {
                    console.warn("Função onSave não foi passada para o componente ProcedimentoEditOverlay");
                }

                setMessage('Procedimento atualizado com sucesso!');
                setTimeout(() => setMessage(''), 3000);
                onClose();
            } else {
                const errorText = await response.text();
                console.error('Erro ao atualizar procedimento:', errorText);
                setMessage('Erro ao atualizar procedimento: ' + errorText);
            }
        } catch (error) {
            console.error('Erro ao fazer requisição:', error);
            setMessage('Erro ao fazer requisição: ' + error.message);
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
                        Editar Procedimento
                    </Typography>
                    <IconButton onClick={onClose}>
                        <FaTimes style={{ color: '#666', fontSize: '20px' }} />
                    </IconButton>
                </Box>

                <TextField
                    label="Nome do Procedimento"
                    name="nome"
                    value={editProcedimento.nome}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Data de Cadastro"
                    name="dataCadastro"
                    value={editProcedimento.dataCadastro}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="date" // Definindo tipo como data
                    InputLabelProps={{
                        shrink: true,
                    }}
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

export default ProcedimentoEditOverlay;
