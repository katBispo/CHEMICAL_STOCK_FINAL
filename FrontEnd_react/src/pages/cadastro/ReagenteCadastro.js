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
    LinearProgress,
    RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import FeedbackDialog from '../components/FeedbackDialog.js';
import { useNavigate, useLocation } from 'react-router-dom';

function ReagenteCadastro() {


    const [dialogOpen, setDialogOpen] = useState(false); // Estado para controle do diálogo
    const [dialogMessage, setDialogMessage] = useState(''); // Mensagem do diálogo
    const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleDrawer = () => setDrawerOpen((prev) => !prev);
    const navigate = useNavigate();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);

    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [lote, setLote] = useState('');
    const [controlado, setControlado] = useState('não'); // Valor inicial como 'não'
    const [numeroControlado, setNumeroControlado] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [dataValidade, setdataValidade] = useState('');

    const [tiposReagentes, setTiposReagentes] = useState([]);
    const [selectedTipoReagente, setSelectedTipoReagente] = useState('');



    useEffect(() => {
        const fetchTiposReagentes = async () => {
            try {
                const response = await fetch('http://localhost:8080/reagente/tipos'); // Verifique se a URL está correta
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTiposReagentes(data); // Certifique-se de que `data` é um array
            } catch (error) {
                console.error('Erro ao buscar tipos de reagentes:', error);
            }
        };

        fetchTiposReagentes();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            nome,
            marca,
            lote,
            dataCadastro,
            dataValidade,
            controlado: controlado === 'sim',
            numeroControlado: controlado === 'sim' ? numeroControlado : null,
            tipo: selectedTipoReagente, // Enviando o tipo de reagente

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
                // Tratar sucesso
            } else {
                console.error('Erro ao salvar reagente');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };


    const handleAlertOk = () => {
        setOpenAlertDialog(false);
        navigate('/home');
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

                    <form onSubmit={handleSubmit}>

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
                            <form onSubmit={handleSubmit}>
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
                                            onChange={(e) => setdataValidade(e.target.value)}
                                        />
                                    </Box>

                                    <Autocomplete
                                        options={tiposReagentes} // Certifique-se de que `tiposReagentes` é um array
                                        getOptionLabel={(option) => option.toString()} // Ajuste conforme necessário
                                        renderInput={(params) => (
                                            <TextField {...params} label="Selecione o Tipo de Reagente" variant="outlined" />
                                        )}
                                        onChange={(event, newValue) => {
                                            console.log('Tipo de reagente selecionado:', newValue);
                                        }}
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
                            <Button variant="contained" type="submit">
                                Salvar
                            </Button>
                        </Box>
                            </form>
                        </Box>






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
                {/* Usando o novo componente FeedbackDialog */}
                <FeedbackDialog open={dialogOpen} message={dialogMessage} onClose={handleDialogClose} />
            </Box>
        </Box>
    );
}

export default ReagenteCadastro;
