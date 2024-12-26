import React, { useState, useEffect } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Autocomplete,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import FeedbackDialog from '../components/FeedbackDialog'; // Importe o novo componente

import { useNavigate } from 'react-router-dom';

function ContratoCadastro() {
    const [dialogMessage, setDialogMessage] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleDrawer = () => setDrawerOpen((prev) => !prev);
    const navigate = useNavigate();

    // Estados do formulário
    const [numeroContrato, setNumeroContrato] = useState('');
    const [nomeContrato, setNomeContrato] = useState('');
    const [dataContrato, setDataContrato] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [quantidadeAnalises, setQuantidadeAnalises] = useState('');
    const [observacao, setObservacao] = useState('');
    const [clientes, setClientes] = useState([]); // Para armazenar os clientes
    const [selectedCliente, setSelectedCliente] = useState(null); // Para armazenar o cliente selecionado
    const [dialogOpen, setDialogOpen] = useState(false);

    const fetchClientes = async () => {
        try {
            const response = await fetch('http://localhost:8080/cliente');
            if (response.ok) {
                const data = await response.json();
                setClientes(data.clientes || data); // Acessa a lista de clientes dentro de "clientes", se necessário
            } else {
                console.error('Erro ao buscar clientes');
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleSubmit = async (event) => {
        // Previne o comportamento padrão do formulário
        event.preventDefault();

        const data = {
            numeroContrato,
            nomeContrato,
            dataContrato,
            dataEntrega,
            quantidadeAnalises: parseInt(quantidadeAnalises, 10),
            observacao,
            statusContrato: "ATIVO", // Setando o status padrão
            cliente: selectedCliente ? { id: selectedCliente.id } : null, // Inclui o cliente selecionado
        };

        console.log("Dados enviados:", data); // Log para verificar os dados antes do envio

        try {
            const response = await fetch('http://localhost:8080/contrato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setDialogMessage('Contrato cadastrado com sucesso!');
            } else {
                setDialogMessage('Erro ao cadastrar o contrato.');
            }
        } catch (error) {
            setDialogMessage('Erro ao salvar o Contrato no banco de dados.');
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        navigate('/'); 

    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cadastro de Contratos
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4, ml:-15}}>
                <Toolbar />
                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        maxWidth: '800px',
                        marginLeft: '200px',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Cadastrar Contrato
                    </Typography>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            {/* Número e Nome do Contrato */}
                            <Box display="flex" gap={2}>
                                <TextField
                                    label="Número do Contrato"
                                    required
                                    margin="normal"
                                    value={numeroContrato}
                                    onChange={(e) => setNumeroContrato(e.target.value)}
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    label="Nome do Contrato"
                                    required
                                    margin="normal"
                                    value={nomeContrato}
                                    onChange={(e) => setNomeContrato(e.target.value)}
                                    sx={{ flex: 2 }}
                                />
                            </Box>

                            {/* Cliente e Quantidade de Análises */}
                            <Box display="flex" gap={2}>
                                <Autocomplete
                                    options={clientes} // Passa a lista de clientes para o componente
                                    getOptionLabel={(option) => option.nome} // Define o nome a ser exibido na lista de opções
                                    onChange={(event, value) => setSelectedCliente(value)} // Atualiza o cliente selecionado
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Cliente Associado"
                                            required
                                            margin="normal"
                                            style={{ width: '300px' }}
                                        />
                                    )}
                                />
                                <TextField
                                    label="Quantidade de Análises"
                                    required
                                    margin="normal"
                                    type="number"
                                    value={quantidadeAnalises}
                                    onChange={(e) => setQuantidadeAnalises(e.target.value)}
                                    sx={{ flex: 1 }}
                                />
                            </Box>

                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <TextField
                                label="Data de Contratação"
                                type="date"
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                style={{ width: '350px' }}
                                value={dataContrato}
                                onChange={(e) => setDataContrato(e.target.value)}
                            />
                            <TextField
                                label="Prazo de finalização"
                                type="date"
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                style={{ width: '300px' }}
                                value={dataEntrega}
                                onChange={(e) => setDataEntrega(e.target.value)}
                            />
                        </Box>

                            {/* Observação */}
                            <TextField
                                label="Observação"
                                margin="normal"
                                value={observacao}
                                onChange={(e) => setObservacao(e.target.value)}
                                multiline
                                rows={4}
                            />

                            {/* Botão de Enviar */}
                            <Button variant="contained" color="primary" type="submit">
                                Cadastrar Contrato
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>

            <FeedbackDialog open={dialogOpen} message={dialogMessage} onClose={handleDialogClose} />

        </Box>
    );
}

export default ContratoCadastro;
