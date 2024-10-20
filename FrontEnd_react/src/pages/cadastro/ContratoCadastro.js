import React, { useState, useEffect } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    TextField,
    Autocomplete,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import FeedbackDialog from '../components/FeedbackDialog'; // Importe o novo componente

import { useNavigate } from 'react-router-dom';

function ContratoCadastro() {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [clientes, setClientes] = useState([]); // Para armazenar os clientes
    const navigate = useNavigate();


    const [selectedContracts, setSelectedContracts] = useState(null);
    const [nomeContrato, setNomeContrato] = useState(''); // Alterado
    const [quantidadeAnalises, setQuantidadeAnalises] = useState(''); // Alterado
    const [numeroContrato, setNumeroContrato] = useState('');
    const [observacao, setObservacao] = useState('');
    const [dataContrato, setDataContrato] = useState(''); // Alterado
    const [dataEntrega, setDataEntrega] = useState(''); // Alterado

    // Dialog states
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');


    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    // Função para buscar clientes
    const fetchClientes = async () => {
        try {
            const response = await fetch('http://localhost:8080/cliente'); // Endpoint que retorna todos os clientes
            if (response.ok) {
                const data = await response.json();
                setClientes(data); // Armazena a lista de clientes no estado

            } else {
                console.error('Erro ao buscar clientes');
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
    };

    useEffect(() => {
        fetchClientes(); // Chama a função ao montar o componente
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            nomeContrato, // Alterado para corresponder ao modelo
            contratos: selectedContracts ? selectedContracts.label : null, // Se houver seleção, pega o label do contrato
            quantidadeAnalises, // Alterado para corresponder ao modelo
            descricao: observacao,
            dataContrato, // Alterado para corresponder ao modelo
            dataEntrega, // Alterado para corresponder ao modelo
            numeroContrato, // Mantido
        };

        try {
            const response = await fetch('http://localhost:8080/contrato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setDialogMessage('Cliente cadastrado com sucesso!');

                console.log('Contrato salvo com sucesso');
                setOpenConfirm(true);
            } else {
                const errorData = await response.json();
                console.error('Erro ao salvar o contrato:', errorData);
                setDialogMessage('Erro ao cadastrar o cliente.');

            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            setDialogMessage('Erro ao salvar o cliente no banco de dados.');

        }
        setDialogOpen(true);

    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };


    const handleConfirmYes = () => {
        setOpenConfirm(false);
        navigate('/contrato-cadastrar-analises', { state: { quantidadeAnalises, contratoNome: nomeContrato } });
    };
    
    
    const handleConfirmNo = () => {
        setOpenConfirm(false);
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

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
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
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <TextField
                                label="Nome"
                                required
                                margin="normal"
                                style={{ width: '350px' }}
                                value={nomeContrato}
                                onChange={(e) => setNomeContrato(e.target.value)}
                            />
                            <Autocomplete
                                options={clientes} // Usando a lista de clientes
                                getOptionLabel={(option) => option.nome} // Ajuste conforme a estrutura do seu cliente
                                onChange={(event, value) => setSelectedContracts(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Clientes Associados"
                                        required
                                        margin="normal"
                                        style={{ width: '300px' }}
                                    />
                                )}
                            />
                        </Box>

                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <TextField
                                label="Data de Assinatura"
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

                        <Box display="flex" gap={2}>
                            <TextField
                                label="Quantidade de Análises"
                                required
                                margin="normal"
                                style={{ width: '350px' }}
                                value={quantidadeAnalises}
                                onChange={(e) => setQuantidadeAnalises(e.target.value)}
                            />

                            <TextField
                                label="Número do Contrato"
                                required
                                margin="normal"
                                style={{ width: '350px' }}
                                value={numeroContrato}
                                onChange={(e) => setNumeroContrato(e.target.value)}
                            />
                        </Box>

                        <TextField
                            label="Observação"
                            required
                            margin="normal"
                            style={{ width: '350px' }}
                            multiline
                            rows={4}
                            value={observacao}
                            onChange={(e) => setObservacao(e.target.value)}
                        />

                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button variant="contained" type="submit">
                                Salvar
                            </Button>
                        </Box>

                        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                            <DialogTitle>Contrato cadastrado com sucesso!</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Deseja cadastrar as {quantidadeAnalises} análises agora?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleConfirmYes}>Sim</Button>
                                <Button onClick={handleConfirmNo}>Não</Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                </Box>
                {/* Usando o novo componente FeedbackDialog */}
                <FeedbackDialog open={dialogOpen} message={dialogMessage} onClose={handleDialogClose} />
            </Box>
        </Box>
    );
}

export default ContratoCadastro;
