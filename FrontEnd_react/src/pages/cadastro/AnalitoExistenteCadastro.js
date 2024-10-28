import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Autocomplete, IconButton } from '@mui/material';
import { FaPlus } from 'react-icons/fa';

const AnalitoExistenteCadastro = ({ open, handleClose }) => {
    const [classificacoes, setClassificacoes] = useState([]);
    const [selectedClassificacao, setSelectedClassificacao] = useState(null);
    const [tipoAnalito, setTipoAnalito] = useState('');
    const [subtipoAnalito, setSubtipoAnalito] = useState(['']);

    // Carregar classificações existentes ao abrir o modal
    useEffect(() => {
        if (open) {
            fetchClassificacoes();
        }
    }, [open]);

    const fetchClassificacoes = async () => {
        try {
            const response = await fetch('http://localhost:8080/analito/classificacoes');
            if (!response.ok) {
                throw new Error('Erro ao buscar classificações');
            }
            const data = await response.json();
            setClassificacoes(data); // Certifique-se de que data é uma lista de strings
        } catch (error) {
            console.error('Erro ao buscar classificações:', error);
        }
    };

  
    // Quando o usuário seleciona a classificação pelo nome
const handleClassificacaoSelect = async (event, value) => {
    try {
        const response = await fetch(`http://localhost:8080/analito/buscar-id?classificacao=${encodeURIComponent(value)}`);
        if (!response.ok) throw new Error('Erro ao buscar ID da classificação');

        const id = await response.json();
        setSelectedClassificacao(id); // Armazene o ID da classificação
    } catch (error) {
        console.error('Erro ao buscar ID da classificação:', error);
    }
};

    // Ao enviar a requisição, use o ID armazenado
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:8080/analito/${selectedClassificacao}/adicionar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipoAnalito,
                subtipoAnalito,
            }),
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar tipoAnalito');
        }

        alert('Tipo e subtipo de analito adicionados com sucesso!');
        handleClose();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao salvar tipoAnalito no banco de dados.');
    }
};
    
    

    const handleAddSubtipo = () => {
        setSubtipoAnalito([...subtipoAnalito, '']);
    };

    const handleSubtipoChange = (index, value) => {
        const updatedSubtipoAnalito = [...subtipoAnalito];
        updatedSubtipoAnalito[index] = value;
        setSubtipoAnalito(updatedSubtipoAnalito);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    maxWidth: '500px',
                    margin: 'auto',
                    marginTop: '100px',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Adicionar Classificação em um Analito
                </Typography>

                <Autocomplete
                    options={classificacoes} // Esta deve ser uma lista de strings
                    getOptionLabel={(option) => option || ''} // A opção é uma string
                    onChange={handleClassificacaoSelect}
                    renderInput={(params) => <TextField {...params} label="Classificação Existente" fullWidth />}
                />

                {selectedClassificacao && (
                    <>
                        <Typography variant="h6" gutterBottom marginTop={3}>
                            Adicionar Novo Tipo e Subtipo
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Novo Tipo de Analito"
                                value={tipoAnalito}
                                onChange={(e) => setTipoAnalito(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                            />

                            {subtipoAnalito.map((subtipo, index) => (
                                <Box key={index} display="flex" alignItems="center" marginBottom={1}>
                                    <TextField
                                        label={`Novo Subtipo ${index + 1}`}
                                        value={subtipo}
                                        onChange={(e) => handleSubtipoChange(index, e.target.value)}
                                        required
                                        fullWidth
                                    />
                                    <IconButton onClick={handleAddSubtipo} color="primary" sx={{ ml: 1 }}>
                                        <FaPlus />
                                    </IconButton>
                                </Box>
                            ))}

                            <Box display="flex" justifyContent="center" marginTop={2}>
                                <Button variant="contained" type="submit">
                                    Salvar
                                </Button>
                            </Box>
                        </form>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default AnalitoExistenteCadastro;
