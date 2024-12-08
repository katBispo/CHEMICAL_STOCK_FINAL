import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, IconButton, Button, TextField, Autocomplete,RadioGroup,Radio,FormControlLabel } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';



const ContratoEditOverlay = ({ open, onClose, contrato, onSave }) => {
    const [editContrato, setEditContrato] = useState({
        numeroContrato: contrato?.numeroContrato || '',
        nomeContrato: contrato?.nomeContrato || '',
        dataContrato: contrato?.dataContrato || '',
        dataEntrega: contrato?.dataEntrega || '',
        observacao: contrato?.observacao || '',
        statusContrato: contrato?.statusContrato || 'ATIVO',
        cliente: contrato?.cliente || null,
        id: contrato?.id || null, // Certifique-se de que o ID está definido
    });

    const [clientes, setClientes] = useState([]); // Lista de clientes para o autocomplete
    const [selectedCliente, setSelectedCliente] = useState(contrato?.cliente || null);
    const [message, setMessage] = useState(''); // Mensagem de erro ou sucesso



    // Função para buscar os clientes
    const fetchClientes = async () => {
        try {
            const response = await fetch('http://localhost:8080/cliente');
            if (response.ok) {
                const data = await response.json();
                setClientes(data);
            } else {
                console.error('Erro ao buscar clientes:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    // Atualiza o estado quando o componente recebe um novo `contrato` como prop
    useEffect(() => {
        if (contrato) {
            setEditContrato({
                numeroContrato: contrato.numeroContrato || '',
                nomeContrato: contrato.nomeContrato || '',
                dataContrato: contrato.dataContrato || '',
                dataEntrega: contrato.dataEntrega || '',
                observacao: contrato.observacao || '',
                statusContrato: contrato.statusContrato || 'ATIVO',
                cliente: contrato.cliente || null,
                id: contrato.id,
            });
            setSelectedCliente(contrato.cliente || null);
        }
    }, [contrato]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditContrato((prev) => ({
            ...prev,
            [name]: value || '',
        }));
    };

    const handleSave = async () => {
        try {
            if (!editContrato || !editContrato.id) {
                console.error('ID do contrato não está definido');
                setMessage('ID do contrato não está definido.');
                return;
            }

            // Comece a construir o objeto de dados atualizado
            const updatedData = {};

            // Adicione apenas os campos que foram modificados
            if (editContrato.numeroContrato) {
                updatedData.numeroContrato = editContrato.numeroContrato;
            }

            if (editContrato.nomeContrato) {
                updatedData.nomeContrato = editContrato.nomeContrato;
            }

            if (editContrato.dataContrato) {
                updatedData.dataContrato = editContrato.dataContrato;
            }

            if (editContrato.dataEntrega) {
                updatedData.dataEntrega = editContrato.dataEntrega;
            }

            if (editContrato.observacao) {
                updatedData.observacao = editContrato.observacao;
            }

            if (editContrato.statusContrato) {
                updatedData.statusContrato = editContrato.statusContrato;
            }

            // Inclua o cliente se ele foi selecionado
            if (selectedCliente && selectedCliente.id) {
                updatedData.cliente = { id: selectedCliente.id };
            }

            console.log("Dados que serão enviados:", updatedData);

            const response = await fetch(`http://localhost:8080/contrato/${editContrato.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedContrato = await response.json();
                if (typeof onSave === 'function') {
                    onSave(updatedContrato);
                } else {
                    console.warn("Função onSave não foi passada para o componente ContratoEditOverlay");
                }

                setMessage('Contrato atualizado com sucesso!');
                setTimeout(() => setMessage(''), 3000);
                onClose();
            } else {
                const errorText = await response.text();
                console.error('Erro ao atualizar contrato:', errorText);
                setMessage('Erro ao atualizar contrato: ' + errorText);
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
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    outline: "none",
                    maxWidth: "800px",
                    width: "100%",
                }}
            >
                {/* Cabeçalho do modal */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="h2">
                        Editar Contrato
                    </Typography>
                    <IconButton onClick={onClose}>
                        <FaTimes style={{ color: "#666", fontSize: "20px" }} />
                    </IconButton>
                </Box>

                {/* Formulário de edição */}
                <TextField
                    label="Número do Contrato"
                    name="numeroContrato"
                    value={editContrato.numeroContrato}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Nome do Contrato"
                    name="nomeContrato"
                    value={editContrato.nomeContrato}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Data do Contrato"
                    type="date"
                    name="dataContrato"
                    value={editContrato.dataContrato}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Data de Entrega"
                    type="date"
                    name="dataEntrega"
                    value={editContrato.dataEntrega}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Observação"
                    name="observacao"
                    value={editContrato.observacao}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    fullWidth
                    margin="normal"
                />
                <Autocomplete
                    options={clientes}
                    getOptionLabel={(option) => option.nome || ''}
                    onChange={(event, value) => setSelectedCliente(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Cliente"
                            required
                            margin="normal"
                            style={{ width: '350px' }}
                        />
                    )}
                />
                {selectedCliente && (
                    <div>
                        <h4>Cliente Selecionado:</h4>
                        <p>{selectedCliente.nome}</p>
                    </div>
                )}
                <RadioGroup
                    name="statusContrato"
                    value={editContrato.statusContrato}
                    onChange={(event) => setEditContrato({ ...editContrato, statusContrato: event.target.value })}
                    row
                >
                    <FormControlLabel value="ATIVO" control={<Radio />} label="Ativo" />
                    <FormControlLabel value="PENDENTE" control={<Radio />} label="Pendente" />
                    <FormControlLabel value="CANCELADO" control={<Radio />} label="Cancelado" />
                </RadioGroup>

                {message && (
                    <Typography variant="body2" color="error" mt={2}>
                        {message}
                    </Typography>
                )}

                {/* Botões de ação */}
                <Box display="flex" justifyContent="flex-end" mt={3}>
                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
                        Salvar
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ContratoEditOverlay;