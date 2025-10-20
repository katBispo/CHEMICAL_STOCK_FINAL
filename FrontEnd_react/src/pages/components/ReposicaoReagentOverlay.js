import React, { useState, useEffect } from "react";
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
    drawerOpen,
    Grid

} from '@mui/material'; import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import {
    getReagentes,
    salvarReagente,
    getTiposReagentes,
    getUnidadesReagentes
} from '../../services/reagenteService.js';
import Reagente from "../../models/ReagenteModel.js";


const ReposicaoReagentOverlay = ({ onClose }) => {
    const [reagentes, setReagentes] = useState([]);
    const [selectedReagente, setSelectedReagente] = useState(null);
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [lote, setLote] = useState('');
    const [dataValidade, setDataValidade] = useState('');
    const [controlado, setControlado] = useState('não');
    const [numeroControlado, setNumeroControlado] = useState('');
    const [quantidadeDeFrascos, setquantidadeDeFrascos] = useState('');
    const [quantidadePorFrasco, setquantidadePorFrasco] = useState('');
    const [selectedTipoReagente, setSelectedTipoReagente] = useState('');
    const [selectedUnidade, setSelectedUnidade] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(true);
    // Inicializando as variáveis que estavam gerando erro
    const [tiposReagentes, setTiposReagentes] = useState([]);  // Exemplo de inicialização
    const [unidadesReagentes, setUnidadesReagentes] = useState([]);  // Exemplo de inicialização

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reagentesData = await getReagentes();
                const tiposData = await getTiposReagentes();
                const unidadesData = await getUnidadesReagentes();

                setReagentes(reagentesData);
                setTiposReagentes(tiposData);
                setUnidadesReagentes(unidadesData);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        const reagente = {
            nome,
            marca,
            lote,
            dataValidade,
            controlado: controlado === 'sim',
            numeroControlado: controlado === 'sim' ? numeroControlado : null,
            tipo: selectedTipoReagente,
            unidadeReagente: selectedUnidade,
            quantidadeDeFrascos: Number(quantidadeDeFrascos),
            quantidadePorFrasco: Number(quantidadePorFrasco),
        };

        try {
            await salvarReagente(reagente);
            alert('Reagente cadastrado com sucesso!');

            // Limpar campos após salvar
            setNome('');
            setMarca('');
            setLote('');
            setDataValidade('');
            setControlado('não');
            setNumeroControlado('');
            setSelectedTipoReagente(null);
            setSelectedUnidade(null);
            setquantidadeDeFrascos('');
            setquantidadePorFrasco('');
        } catch (error) {
            console.error('Erro ao cadastrar reagente:', error);
            alert('Erro ao cadastrar reagente. Tente novamente.');
        }
    };




    const toggleDrawer = () => setDrawerOpen(!drawerOpen);


    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Reposição de Reagentes
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
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
                        Reposição de Reagentes
                    </Typography>
                    <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Grid container spacing={2}>
                            {/* Autocomplete para reagentes cadastrados */}
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={reagentes}
                                    getOptionLabel={(option) => option.nome}
                                    onChange={(event, value) => {
                                        setSelectedReagente(value);

                                        if (value) {
                                            setNome(value.nome);
                                            setMarca(value.marca);
                                            setLote(value.lote);

                                            // Apenas armazena a string diretamente, pois os dados recebidos já são strings
                                            setSelectedTipoReagente(value.tipo);
                                            setSelectedUnidade(value.unidade);
                                        } else {
                                            setNome('');
                                            setMarca('');
                                            setLote('');
                                            setSelectedTipoReagente(null);
                                            setSelectedUnidade(null);
                                        }
                                    }}

                                    renderInput={(params) => (
                                        <TextField {...params} label="Reagentes Cadastrados" required margin="normal" />
                                    )}
                                />
                            </Grid>

                            {/* Nome e Marca */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nome do Reagente"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Marca do Reagente"
                                    value={marca}
                                    onChange={(e) => setMarca(e.target.value)}
                                />
                            </Grid>

                            {/* Lote */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Lote"
                                    value={lote}
                                    onChange={(e) => setLote(e.target.value)}
                                />
                            </Grid>

                            {/* Tipo e Unidade do Reagente */}
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    options={tiposReagentes}
                                    value={selectedTipoReagente}
                                    onChange={(event, newValue) => setSelectedTipoReagente(newValue)}
                                    renderInput={(params) => <TextField {...params} label="Tipo de Reagente" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    options={unidadesReagentes}
                                    value={selectedUnidade}
                                    onChange={(event, newValue) => setSelectedUnidade(newValue)}
                                    renderInput={(params) => <TextField {...params} label="Unidade" />}
                                />
                            </Grid>

                            {/* Campos Editáveis */}
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


                            <Grid item xs={6}>
                                <TextField
                                    label="Quantidade de Frascos"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={quantidadeDeFrascos}
                                    onChange={(e) => setquantidadeDeFrascos(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Volume por Frasco"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={quantidadePorFrasco}
                                    onChange={(e) => setquantidadePorFrasco(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        {/* Botão de salvar */}
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button variant="contained" onClick={handleSubmit}>
                                Salvar
                            </Button>

                        </Box>
                    </Box>

                </Box>
            </Box>
        </Box>

    );

};

export default ReposicaoReagentOverlay;
