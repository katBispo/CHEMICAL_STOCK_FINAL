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
    RadioGroup,
    FormControlLabel,
    Radio,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Modal,
    Grid
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import { useNavigate } from 'react-router-dom';
import FeedbackDialog from '../components/FeedbackDialog'; 
import ReporEstoqueModal from '../components/ReposicaoReagentOverlay.js'

function ReagenteCadastro({ open, handleClose }) {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleDrawer = () => setDrawerOpen((prev) => !prev);
    const navigate = useNavigate();
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showInitialScreen, setShowInitialScreen] = useState(true);


    const [isEscolhaAcaoOpen, setIsEscolhaAcaoOpen] = useState(true); 
    const [isReporEstoqueOpen, setIsReporEstoqueOpen] = useState(false);

    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [lote, setLote] = useState('');
    const [controlado, setControlado] = useState('não');
    const [numeroControlado, setNumeroControlado] = useState('');
    const [dataValidade, setDataValidade] = useState('');
    const [tiposReagentes, setTiposReagentes] = useState([]);
    const [selectedTipoReagente, setSelectedTipoReagente] = useState('');

    const [selectedUnidade, setSelectedUnidade] = useState(null);
    const [unidadesReagentes, setUnidadesReagentes] = useState([]);


    const [quantidadeDeFrascos, setQuantidadeDeFrascos] = useState('');
    const [quantidadePorFrasco, setQuantidadePorFrasco] = useState('');


    useEffect(() => {
        const fetchTiposReagentes = async () => {
            try {
                const response = await fetch('http://localhost:8080/reagente/tipos');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setTiposReagentes(data);
            } catch (error) {
                console.error('Erro ao buscar tipos de reagentes:', error);
            }
        };

        fetchTiposReagentes();
        const fetchUnidadesReagentes = async () => {
            try {
                const response = await fetch('http://localhost:8080/reagente/unidades');
                if (!response.ok) throw new Error('Erro ao buscar unidades de reagentes');
                const data = await response.json();
                setUnidadesReagentes(data);
            } catch (error) {
                console.error('Erro ao buscar unidades de reagentes:', error);
            }
        };

        fetchUnidadesReagentes();

    }, []);

    const handleSubmit = async () => {
        const data = {
            nome,
            marca,
            lote,
            dataValidade,
            controlado: controlado === 'sim',
            numeroControlado: controlado === 'sim' ? numeroControlado : null,
            tipo: selectedTipoReagente,

            unidadeReagente: selectedUnidade, // Unidade do reagente (g, mL, etc.)
            quantidadeDeFrascos: Number(quantidadeDeFrascos),  // Converte para número
            quantidadePorFrasco: Number(quantidadePorFrasco) // Converte para número
        };

        try {
            const response = await fetch('http://localhost:8080/reagente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setDialogMessage(true); // Abre o diálogo de sucesso
            } else {
                setDialogMessage('Erro ao salvar reagente');
                console.error('Erro ao salvar reagente');
            }
        } catch (error) {
            console.error('Erro:', error);
            setDialogMessage('Erro:', error);
        }
        setDialogOpen(true);

    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        navigate('/'); 

    };
    return (
        <>
        {/* Modal de Escolha de Ação */}
        {/* Modal de Escolha de Ação */}
        <Modal open={isEscolhaAcaoOpen} onClose={() => setIsEscolhaAcaoOpen(false)}>
                <Box
                    sx={{
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        maxWidth: "400px",
                        margin: "auto",
                        marginTop: "100px",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Escolha uma ação
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsEscolhaAcaoOpen(false)} // Apenas fecha o modal
                        sx={{ m: 1, width: "80%" }}
                    >
                        Cadastrar Novo Reagente
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setIsEscolhaAcaoOpen(false); // Fecha o modal
                            navigate("/reposicaoReagente"); // Redireciona para a rota desejada
                        }}
                        sx={{ m: 1, width: "80%" }}
                    >
                        Repor Estoque
                    </Button>
                </Box>
            </Modal>
        
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cadastro de Reagentes
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
                        margin: '0 auto',
                    }}
                >
                    <Typography variant="h4" gutterBottom align="center">
                        Cadastrar Reagente
                    </Typography>

                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Grid container spacing={2}>
                            {/* Nome e Marca */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nome do Reagente"
                                    required
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Marca do Reagente"
                                    required
                                    value={marca}
                                    onChange={(e) => setMarca(e.target.value)}
                                />
                            </Grid>

                            {/* Lote e Data de Validade */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Lote"
                                    required
                                    value={lote}
                                    onChange={(e) => setLote(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Data de Validade"
                                    type="date"
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    value={dataValidade}
                                    onChange={(e) => setDataValidade(e.target.value)}
                                />
                            </Grid>

                            {/* Tipo e Unidade do Reagente */}
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    options={tiposReagentes}
                                    getOptionLabel={(option) => option.toString()}
                                    value={selectedTipoReagente}
                                    onChange={(event, newValue) => setSelectedTipoReagente(newValue)}
                                    renderInput={(params) => <TextField {...params} label="Tipo de Reagente" fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    options={unidadesReagentes}
                                    getOptionLabel={(option) => option}
                                    value={selectedUnidade}
                                    onChange={(event, newValue) => setSelectedUnidade(newValue)}
                                    renderInput={(params) => <TextField {...params} label="Unidade do Reagente" fullWidth />}
                                />
                            </Grid>

                            {/* Quantidade de Frascos e Volume por Frasco */}
                            <Grid item xs={6}>
                                <TextField
                                    label="Quantidade de Frascos"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={quantidadeDeFrascos}
                                    onChange={(e) => setQuantidadeDeFrascos(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Volume por Frasco"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={quantidadePorFrasco}
                                    onChange={(e) => setQuantidadePorFrasco(e.target.value)}
                                />
                            </Grid>
                            {/* Reagente Controlado */}
                            <Grid item xs={12}>
                                <Typography variant="h6">Reagente Controlado</Typography>
                                <RadioGroup row value={controlado} onChange={(e) => setControlado(e.target.value)}>
                                    <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                                    <FormControlLabel value="não" control={<Radio />} label="Não" />
                                </RadioGroup>
                            </Grid>

                            {controlado === 'sim' && (
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Número do Reagente Controlado"
                                        required
                                        value={numeroControlado}
                                        onChange={(e) => setNumeroControlado(e.target.value)}
                                    />
                                </Grid>
                            )}
                        </Grid>

                        {/* Botão de salvar */}
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button variant="contained" onClick={handleSubmit}>
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <FeedbackDialog open={dialogOpen} message={dialogMessage} onClose={handleDialogClose} />

                {/* Diálogo de sucesso */}
                <Dialog open={dialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>Sucesso</DialogTitle>
                    <DialogContent>Dados salvos com sucesso!</DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box >
        </>

    );
}

export default ReagenteCadastro;
