import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Modal, IconButton } from '@mui/material';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AnalitoExistenteCadastro from './AnalitoExistenteCadastro';
import { salvarAnalito } from "../../services/AnalitoService.js";
import Analito from "../../models/AnalitoModel.js";



const AnalitoCadastro = ({ open, handleClose }) => {
    const navigate = useNavigate();
    const [showInitialScreen, setShowInitialScreen] = useState(true);
    const [classificacao, setClassificacao] = useState('');
    const [tipoAnalito, setTipoAnalito] = useState('');
    const [subtipoAnalito, setSubtipoAnalito] = useState(['']);
    const [messageBoxOpen, setMessageBoxOpen] = useState(false);
    const [messageBoxMessage, setMessageBoxMessage] = useState('');
    const [messageBoxSeverity, setMessageBoxSeverity] = useState('success');
    const [isAnalitoExistenteOpen, setIsAnalitoExistenteOpen] = useState(false);




    const openAnalitoExistente = () => {
        setIsAnalitoExistenteOpen(true);
    };

    const closeAnalitoExistente = () => {
        setIsAnalitoExistenteOpen(false);
    };

    const handleOptionSelect = (option) => {
        if (option === 'classificacaoAnalito') {
            openAnalitoExistente();
        } else if (option === 'novoAnalito') {
            setShowInitialScreen(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const analito = new Analito(classificacao, tipoAnalito, subtipoAnalito);

        try {
            await salvarAnalito(analito);

            setClassificacao('');
            setTipoAnalito('');
            setSubtipoAnalito(['']); 

            setMessageBoxMessage('✅ Analito cadastrado com sucesso!');
            setMessageBoxSeverity('success');
            setMessageBoxOpen(true);

            handleClose();
        } catch (error) {
            console.error('Erro ao salvar analito:', error);

            setMessageBoxMessage('❌ Erro ao salvar analito no banco de dados.');
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
                    {showInitialScreen ? (
                        <Box sx={{ padding: '20px', textAlign: 'center' }}>
                            <Typography variant="h5" gutterBottom>
                                Escolha uma ação
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleOptionSelect('novoAnalito')}
                                sx={{ m: 1, width: '80%' }} // Ajuste a largura conforme necessário
                            >
                                Cadastrar Novo Analito
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleOptionSelect('classificacaoAnalito')}
                                sx={{ m: 1, width: '80%' }} // Ajuste a largura conforme necessário
                            >
                                Adicionar Classificação em um Analito
                            </Button>
                            <AnalitoExistenteCadastro open={isAnalitoExistenteOpen} handleClose={closeAnalitoExistente} />
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h4" gutterBottom>
                                Cadastro de Analito
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
                        </>
                    )}
                </Box>
            </Modal>

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
