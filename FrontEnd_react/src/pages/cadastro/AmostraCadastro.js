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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import AnalitoSelector from '../components/AnalitoSelector.js';
import FeedbackDialog from '../components/FeedbackDialog.js';
import { useNavigate, useLocation } from 'react-router-dom';

function AmostraCadastro() {

    const [coordenadaColeta, setCoordenadaColeta] = useState('');

    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [SelectedClientes, setSelectedClientes] = useState(null);
    const [showAnalitoSelector, setShowAnalitoSelector] = useState(false);
    const [nome, setNome] = useState('');
    const [quantidadeAmostras, setQuantidadeAmostras] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [prazoFinalizacao, setPrazoFinalizacao] = useState('');
    const [descricaoAnalise, setDescricaoAnalise] = useState('');

    // Função para abrir o AnalitoSelector
    const handleOpenAnalitoSelector = () => {
        setShowAnalitoSelector(true);
    };

    // Função para fechar o AnalitoSelector
    const handleCloseAnalitoSelector = () => {
        setShowAnalitoSelector(false);
    };

    const [openConfirm, setOpenConfirm] = useState(false); // Estado para abrir/fechar o diálogo de confirmação
    const [openAlertDialog, setOpenAlertDialog] = useState(false); // Novo estado para a caixa de alerta
    const [sampleId] = useState("xxxx"); // Exemplo de ID que pode ser exibido na mensagem
    const navigate = useNavigate(); // Para navegação entre telas
    const [analitos, setAnalitos] = useState([]); // Para armazenar as matrizes
    const [dialogOpen, setDialogOpen] = useState(false); // Estado para controle do diálogo
    const [procedures, setProcedures] = useState([]);
    const [analyses, setAnalyses] = useState([]); // Adicionei isso
    const [selectedAnalysis, setSelectedAnalysis] = useState(null); // Adicion
    const [dialogMessage, setDialogMessage] = useState(''); // Mensagem do diálogo

    const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleDrawer = () => setDrawerOpen((prev) => !prev);
    const handleConfirmYes = () => {
        setOpenConfirm(false); // Fecha o diálogo de confirmação
        navigate('/cadastrar-amostras'); // Redireciona para a tela de cadastro de amostras
    };

    const handleConfirmNo = () => {
        setOpenConfirm(false); // Fecha o diálogo de confirmação
        setOpenAlertDialog(true); // Abre a nova caixa de diálogo de alerta
    };


    // Função para buscar analitos
    const fetchAnalitos = async () => {
        try {
            const response = await fetch('http://localhost:8080/analitos'); // Endpoint que retorna todas as matrizes
            if (response.ok) {
                const data = await response.json();
                setAnalitos(data); // Armazena a lista de analitos no estado
            } else {
                console.error('Erro ao buscar analitos');
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
    };

    // Função para buscar procedimentos
    const fetchProcedures = async () => {
        try {
            const response = await fetch('http://localhost:8080/procedures'); // Endpoint que retorna todos os procedimentos
            if (response.ok) {
                const data = await response.json();
                setProcedures(data); // Armazena a lista de procedimentos no estado
            } else {
                console.error('Erro ao buscar procedimentos');
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
    };

    const fetchAnalises = async () => {
        try {
            const response = await fetch('http://localhost:8080/analise'); // Endpoint que retorna todas as matrizes
            if (response.ok) {
                const data = await response.json();
                setAnalyses(data); // Armazena a lista de matrizes no estado
            } else {
                console.error('Erro ao buscar análises');
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
    };


    useEffect(() => {
        fetchAnalises();
        fetchProcedures(); // Chama a função para buscar matrizes
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação e separação das coordenadas
        const [latitude, longitude] = coordenadaColeta.split(';').map(coord => coord.trim());

        const data = {
            nome,
            dataInicio,
            prazoFinalizacao,
            descricaoAnalise,
            procedimentoId: selectedProcedure ? selectedProcedure.id : null,
            analiseId: selectedAnalysis ? selectedAnalysis.id : null,
            coordenadaColeta: { latitude, longitude } // Pode ajustar para o formato que o backend espera
        };

        try {
            const response = await fetch('/api/amostra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Amostra cadastrada com sucesso!');
            } else {
                console.error('Erro ao cadastrar amostra');
            }
        } catch (error) {
            console.error('Erro ao conectar com o backend:', error);
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
                        Cadastro de Amostras
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
                        Cadastrar Amostra
                    </Typography>

                    <form onSubmit={handleSubmit}>

                        {/* Nome e Quantidade de Amostras */}
                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <TextField
                                label="Nome"
                                required
                                margin="normal"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                style={{ width: '350px' }}
                            />
                            <Autocomplete
                                options={analyses} // Lista de análises vinda do backend
                                getOptionLabel={(option) => option.nome}
                                onChange={(event, value) => setSelectedAnalysis(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Análise Associada"
                                        required
                                        margin="normal"
                                        style={{ width: '300px' }}
                                    />
                                )}
                            />
                        </Box>

                        {/* Usando flex para colocar os campos de datas lado a lado */}
                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <TextField
                                label="Data de Início"
                                type="date"
                                required
                                margin="normal"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                style={{ width: '350px' }}
                            />
                            <TextField
                                label="Prazo de Finalização"
                                type="date"
                                required
                                margin="normal"
                                value={prazoFinalizacao}
                                onChange={(e) => setPrazoFinalizacao(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                style={{ width: '300px' }}
                            />
                        </Box>

                        {/* Procedimentos e Coordenadas */}
                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <Autocomplete
                                options={procedures} // Lista de procedimentos vinda do backend
                                getOptionLabel={(option) => option.nome}
                                onChange={(event, value) => setSelectedProcedure(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Procedimentos Associados"
                                        required
                                        margin="normal"
                                        style={{ width: '350px' }} // Ajuste a largura se necessário
                                    />
                                )}
                            />
                            <TextField
                                label="Coordenada de Coleta (Latitude;Longitude)"
                                required
                                margin="normal"
                                value={coordenadaColeta}
                                onChange={(e) => setCoordenadaColeta(e.target.value)}
                                //helperText="Insira a latitude e longitude separadas por ';'. Exemplo: -23.550520; -46.633308"
                                style={{ width: '350px' }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <Button
                                onClick={handleOpenAnalitoSelector}
                                sx={{
                                    width: '300px', // Largura do botão
                                    height: '50px', // Definindo uma altura fixa
                                    backgroundColor: '#4caf50', // Cor verde
                                    color: 'white', // Cor do texto
                                    marginLeft: '16px', // Espaço à esquerda do botão
                                    '&:hover': {
                                        backgroundColor: '#45a049', // Cor ao passar o mouse
                                    },
                                }}
                            >
                                Selecionar Analitos
                            </Button>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            {/* Campo de Descrição da Análise */}
                            <TextField
                                label="Descrição da Análise"
                                required
                                margin="normal"
                                value={descricaoAnalise}
                                onChange={(e) => setDescricaoAnalise(e.target.value)}
                                style={{ width: '350px' }}
                                multiline
                                rows={6} // Deixa o campo de descrição mais alto
                            />
                        </Box>




                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button type="submit" variant="contained" color="primary">
                                Cadastrar
                            </Button>
                        </Box>
                    </form>





                </Box>
                {/* Usando o novo componente FeedbackDialog */}
                <FeedbackDialog open={dialogOpen} message={dialogMessage} onClose={handleDialogClose} />
            </Box>
        </Box>
    );
}

export default AmostraCadastro;
