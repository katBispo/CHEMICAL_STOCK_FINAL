import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Autocomplete,
    Dialog,
    DialogTitle,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js'; 
import { useNavigate } from 'react-router-dom';

function AnaliseCadastro() {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleDrawer = () => setDrawerOpen((prev) => !prev);
    const navigate = useNavigate();

    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [selectedContracts, setSelectedContracts] = useState(null);
    const [selectedMatriz, setSelectedMatrizes] = useState(null);
    const [nome, setNome] = useState('');
    const [quantidadeAmostras, setQuantidadeAmostras] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [prazoFinalizacao, setPrazoFinalizacao] = useState('');

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            nome,
            contratos: selectedContracts,
            matriz: selectedMatriz,
            procedimento: selectedProcedure,
            quantidade: quantidadeAmostras,
            descricao,
            dataInicio,
            prazoFinalizacao,
        };

        try {
            const response = await fetch('http://localhost:8080/analise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setOpenConfirm(true); // Abre o diálogo de confirmação
            } else {
                console.error('Erro ao salvar a análise');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleConfirmYes = () => {
        setOpenConfirm(false);
        // Redireciona para a tela de cadastro de amostras passando a quantidade
        navigate('/cadastrar-amostras', { state: { quantidadeAmostras } });
    };

    const handleConfirmNo = () => {
        setOpenConfirm(false);
        setOpenAlertDialog(true);
    };

    const handleAlertOk = () => {
        setOpenAlertDialog(false);
        navigate('/home');
    };

    const procedures = [
        { label: 'Procedimento 1' },
        { label: 'Procedimento 2' },
        { label: 'Procedimento 3' },
    ];

    const contracts = [
        { label: 'contrato 1' },
        { label: 'contrato 2' },
        { label: 'contrato 3' },
    ];

    const matrizes = [
        { label: 'Água do Mar' },
        { label: 'Água do Rio' },
        { label: 'Água de Poço' },
        { label: 'Água de Lagos' },
        { label: 'Água de Reservatório' },
        { label: 'Solo' },
        { label: 'Ar' },
        { label: 'Sedimento' },
        { label: 'Alimento' },
        { label: 'Particulado' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Cadastro de Análises
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
                        Cadastrar Análise
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <TextField
                                label="Nome"
                                required
                                margin="normal"
                                style={{ width: '350px' }}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Autocomplete
                                options={contracts}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) => setSelectedContracts(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Contratos Associados"
                                        required
                                        margin="normal"
                                        style={{ width: '300px' }}
                                    />
                                )}
                            />
                        </Box>

                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <TextField
                                label="Data de Início"
                                type="date"
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                style={{ width: '350px' }}
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                            />
                            <TextField
                                label="Prazo de finalização"
                                type="date"
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                style={{ width: '300px' }}
                                value={prazoFinalizacao}
                                onChange={(e) => setPrazoFinalizacao(e.target.value)}
                            />
                        </Box>

                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <Autocomplete
                                options={procedures}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) => setSelectedProcedure(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Procedimentos Associados"
                                        required
                                        margin="normal"
                                        style={{ width: '350px' }}
                                    />
                                )}
                            />
                            <TextField
                                label="Quantidade de Amostras"
                                required
                                margin="normal"
                                style={{ width: '300px' }}
                                value={quantidadeAmostras}
                                onChange={(e) => setQuantidadeAmostras(e.target.value)}
                            />
                        </Box>

                        <Autocomplete
                            options={matrizes}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => setSelectedMatrizes(value)}
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

                        <TextField
                            label="Descrição da Análise"
                            required
                            margin="normal"
                            style={{ width: '350px' }}
                            InputProps={{ style: { height: '100px' } }}
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />

                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button variant="contained" type="submit">
                                Salvar
                            </Button>
                        </Box>

                        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                            <DialogTitle>Confirmação</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Deseja cadastrar as {quantidadeAmostras} amostras agora?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleConfirmYes}>Sim</Button>
                                <Button onClick={handleConfirmNo}>Não</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={openAlertDialog} onClose={() => setOpenAlertDialog(false)}>
                            <DialogTitle>Alerta</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Para adicionar amostras posteriormente, não esqueça de adicionar o ID dessa análise.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleAlertOk}>Ok</Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default AnaliseCadastro;
