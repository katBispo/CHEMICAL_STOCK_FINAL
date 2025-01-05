import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Typography, Button, IconButton } from '@mui/material';
import { FaTimes } from 'react-icons/fa';

const AmostraEditOverlay = ({ open, onClose, amostra, onSave }) => {
    const [editAmostra, setEditAmostra] = useState({
        nome: amostra?.nome || '',
        dataColeta: amostra?.dataColeta || '',
        prazoFinalizacao: amostra?.prazoFinalizacao || '',
        procedimento: amostra?.procedimento || '',
        descricao: amostra?.descricao || '',
        id: amostra?.id || null, // Certifique-se de que o ID está definido
    });

    const [message, setMessage] = useState(''); // Estado para mensagem de erro/sucesso

    // Atualiza o estado quando o componente recebe uma nova `amostra` como prop
    useEffect(() => {
        if (amostra) {
            setEditAmostra({
                nome: amostra.nome || '',
                dataColeta: amostra.dataColeta || '',
                prazoFinalizacao: amostra.prazoFinalizacao || '',
                procedimento: amostra.procedimento || '',
                descricao: amostra.descricao || '',
                id: amostra.id,
            });
        }
    }, [amostra]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditAmostra((prev) => ({
            ...prev,
            [name]: value || '', // Define um valor padrão para evitar undefined
        }));
    };

    const handleSave = async () => {
        try {
            if (!editAmostra || !editAmostra.id) {
                setMessage('ID da amostra não está definido.');
                return;
            }

            const response = await fetch(`http://localhost:8080/amostra/${editAmostra.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editAmostra),
            });

            if (response.ok) {
                const updatedAmostra = await response.json();
                if (typeof onSave === 'function') {
                    onSave(updatedAmostra);
                }
                setMessage('Amostra atualizada com sucesso!');
                setTimeout(() => setMessage(''), 3000);
                onClose();
            } else {
                const errorText = await response.text();
                setMessage('Erro ao atualizar amostra: ' + errorText);
            }
        } catch (error) {
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
                        Editar Amostra
                    </Typography>
                    <IconButton onClick={onClose}>
                        <FaTimes style={{ color: '#666', fontSize: '20px' }} />
                    </IconButton>
                </Box>

                <TextField
                    label="Nome"
                    name="nome"
                    value={editAmostra.nome}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Data de Coleta"
                    name="dataColeta"
                    type="date"
                    value={editAmostra.dataColeta}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Prazo Finalização"
                    name="prazoFinalizacao"
                    type="date"
                    value={editAmostra.prazoFinalizacao}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Procedimento"
                    name="procedimento"
                    value={editAmostra.procedimento}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Descrição"
                    name="descricao"
                    value={editAmostra.descricao}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                />

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

export default AmostraEditOverlay;
