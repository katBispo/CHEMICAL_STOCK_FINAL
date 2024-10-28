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
    Stepper, Step, StepLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    LinearProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import FeedbackDialog from '../components/FeedbackDialog.js';
import { useNavigate, useLocation } from 'react-router-dom';

function ContCadastroAnalise() {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [clientes, setClientes] = useState([]); // Para armazenar os clientes
    const navigate = useNavigate();


    const location = useLocation();
    const { quantidadeAnalises, contratoNome } = location.state || {};

    const [selectedMatriz, setSelectedMatriz] = useState(null); // Matriz selecionada
    const [descricaoGeral, setDescricaoGeral] = useState(''); // Descrição geral da análise

    const [selectedContracts, setSelectedContracts] = useState({ label: contratoNome }); // Define o valor inicial como um objeto
    const [nome, setNome] = useState(''); // Ajustado para nome
    const [quantidadeAmostras, setQuantidadeAmostras] = useState(quantidadeAnalises); // Define o valor inicial da quantidade
    const [numeroContrato, setNumeroContrato] = useState('');
    const [observacao, setObservacao] = useState('');
    const [dataInicio, setDataInicio] = useState(''); // Alterado
    const [prazoFinalizacao, setPrazoFinalizacao] = useState(''); // Alterado
    const [procedures, setProcedures] = useState([]);
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [matrizes, setMatrizes] = useState([]);
    const [selectedMatrizes, setSelectedMatrizes] = useState(null);
    const [dataCadastro, setDataCadastro] = useState(''); // Data de início da análise

    const [progress, setProgress] = useState(0); // Estado para controlar o progresso
    const [isLoading, setIsLoading] = useState(false); // Estado para controle de loading


    // Para controlar o progresso
    const [totalAnalises, setTotalAnalises] = useState(0);

    // Dialog states
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    const fetchMatrizes = async () => {
        console.log("Buscando matrizes...");
        try {
            const response = await fetch('http://localhost:8080/matriz');
            console.log("Status da resposta:", response.status);
            const responseText = await response.text(); // Captura a resposta como texto
            console.log("Conteúdo da resposta:", responseText); // Log do conteúdo

            if (response.ok) {
                const data = JSON.parse(responseText); // Tenta parsear para JSON
                console.log("Dados das matrizes:", data);
                setMatrizes(data);
            } else {
                console.error('Erro ao buscar matrizes:', responseText);
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
    };



    const fetchProcedures = async () => {
        try {
            const response = await fetch('http://localhost:8080/procedimento'); // Endpoint que retorna todos os procedimentos
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
    useEffect(() => {
        fetchMatrizes(); // Chama a função para buscar matrizes
        fetchProcedures(); // Chama a função para buscar procedimentos
    }, []);


    const [currentStep, setCurrentStep] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
    
        const data = {
            contratoAssociado: selectedContracts?.label,
            nome,
            descricaoGeral,
            statusAnalise: "EM_ANDAMENTO",
            matriz: selectedMatriz ? { id: selectedMatriz.id } : null,
            procedimento: selectedProcedure ? { id: selectedProcedure.id } : null,
            quantidadeAmostras,
            prazoFinalizacao,
            dataCadastro: dataInicio, // Presume-se que dataInicio seja o campo de data de cadastro
        };
    
        try {
            const response = await fetch("http://localhost:8080/analise", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("Análise cadastrada com sucesso:", result);
                setDialogMessage("Análise cadastrada com sucesso!");
                setDialogOpen(true);
            } else {
                throw new Error("Erro ao cadastrar análise");
            }
        } catch (error) {
            console.error("Erro:", error);
            setDialogMessage("Erro ao cadastrar análise. Tente novamente.");
            setDialogOpen(true);
        } finally {
            setIsLoading(false);
        }
    };
    



    const handleDialogClose = () => {
        setDialogOpen(false);
        navigate('/alguma-rota'); // Redirecionar após o fechamento do diálogo, se necessário
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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

                    {quantidadeAnalises > 0 && (
                        <Box mt={6}>
                            {/* Novo Stepper para exibir o progresso das etapas */}
                            <Stepper activeStep={currentStep} alternativeLabel>
                                {Array.from({ length: quantidadeAnalises }, (_, index) => (
                                    <Step key={index}>
                                        <StepLabel>{`Análise ${index + 1}`}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <Typography variant="caption" align="center">{`Etapa: ${currentStep + 1} de ${quantidadeAnalises}`}</Typography>
                        </Box>
                    )}

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
            options={[{ label: contratoNome }]}
            getOptionLabel={(option) => option.label}
            value={selectedContracts}
            onChange={(event, value) => setSelectedContracts(value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Contrato Associado"
                    required
                    margin="normal"
                    style={{ width: '300px' }}
                    disabled
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
            label="Prazo de Finalização"
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
            getOptionLabel={(option) => option.nomeProcedimento}
            value={selectedProcedure}
            onChange={(event, value) => setSelectedProcedure(value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Procedimento Associado"
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
        getOptionLabel={(option) => option.nomeMatriz}
        value={selectedMatriz}
        onChange={(event, value) => setSelectedMatriz(value)}
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
        label="Descrição Geral"
        required
        margin="normal"
        style={{ width: '350px' }}
        InputProps={{ style: { height: '100px' } }}
        value={descricaoGeral}
        onChange={(e) => setDescricaoGeral(e.target.value)}
    />

    <Box display="flex" justifyContent="center" marginTop={2}>
        <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Salvar'}
        </Button>
    </Box>
</form>

                </Box>
                <FeedbackDialog open={dialogOpen} message={dialogMessage} onClose={handleDialogClose} />
            </Box>
        </Box>

    );
}

export default ContCadastroAnalise;
