import React, { useState, useEffect } from 'react';
import {
    Box, Modal, Typography, IconButton, TextField, Button
} from '@mui/material';
import { FaTimes } from 'react-icons/fa';

const EquipamentoEditOverlay = ({ open, onClose, equipamento, onSave }) => {

    const [editEquipamento, setEditEquipamento] = useState({
        id: equipamento?.id || null,
        nome: equipamento?.nome || '',
        fabricante: equipamento?.fabricante || '',
        modelo: equipamento?.modelo || '',
        numeroSerie: equipamento?.numeroSerie || '',
        dataAquisicao: equipamento?.dataAquisicao || ''
    });

    const [message, setMessage] = useState('');

    // Atualiza quando o equipamento mudar
    useEffect(() => {
        if (equipamento) {
            setEditEquipamento({
                id: equipamento.id,
                nome: equipamento.nome || '',
                fabricante: equipamento.fabricante || '',
                modelo: equipamento.modelo || '',
                numeroSerie: equipamento.numeroSerie || '',
                dataAquisicao: equipamento.dataAquisicao || ''
            });
        }
    }, [equipamento]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditEquipamento(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            if (!editEquipamento.id) {
                setMessage("ID do equipamento não está definido.");
                return;
            }

            const updatedData = {};

            if (editEquipamento.nome) updatedData.nome = editEquipamento.nome;
            if (editEquipamento.fabricante) updatedData.fabricante = editEquipamento.fabricante;
            if (editEquipamento.modelo) updatedData.modelo = editEquipamento.modelo;
            if (editEquipamento.numeroSerie) updatedData.numeroSerie = editEquipamento.numeroSerie;
            if (editEquipamento.dataAquisicao) updatedData.dataAquisicao = editEquipamento.dataAquisicao;

            const response = await fetch(`http://localhost:8080/equipamento/${editEquipamento.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updated = await response.json();
                if (onSave) onSave(updated);

                setMessage("Equipamento atualizado com sucesso!");
                setTimeout(() => setMessage(""), 2000);
                onClose();
            } else {
                const errorText = await response.text();
                setMessage("Erro ao atualizar: " + errorText);
            }
        } catch (error) {
            setMessage("Erro ao enviar requisição: " + error.message);
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
                    maxWidth: '600px',
                    width: '95%',
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Editar Equipamento</Typography>
                    <IconButton onClick={onClose}>
                        <FaTimes style={{ color: '#666', fontSize: 20 }} />
                    </IconButton>
                </Box>

                <TextField
                    label="Nome do Equipamento"
                    name="nome"
                    value={editEquipamento.nome}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Fabricante"
                    name="fabricante"
                    value={editEquipamento.fabricante}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Modelo"
                    name="modelo"
                    value={editEquipamento.modelo}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Número de Série"
                    name="numeroSerie"
                    value={editEquipamento.numeroSerie}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Data de Aquisição"
                    name="dataAquisicao"
                    type="date"
                    value={editEquipamento.dataAquisicao}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />

                {message && (
                    <Typography color="error" mt={2}>{message}</Typography>
                )}

                <Box mt={3} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EquipamentoEditOverlay;
