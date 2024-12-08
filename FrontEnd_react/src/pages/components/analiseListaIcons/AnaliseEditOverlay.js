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

    // Verifica se `analise` está definido e, em caso afirmativo, popula `editAnalise` com os dados
    const [editAnalise, setEditAnalise] = useState({
        nome: analise?.nome || '', // Utiliza valor de analise se existir
        prazoFinalizacao: analise?.prazoFinalizacao || '',
        status: analise?.status || 'EM_ANDAMENTO',
        id: analise?.id || null, // Certifique-se de que o ID está definido
    });

    const [message, setMessage] = useState(''); // Estado para mensagem de erro/sucesso

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

    // Atualiza o estado quando o componente recebe uma nova `analise` como prop
    useEffect(() => {
        if (analise) {
            setEditAnalise({
                nome: analise.nome || '',
                prazoFinalizacao: analise.prazoFinalizacao || '',
                status: analise.status || 'EM_ANDAMENTO',
                id: analise.id,
            });
            setSelectedMatriz(analise.matriz || null); // Adicione aqui
        }
    }, [analise]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditAnalise((prev) => ({
            ...prev,
            [name]: value || '', // Define um valor padrão para evitar undefined
        }));
    };
    const handleSave = async () => {
        try {
            if (!editAnalise || !editAnalise.id) {
                console.error('ID da análise não está definido');
                setMessage('ID da análise não está definido.');
                return;
            }
    
            // Comece a construir o objeto de dados atualizado
            const updatedData = {};
    
            // Adicione apenas os campos que foram modificados
            if (editAnalise.nome) {
                updatedData.nome = editAnalise.nome;
            }
    
            if (editAnalise.prazoFinalizacao) {
                updatedData.prazoFinalizacao = editAnalise.prazoFinalizacao;
            }
    
            // Mude 'status' para 'statusAnalise'
            if (editAnalise.status) {
                updatedData.statusAnalise = editAnalise.status; // Alterado para statusAnalise
            }
    
            // Inclua a matriz se ela foi selecionada
            if (selectedMatriz && selectedMatriz.id) {
                updatedData.matriz = { id: selectedMatriz.id };
            }
    
            // Adicione os campos do contrato e procedimento se eles já existem
            if (editAnalise.contrato && editAnalise.contrato.id) {
                updatedData.contrato = { id: editAnalise.contrato.id };
            }
    
            if (editAnalise.procedimento && editAnalise.procedimento.id) {
                updatedData.procedimento = { id: editAnalise.procedimento.id };
            }
    
            console.log("Dados que serão enviados:", updatedData);
    
            const response = await fetch(`http://localhost:8080/analise/${editAnalise.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                const updatedAnalise = await response.json();
                if (typeof onSave === 'function') {
                    onSave(updatedAnalise);
                } else {
                    console.warn("Função onSave não foi passada para o componente AnaliseEditOverlay");
                }
    
                setMessage('Análise atualizada com sucesso!');
                setTimeout(() => setMessage(''), 3000);
                onClose();
            } else {
                const errorText = await response.text();
                console.error('Erro ao atualizar análise:', errorText);
                setMessage('Erro ao atualizar análise: ' + errorText);
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