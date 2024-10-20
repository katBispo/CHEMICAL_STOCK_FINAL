import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Alert } from '@mui/material';

const AnalitoCadastro = ({ open, handleClose }) => {
    const [nomeAnalito, setNomeAnalito] = useState('');
    const [messageBoxOpen, setMessageBoxOpen] = useState(false);
    const [messageBoxMessage, setMessageBoxMessage] = useState('');
    const [messageBoxSeverity, setMessageBoxSeverity] = useState('success');
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Tentando enviar:', nomeAnalito);
    
        try {
            const response = await fetch('http://localhost:8080/cadastroAnalitos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: nomeAnalito }), // Ajuste aqui para enviar "nome"
            });
    
            if (!response.ok) {
                throw new Error('Erro ao cadastrar analito');
            }
    
            const data = await response.json();
            console.log('Analito cadastrado:', data);
            setNomeAnalito('');
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
                        maxWidth: '400px',
                        margin: 'auto',
                        marginTop: '100px',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Cadastro de Analito
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nome do Analito"
                            value={nomeAnalito}
                            onChange={(e) => setNomeAnalito(e.target.value)}
                            required
                            margin="normal"
                            style={{ width: '100%' }}
                        />
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button variant="contained" type="submit">
                                Salvar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>

            {/* Message Box para feedback de sucesso ou erro */}
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
                    <Alert severity={messageBoxSeverity} sx={{ marginBottom: 2 }}>
                        {messageBoxMessage}
                    </Alert>
                    <Button variant="contained" onClick={handleMessageBoxClose}>
                        OK
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default AnalitoCadastro;
