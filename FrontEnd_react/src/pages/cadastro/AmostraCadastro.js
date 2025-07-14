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
    List,
    ListItem

} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar';
import SelectAnaliseDaAmostra from '../components/SelectAnaliseDaAmostra'
import AnalitoSelector from '../components/AnalitoSelector';
import ProcedimentoSelector from '../components/ProcedimentoSelector';

import { useNavigate, useLocation } from 'react-router-dom';

function AmostraCadastro({ }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const location = useLocation();
    const { selectedAnalise } = location.state || {}; // Pegando a análise do estado

    const [procedimentos, setProcedimentos] = useState([]);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [selectedProcedimentos, setSelectedProcedimentos] = useState([]); // Definindo o estado para armazenar os procedimentos selecionados
    const [showProcedureSelector, setShowProcedureSelector] = useState(false);
    const [selectedProcedures, setSelectedProcedures] = useState([]);


    console.log("Procedimentos recebidos na tela de amostra:", selectedProcedures); // Debug


    console.log("Análise selecionada:", selectedAnalise);


    const [procedures, setProcedures] = useState([]);
    const [analise, setAnalise] = useState([]);
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    //const [selectedAnalise] = useState(location.state?.selectedAnalise || null);
    const [coordenadaColeta, setCoordenadaColeta] = useState('');
    const [showAnalitoSelector, setShowAnalitoSelector] = useState(false);
    const [nome, setNome] = useState('');
    const [dataColeta, setDataColeta] = useState('');
    const [prazoFinalizacao, setPrazoFinalizacao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [enderecoColeta, setEnderecoColeta] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [selectedAnalitos, setSelectedAnalitos] = useState([]);
    const [showOverlay, setShowOverlay] = useState(true); // Controle do overlay


    const navigate = useNavigate();

    const fetchProcedures = async () => {
        try {
            const response = await fetch('http://localhost:8080/procedimento');
            if (response.ok) {
                const data = await response.json();
                setProcedures(data);
            } else {
                console.error('Erro ao buscar procedimentos');
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
    };

    const fetchAnalises = async () => {
        try {
            const response = await fetch('http://localhost:8080/analise');
            if (response.ok) {
                const data = await response.json();
                setAnalise(data);
            }
        } catch (error) {
            console.error('Erro ao buscar análises:', error);
        }
    };

    useEffect(() => {
        fetchAnalises();
        fetchProcedures();
    }, []);



    const handleCloseOverlay = () => {
        // Lógica para fechar o modal
        setShowAnalitoSelector(false); // Exemplo
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar se os objetos necessários estão definidos
        if (!selectedProcedures || !selectedAnalise || !selectedAnalitos || selectedAnalitos.length === 0) {
            console.error("Por favor, selecione todos os campos necessários.");
            return;
        }

        // Logs para depuração
        console.log("Selected Procedures:", selectedProcedures);
        console.log("Selected Analise:", selectedAnalise);
        console.log("Selected Analitos:", selectedAnalitos);

        const currentDate = new Date().toISOString().split("T")[0];

        const payload = {
            nome,
            dataColeta,
            prazoFinalizacao,
            enderecoColeta,
            descricao,
            dataCadastro: currentDate,
            coordenadaColeta,
            analiseId: selectedAnalise.id,
            proceduresIds: selectedProcedures.map((p) => p.id),
            analitosIds: selectedAnalitos.map((a) => a.id),
            status: "EM_ANDAMENTO"
        };

        console.log("Payload enviado:", JSON.stringify(payload, null, 2));

        try {
            const response = await fetch("http://localhost:8080/amostra", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Erro ao salvar a amostra:", errorText);
                throw new Error("Erro ao salvar a amostra");
            }

            console.log("Amostra salva com sucesso!");

            // Limpar formulário após sucesso
            setNome("");
            setDescricao("");
            setCoordenadaColeta("");
            setSelectedProcedures([]);
            setSelectedAnalitos([]);
            handleClose(); 
        } catch (error) {
            console.error("Erro ao conectar com o backend:", error);
        }
    };




    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleProcedureSelection = (procedimentosSelecionados) => {
        setSelectedProcedures(procedimentosSelecionados);
    };


    const handleOverlayClose = () => {
        setShowOverlay(false); 
    };
    const handleAnalitoSelection = (analitosSelecionados) => {
        console.log("Analitos recebidos:", analitosSelecionados);
        setSelectedAnalitos(analitosSelecionados || []); 
    };

    const handleSaveProcedures = (procedures) => {
        console.log("Procedimentos recebidos:", procedures);
        setSelectedProcedures(procedures || []); 
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
                        mx: 'auto',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Cadastrar Amostra
                    </Typography>

                    {/* Exibe a análise selecionada */}
                    {selectedAnalise && (
                        <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                            <Typography variant="subtitle1">
                                <strong>Análise selecionada:</strong> {selectedAnalise.nome}
                            </Typography>
                        </Box>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <TextField
                                label="Nome"
                                required
                                margin="normal"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                sx={{ width: '350px' }}
                            />
                            <TextField
                                label="Endereço"
                                required
                                margin="normal"
                                value={enderecoColeta}
                                onChange={(e) => setEnderecoColeta(e.target.value)}
                                sx={{ width: '350px' }}
                            />
                        </Box>

                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <TextField
                                label="Data de Início"
                                type="date"
                                required
                                margin="normal"
                                value={dataColeta}
                                onChange={(e) => setDataColeta(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ width: '350px' }}
                            />
                            <TextField
                                label="Prazo de Finalização"
                                type="date"
                                required
                                margin="normal"
                                value={prazoFinalizacao}
                                onChange={(e) => setPrazoFinalizacao(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ width: '300px' }}
                            />
                        </Box>

                        <Box display="flex" flexDirection="column" gap={2}>
                            {/* Botão para abrir o ProcedimentoSelector */}
                            <Button
                                onClick={() => setShowProcedureSelector(true)}
                                sx={{
                                    width: '350px',
                                    height: '50px',
                                    backgroundColor: '#4caf50',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#45a049' },
                                }}
                            >
                                Selecionar Procedimentos
                            </Button>

                            {/* Lista de Procedimentos Selecionados*/}
                            {selectedProcedures?.length > 0 && (
                                <Box
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        width: '350px',
                                    }}
                                >
                                    <Typography variant="subtitle1">Procedimentos Selecionados:</Typography>
                                    <List>
                                        {selectedProcedures?.map((procedure, index) => (
                                            <ListItem key={index}>
                                                <Typography variant="body2">
                                                    {procedure.classificacao || "Classificação não disponível"} -{" "}
                                                    {procedure.tipos?.length > 0
                                                        ? procedure.tipos
                                                            .map(
                                                                (tipo) =>
                                                                    `${tipo.tipo || "Tipo não especificado"} (${tipo.subtipos?.join(", ") || "Nenhum subtipo"})`
                                                            )
                                                            .join("; ")
                                                        : "Nenhum tipo disponível"}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}

                            {/* Botão para abrir o AnalitoSelector */}
                            <Button
                                onClick={() => setShowAnalitoSelector(true)}
                                sx={{
                                    width: '350px',
                                    height: '50px',
                                    backgroundColor: '#4caf50',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#45a049' },
                                }}
                            >
                                Selecionar Analitos
                            </Button>

                            {/* Lista de Analitos Selecionados */}
                            {selectedAnalitos?.length > 0 && (
                                <Box
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        width: '350px',
                                    }}
                                >
                                    <Typography variant="subtitle1">Analitos Selecionados:</Typography>
                                    <List>
                                        {selectedAnalitos.map((analito, index) => (
                                            <ListItem key={index}>
                                                <Typography variant="body2">
                                                    {analito.classificacao || "Classificação não disponível"} -{" "}
                                                    {analito.tipos?.length > 0
                                                        ? analito.tipos.map(
                                                            (tipo) =>
                                                                `${tipo.tipo || "Tipo não especificado"} (${tipo.subtipos?.join(", ") || "Nenhum subtipo"})`
                                                        ).join("; ")
                                                        : "Nenhum tipo disponível"}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}

                            {/* Modais de Seleção */}
                            {showProcedureSelector && (
                                <ProcedimentoSelector
                                    onSave={handleSaveProcedures}
                                    onClose={() => setShowProcedureSelector(false)}
                                />
                            )}
                            {showAnalitoSelector && (
                                <AnalitoSelector
                                    selectedAnalitos={selectedAnalitos}
                                    handleClose={() => setShowAnalitoSelector(false)}
                                    onAnalitoSelect={handleAnalitoSelection}
                                />
                            )}
                        </Box>


                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button type="submit" variant="contained" color="primary">
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default AmostraCadastro;