import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    TextField,
    Autocomplete,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import FeedbackDialog from '../components/FeedbackDialog'; // Importe o novo componente
import { useNavigate } from 'react-router-dom';

function ClienteCadastro() {

    const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleDrawer = () => setDrawerOpen((prev) => !prev);
    const navigate = useNavigate();
    // Definindo os estados


    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');

    // Dialog states
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataCadastro = new Date().toISOString();

        const data = {
            nome,
            email,
            dataCadastro,
            cnpj,
            telefone,
        };

        try {
            const response = await fetch('http://localhost:8080/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setDialogMessage('Cliente cadastrado com sucesso!');
            } else {
                setDialogMessage('Erro ao cadastrar o cliente.');
            }
        } catch (error) {
            setDialogMessage('Erro ao salvar o cliente no banco de dados.');
        }

        setDialogOpen(true);
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
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Cadastro de Clientes
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
                        Cadastrar Cliente
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {/* Número e Nome do Contrato */}
                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <TextField
                                label="Nome do Cliente"
                                required
                                margin="normal"
                                style={{ width: '350px' }}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <TextField
                                label="e-mail"
                                required
                                margin="normal"
                                style={{ width: '350px' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>

                        <Box display="flex" justifyContent="flex-start" gap={2}>

                            <TextField
                                label="CPF ou CNPJ"
                                type="number"
                                required
                                margin="normal"
                                style={{ width: '350px' }}
                                value={cnpj}
                                onChange={(e) => setCnpj(e.target.value)}
                            />

                            <TextField
                                label="Telefone"
                                required
                                margin="normal"
                                style={{ width: '350px' }}
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                        </Box>



                        {/* Botão de Envio */}
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button variant="contained" type="submit">
                                Salvar Cliente
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>

            {/* Usando o novo componente FeedbackDialog */}
            <FeedbackDialog open={dialogOpen} message={dialogMessage} onClose={handleDialogClose} />
        </Box>
    );
}

export default ClienteCadastro;
