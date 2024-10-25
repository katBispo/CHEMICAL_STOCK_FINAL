import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Modal, IconButton } from '@mui/material';
import { FaPlus } from 'react-icons/fa';

const AnalitoCadastro = ({ open, handleClose }) => {
    const [classificacao, setClassificacao] = useState('');
    const [tipoAnalito, setTipoAnalito] = useState('');
    const [subtipoAnalito, setSubtipoAnalito] = useState(['']); // Inicia com um campo de subtipo
    const [messageBoxOpen, setMessageBoxOpen] = useState(false);
    const [messageBoxMessage, setMessageBoxMessage] = useState('');
    const [messageBoxSeverity, setMessageBoxSeverity] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log('Tentando enviar:', {
            nome: classificacao,  // Aqui estamos usando `classificacao` como exemplo, mas substitua pelo valor correto
            classificacao,
            tipoAnalito,
            subtipoAnalito,
        });
    
        try {
            const response = await fetch('http://localhost:8080/analito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: classificacao,  // Confirme se `classificacao` é o valor correto para `nome`
                    classificacao,
                    tipoAnalito,
                    subtipoAnalito,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao cadastrar analito');
            }
    
            const data = await response.json();
            console.log('Analito cadastrado:', data);
            setMessageBoxMessage('Analito cadastrado com sucesso!');
            setMessageBoxSeverity('success');
            setMessageBoxOpen(true);
            handleClose();
        } catch (error) {
            console.error('Erro:', error);
            setMessageBoxMessage('Erro ao salvar analito no banco de dados.');
            setMessageBoxSeverity('error');
            setMessageBoxOpen(true);
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

    const handleMessageBoxClose = () => {
        setMessageBoxOpen(false);
    };

    return (
        <>
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
                        Cadastro de Classificação de Analito
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Classificação"
                            value={classificacao}
                            onChange={(e) => setClassificacao(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Tipo de Analito"
                            value={tipoAnalito}
                            onChange={(e) => setTipoAnalito(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />

                        {subtipoAnalito.map((subtipo, index) => (
                            <Box key={index} display="flex" alignItems="center" marginBottom={1}>
                                <TextField
                                    label={`Subtipo ${index + 1}`}
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
                </Box>
            </Modal>

            {/* Mensagem de feedback */}
            <Modal open={messageBoxOpen} onClose={handleMessageBoxClose}>
                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        maxWidth: '300px',
                        margin: 'auto',
                        marginTop: '150px',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="body1" color={messageBoxSeverity === 'success' ? 'green' : 'red'}>
                        {messageBoxMessage}
                    </Typography>
                    <Button variant="contained" onClick={handleMessageBoxClose} sx={{ marginTop: 2 }}>
                        OK
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default AnalitoCadastro;
