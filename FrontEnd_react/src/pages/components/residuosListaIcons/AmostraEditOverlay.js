import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Typography, Button, IconButton } from '@mui/material';
import { FaTimes } from 'react-icons/fa';

const AmostraEditOverlay = ({ open, onClose, amostra, onSave }) => {

    const [editAmostra, setEditAmostra] = useState({
        id: null,
        nome: '',
        dataColeta: '',
        prazoFinalizacao: '',
        enderecoColeta: '',
        descricao: '',
        dataCadastro: '',
        coordenadaColeta: '',

        // campos somente leitura (relacionamentos)
        analiseNome: '',
        procedimentosNomes: [],
        analitosNomes: [],
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (amostra) {
            setEditAmostra({
                id: amostra.id,
                nome: amostra.nome || '',
                enderecoColeta: amostra.enderecoColeta || '',
                dataColeta: amostra.dataColeta || '',
                prazoFinalizacao: amostra.prazoFinalizacao || '',
                descricao: amostra.descricao || '',
                dataCadastro: amostra.dataCadastro || '',
                coordenadaColeta: amostra.coordenadaColeta || '',

                // 🔽 AJUSTES IMPORTANTES
                analiseNome: amostra.analise?.nome || '',
                procedimentosNomes: amostra.procedimentos?.map(p => p.nome) || [],
                analitosNomes: amostra.analitos?.map(a => a.classificacao) || [],
            });
        }
            console.log('AMOSTRA RECEBIDA:', amostra);

    }, [amostra]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditAmostra(prev => ({
            ...prev,
            [name]: value || '',
        }));
    };

    const handleSave = async () => {
        try {
            if (!editAmostra.id) {
                setMessage('ID da amostra não definido.');
                return;
            }

            // 🔴 NÃO enviamos análise, procedimentos e analitos
            const payload = {
                id: editAmostra.id,
                nome: editAmostra.nome,
                dataColeta: editAmostra.dataColeta,
                prazoFinalizacao: editAmostra.prazoFinalizacao,
                enderecoColeta: editAmostra.enderecoColeta,
                descricao: editAmostra.descricao,
                coordenadaColeta: editAmostra.coordenadaColeta,
            };

            const response = await fetch(`http://localhost:8080/amostra/${editAmostra.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const updatedAmostra = await response.json();
                onSave?.(updatedAmostra);
                setMessage('Amostra atualizada com sucesso!');
                setTimeout(() => setMessage(''), 3000);
                onClose();
            } else {
                const errorText = await response.text();
                setMessage('Erro ao atualizar: ' + errorText);
            }
        } catch (error) {
            setMessage('Erro de requisição: ' + error.message);
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
                {/* HEADER */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Editar Amostra</Typography>
                    <IconButton onClick={onClose}>
                        <FaTimes />
                    </IconButton>
                </Box>

                {/* CAMPOS EDITÁVEIS */}
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
                    label="Descrição"
                    name="descricao"
                    value={editAmostra.descricao}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    margin="normal"
                />

                <TextField
                    label="Coordenada de Coleta"
                    name="coordenadaColeta"
                    value={editAmostra.coordenadaColeta}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* CAMPOS SOMENTE LEITURA */}
                <TextField
                    label="Análise"
                    value={editAmostra.analiseNome}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                />

                <TextField
                    label="Procedimentos"
                    value={editAmostra.procedimentosNomes.join(', ')}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                />

                <TextField
                    label="Analitos"
                    value={editAmostra.analitosNomes.join(', ')}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                />

                {message && (
                    <Typography color="error" mt={2}>
                        {message}
                    </Typography>
                )}

                <Box display="flex" justifyContent="flex-end" mt={3}>
                    <Button variant="contained" onClick={handleSave}>
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AmostraEditOverlay;
