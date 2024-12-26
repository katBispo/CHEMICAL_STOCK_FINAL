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
import { useNavigate } from 'react-router-dom';

function AmostraCadastro({ open, handleClose }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const [procedures, setProcedures] = useState([]);
    const [analise, setAnalise] = useState([]);
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [selectedAnalise, setSelectedAnalise] = useState(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
          // Verificar se os objetos necessários estão definidos
    if (!selectedProcedure || !selectedAnalise || !selectedAnalitos || selectedAnalitos.length === 0) {
        console.error("Por favor, selecione todos os campos necessários.");
        return;
    }
        console.log("Selected Analitos:", selectedAnalitos); // Verifique se os analitos estão sendo corretamente selecionados
    
        // Montar o payload completo com os analitos
        const payload = {
            nome,
            dataColeta,
            prazoFinalizacao,
            enderecoColeta,
            descricao,
            procedimento: { id: selectedProcedure.id },
            analise: { id: selectedAnalise.id },
            coordenadaColeta, // Usar diretamente a string "latitude;longitude"
            analitos: selectedAnalitos.map((analito) => ({
                id: analito.id,
                classificacao: analito.classificacao,
                tipos: analito.tipos.map((tipo) => ({
                    tipo: tipo.tipo,
                    subtipos: tipo.subtipos, // Mapeando subtipos
                })),
            })),
        };
    
        console.log("Payload enviado ao backend:", JSON.stringify(payload, null, 2));
    
        try {
            const response = await fetch("http://localhost:8080/amostra", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error("Erro ao salvar a amostra");
            }
    
            console.log("Amostra salva com sucesso!");
    
            // Limpar formulário após sucesso
            setNome("");
            setDescricao("");
            setCoordenadaColeta("");
            setSelectedProcedure(null);
            setSelectedAnalise(null);
            setSelectedAnalitos([]);
            handleClose(); // Fechar modal ou interface
        } catch (error) {
            console.error("Erro ao conectar com o backend:", error);
        }
    };
    

    const handleOverlayClose = () => {
        setShowOverlay(false); // Fecha o overlay
    };
    const handleAnalitoSelection = (analitosSelecionados) => {
        setSelectedAnalitos(analitosSelecionados);
    };
 

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    return (
        


        <>
        {/* Overlay para selecionar análise */}
        {showOverlay ? (
            <SelectAnaliseDaAmostra
                onCloseOverlay={() => setShowOverlay(false)} // Callback para fechar o overlay
            />
        ) : (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: theme => theme.zIndex.drawer + 1 }}>
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
                            <Autocomplete
                                options={analise}
                                getOptionLabel={(option) => option.nome}
                                onChange={(event, value) => setSelectedAnalise(value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Análise Associada" required margin="normal" sx={{ width: '300px' }} />
                                )}
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

                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <Autocomplete
                                options={procedures}
                                getOptionLabel={(option) => option.nomeProcedimento}
                                onChange={(event, value) => setSelectedProcedure(value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Procedimentos Associados" required margin="normal" sx={{ width: '350px' }} />
                                )}
                            />
                            <TextField
                                label="Coordenada de Coleta (Latitude;Longitude)"
                                required
                                margin="normal"
                                value={coordenadaColeta}
                                onChange={(e) => setCoordenadaColeta(e.target.value)}
                                sx={{ width: '350px' }}
                            />
                        </Box>

                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <Button
                                onClick={() => setShowAnalitoSelector(true)}
                                sx={{
                                    width: '350px',
                                    height: '50px',
                                    backgroundColor: '#4caf50',
                                    color: 'white',
                                    mt: '16px',
                                    '&:hover': { backgroundColor: '#45a049' },
                                }}
                            >
                                Selecionar Analitos
                            </Button>
                            {/* Exibe os analitos selecionados */}
                            {selectedAnalitos?.length > 0 && (
                                <Box
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        marginTop: '16px',
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
                                                        ? analito.tipos
                                                            .map(
                                                                (tipo) =>
                                                                    `${tipo.tipo || "Tipo não especificado"} (${tipo.subtipos?.join(", ") || "Nenhum subtipo"
                                                                    })`
                                                            )
                                                            .join("; ")
                                                        : "Nenhum tipo disponível"}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}




                            <TextField
                                label="Endereço"
                                required
                                margin="normal"
                                value={enderecoColeta}
                                onChange={(e) => setEnderecoColeta(e.target.value)}
                                sx={{ width: '350px' }}
                            />
                        </Box>

                        {showAnalitoSelector && (
                            <AnalitoSelector
                                selectedAnalitos={selectedAnalitos}
                                handleClose={() => setShowAnalitoSelector(false)}
                                onAnalitoSelect={handleAnalitoSelection}
                            />
                        )}

                        <Box display="flex" justifyContent="flex-start" gap={2}>
                            <TextField
                                label="Descrição da Amostra"
                                required
                                margin="normal"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                sx={{ width: '100%' }}
                                multiline
                                rows={6}
                            />
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
           )}
        </>
    );
}

export default AmostraCadastro;
