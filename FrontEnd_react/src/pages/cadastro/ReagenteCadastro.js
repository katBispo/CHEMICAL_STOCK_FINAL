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
    DialogActions
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import { useNavigate } from 'react-router-dom';

function ReagenteCadastro() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleDrawer = () => setDrawerOpen((prev) => !prev);
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [lote, setLote] = useState('');
    const [controlado, setControlado] = useState('não');
    const [numeroControlado, setNumeroControlado] = useState('');
    const [dataValidade, setDataValidade] = useState('');
    const [tiposReagentes, setTiposReagentes] = useState([]);
    const [selectedTipoReagente, setSelectedTipoReagente] = useState('');

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
    }, []);

    const handleSubmit = async () => {
        const data = {
            nome,
            marca,
            lote,
            dataValidade,
            controlado: controlado === 'sim',
            numeroControlado: controlado === 'sim' ? numeroControlado : null,
            tipo: selectedTipoReagente
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
                setDialogOpen(true); // Abre o diálogo de sucesso
            } else {
                console.error('Erro ao salvar reagente');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        navigate('/'); // Redireciona para a rota '/'
    };

    return (
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
                        marginLeft: '200px',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Cadastrar Reagente
                    </Typography>

                    <Box
                        sx={{
                            backgroundColor: 'white',
                            padding: '30px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            maxWidth: '800px',
                            width: '100%',
                        }}
                    >
                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <TextField
                                label="Nome do Reagente"
                                required
                                margin="normal"
                                style={{ width: '350px' }}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <TextField
                                label="Marca do Reagente"
                                required
                                margin="normal"
                                style={{ width: '350px' }}
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                            />
                        </Box>

                        <Box display="flex" flexDirection="column" gap={2} mt={2}>
                            <Box display="flex" justifyContent="flex-start" gap={2}>
                                <TextField
                                    label="Lote"
                                    required
                                    margin="normal"
                                    style={{ width: '350px' }}
                                    value={lote}
                                    onChange={(e) => setLote(e.target.value)}
                                />

                                <TextField
                                    label="Data de Validade"
                                    type="date"
                                    required
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    style={{ width: '350px' }}
                                    value={dataValidade}
                                    onChange={(e) => setDataValidade(e.target.value)}
                                />
                            </Box>

                            <Autocomplete
                                options={tiposReagentes}
                                getOptionLabel={(option) => option.toString()}
                                renderInput={(params) => (
                                    <TextField {...params} label="Selecione o Tipo de Reagente" variant="outlined" />
                                )}
                                onChange={(event, newValue) => setSelectedTipoReagente(newValue)}
                            />

                            <Typography variant="h6">Reagente Controlado</Typography>
                            <RadioGroup
                                row
                                value={controlado}
                                onChange={(e) => setControlado(e.target.value)}
                            >
                                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                                <FormControlLabel value="não" control={<Radio />} label="Não" />
                            </RadioGroup>

                            {controlado === 'sim' && (
                                <TextField
                                    label="Número do Reagente Controlado"
                                    required
                                    margin="normal"
                                    style={{ width: '350px' }}
                                    value={numeroControlado}
                                    onChange={(e) => setNumeroControlado(e.target.value)}
                                />
                            )}
                        </Box>

                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button variant="contained" onClick={handleSubmit}>
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Diálogo de sucesso */}
                <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>Sucesso</DialogTitle>
                    <DialogContent>Dados salvos com sucesso!</DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}

export default ReagenteCadastro;
