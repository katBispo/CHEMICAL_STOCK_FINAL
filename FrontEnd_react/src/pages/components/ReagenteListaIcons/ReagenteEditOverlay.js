import React, { useState, useEffect } from 'react';
import {
    Box, Modal, Typography, Autocomplete, IconButton,
    TextField, Button
} from '@mui/material';
import { FaTimes } from 'react-icons/fa';

const ReagenteEditOverlay = ({ open, onClose, reagente, onSave }) => {

    const [editReagente, setEditReagente] = useState({
        nome: reagente?.nome || '',
        dataVencimento: reagente?.dataVencimento || '',
        fabricante: reagente?.fabricante || '',
        lote: reagente?.lote || '',
        id: reagente?.id || null
    });

    const [message, setMessage] = useState('');

    // Atualiza quando o reagente muda
    useEffect(() => {
        if (reagente) {
            setEditReagente({
                nome: reagente.nome || '',
                dataVencimento: reagente.dataVencimento || '',
                fabricante: reagente.fabricante || '',
                lote: reagente.lote || '',
                id: reagente.id
            });
        }
    }, [reagente]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditReagente((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            if (!editReagente.id) {
                setMessage('ID do reagente não está definido.');
                return;
            }

            const updatedData = {
                nome: editReagente.nome,
                dataVencimento: editReagente.dataVencimento,
                fabricante: editReagente.fabricante,
                lote: editReagente.lote
            };

            const response = await fetch(`http://localhost:8080/reagente/${editReagente.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                const updatedReagente = await response.json();
                if (typeof onSave === 'function') onSave(updatedReagente);
                setMessage('Reagente atualizado com sucesso!');
                setTimeout(() => setMessage(''), 3000);
                onClose();
            } else {
                const errorText = await response.text();
                setMessage('Erro ao atualizar reagente: ' + errorText);
            }
        } catch (error) {
            setMessage('Erro ao fazer requisição: ' + error.message);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'white', boxShadow: 24, p: 4,
                borderRadius: 2, maxWidth: '800px', width: '100%'
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Editar Reagente</Typography>
                    <IconButton onClick={onClose}>
                        <FaTimes style={{ color: '#666', fontSize: '20px' }} />
                    </IconButton>
                </Box>

                <TextField
                    label="Nome"
                    name="nome"
                    value={editReagente.nome}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Data de Vencimento"
                    name="dataVencimento"
                    type="date"
                    value={editReagente.dataVencimento}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Fabricante"
                    name="fabricante"
                    value={editReagente.fabricante}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Lote"
                    name="lote"
                    value={editReagente.lote}
                    onChange={handleChange}
                    fullWidth
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

export default ReagenteEditOverlay;
