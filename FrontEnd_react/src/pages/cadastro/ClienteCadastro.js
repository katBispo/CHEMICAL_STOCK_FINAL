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
      const [numeroContrato, setNumeroContrato] = useState('');
      const [nomeContrato, setNomeContrato] = useState('');
      const [clientes, setClientes] = useState([]); // Atualize com os dados reais
      const [selectedCliente, setSelectedCliente] = useState(null);
      const [quantidadeAnalises, setQuantidadeAnalises] = useState('');
      const [dataContrato, setDataContrato] = useState('');
      const [dataEntrega, setDataEntrega] = useState('');
      const [observacao, setObservacao] = useState('');

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

        // Abre o diálogo com a mensagem apropriada
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
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
            Cadastrar Contrato
        </Typography>
        <form onSubmit={handleSubmit}>
            {/* Número e Nome do Contrato */}
            <Box display="flex" justifyContent="flex-start" gap={2}>
                <TextField
                    label="Número do Contrato"
                    required
                    margin="normal"
                    style={{ width: '350px' }}
                    value={numeroContrato}
                    onChange={(e) => setNumeroContrato(e.target.value)}
                />
                <TextField
                    label="Nome do Contrato"
                    required
                    margin="normal"
                    style={{ width: '350px' }}
                    value={nomeContrato}
                    onChange={(e) => setNomeContrato(e.target.value)}
                />
            </Box>

            {/* Cliente e Quantidade de Análises */}
            <Box display="flex" justifyContent="flex-start" gap={2}>
                <Autocomplete
                    options={clientes}
                    getOptionLabel={(option) => option.nome}
                    onChange={(event, value) => setSelectedCliente(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Cliente Associado"
                            required
                            margin="normal"
                            style={{ width: '350px' }}
                        />
                    )}
                />
                <TextField
                    label="Quantidade de Análises"
                    type="number"
                    required
                    margin="normal"
                    style={{ width: '350px' }}
                    value={quantidadeAnalises}
                    onChange={(e) => setQuantidadeAnalises(e.target.value)}
                />
            </Box>

            {/* Datas */}
            <Box display="flex" justifyContent="flex-start" gap={2}>
                <TextField
                    label="Data do Contrato"
                    type="date"
                    required
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: '350px' }}
                    value={dataContrato}
                    onChange={(e) => setDataContrato(e.target.value)}
                />
                <TextField
                    label="Data de Entrega"
                    type="date"
                    required
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: '350px' }}
                    value={dataEntrega}
                    onChange={(e) => setDataEntrega(e.target.value)}
                />
            </Box>

            {/* Observação */}
            <Box display="flex" justifyContent="flex-start" gap={2}>
                <TextField
                    label="Observação"
                    multiline
                    rows={4}
                    margin="normal"
                    style={{ width: '700px' }}
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                />
            </Box>

            {/* Botão de Envio */}
            <Box display="flex" justifyContent="center" marginTop={2}>
                <Button variant="contained" type="submit">
                    Salvar Contrato
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
