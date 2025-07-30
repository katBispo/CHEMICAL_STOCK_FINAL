import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, List, ListItem, TextField, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AnalitoSelector from '../components/AnalitoSelector';
import ProcedimentoSelector from '../components/ProcedimentoSelector';
import SideBar from '../components/SideBar'; 

function AmostraCadastro() {
    const [showAnalitoSelector, setShowAnalitoSelector] = useState(false);
    const [showProcedureSelector, setShowProcedureSelector] = useState(false);
    const [selectedAnalitos, setSelectedAnalitos] = useState([]);
    const [selectedProcedures, setSelectedProcedures] = useState([]);
    const [procedimentos, setProcedimentos] = useState([]);
    const [analise, setAnalise] = useState([]);
    const [nome, setNome] = useState('');
    const [dataColeta, setDataColeta] = useState('');
    const [prazoFinalizacao, setPrazoFinalizacao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [enderecoColeta, setEnderecoColeta] = useState('');
    const [coordenadaColeta, setCoordenadaColeta] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(true);
    const location = useLocation();
    const { selectedAnalise } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🔍 Estado showAnalitoSelector:", showAnalitoSelector);
        console.log("🔍 Estado showProcedureSelector:", showProcedureSelector);
        console.log("🔍 Análise selecionada:", selectedAnalise);
        console.log("🔍 Procedimentos selecionados:", selectedProcedures);
        console.log("🔍 Analitos selecionados:", selectedAnalitos);

        const fetchProcedures = async () => {
            try {
                const response = await fetch('http://localhost:8080/procedimento');
                if (response.ok) {
                    const data = await response.json();
                    setProcedimentos(data);
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

        fetchAnalises();
        fetchProcedures();
    }, [showAnalitoSelector, showProcedureSelector, selectedAnalise, selectedProcedures, selectedAnalitos]);

    const handleCloseOverlay = () => {
        setShowAnalitoSelector(false);
        console.log("🔍 Fechando overlay do AnalitoSelector, showAnalitoSelector:", false);
    };

    const handleCloseProcedureSelector = () => {
        setShowProcedureSelector(false);
        console.log("🔍 Fechando overlay do ProcedimentoSelector, showProcedureSelector:", false);
    };

    const handleSaveProcedures = (procedures) => {
        console.log("🔍 Procedimentos recebidos:", procedures);
        setSelectedProcedures(procedures || []);
        setShowProcedureSelector(false);
    };

    function montarAnalitosSelecionados(selectedAnalitos) {
        const resultado = [];

        selectedAnalitos.forEach(analito => {
            if (!analito.analitoId) {
                console.warn(`AnalitoId ausente para classificação '${analito.classificacao}'`);
                return;
            }

            analito.tipos.forEach(tipo => {
                tipo.subtipos.forEach(subtipo => {
                    resultado.push({
                        analitoId: analito.analitoId,
                        subtipo: subtipo,
                        classificacao: analito.classificacao
                    });
                });
            });
        });

        console.log("🔍 Analitos selecionados formatados:", JSON.stringify(resultado, null, 2));
        return resultado;
    }

    const analitosSelecionados = montarAnalitosSelecionados(selectedAnalitos);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProcedures || selectedProcedures.length === 0) {
            alert("Por favor, selecione pelo menos um procedimento.");
            return;
        }

        if (!selectedAnalise) {
            alert("Por favor, selecione uma análise.");
            return;
        }

        if (!selectedAnalitos || selectedAnalitos.length === 0 || analitosSelecionados.length === 0) {
            alert("Por favor, selecione pelo menos um analito com subtipo.");
            return;
        }

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
            status: "EM_ANDAMENTO",
            analitosSelecionados
        };

        console.log("🔍 Payload enviado:", JSON.stringify(payload, null, 2));

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
            setNome("");
            setDescricao("");
            setCoordenadaColeta("");
            setSelectedProcedures([]);
            setSelectedAnalitos([]);
            setShowAnalitoSelector(false);
            setShowProcedureSelector(false);
            navigate('/'); 
        } catch (error) {
            console.error("Erro ao conectar com o backend:", error);
            alert("Erro ao salvar a amostra. Verifique o console para detalhes.");
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
                            <Button
                                onClick={() => {
                                    setShowProcedureSelector(true);
                                    console.log("🔍 Botão Selecionar Procedimentos clicado, showProcedureSelector:", true);
                                }}
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
                                        {selectedProcedures.map((procedure, index) => (
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

                            <Button
                                onClick={() => {
                                    setShowAnalitoSelector(true);
                                    console.log("🔍 Botão Selecionar Analitos clicado, showAnalitoSelector:", true);
                                }}
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

                            {showProcedureSelector && (
                                <ProcedimentoSelector
                                    open={showProcedureSelector}
                                    onSave={handleSaveProcedures}
                                    onClose={handleCloseProcedureSelector}
                                />
                            )}

                            {showAnalitoSelector && (
                                <AnalitoSelector
                                    open={showAnalitoSelector}
                                    selectedAnalitos={selectedAnalitos}
                                    onAnalitoSelect={setSelectedAnalitos}
                                    handleClose={handleCloseOverlay}
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