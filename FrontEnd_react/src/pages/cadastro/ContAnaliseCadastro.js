import React, { useState } from 'react';
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
import FeedbackDialog from '../components/FeedbackDialog.js';
import { useNavigate, useLocation } from 'react-router-dom';

function ContCadastroAnalise() {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [clientes, setClientes] = useState([]); // Para armazenar os clientes
    const navigate = useNavigate();

    const location = useLocation();
    const { quantidadeAnalises, contratoNome } = location.state;



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



    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const totalAnalises = quantidadeAnalises; // Armazena a quantidade total de análises
        setProgress(0); // Resetando o progresso

        for (let i = 0; i < quantidadeAmostras; i++) {
            const data = {
                nome,
                contratos: selectedContracts,
                matriz: selectedMatrizes,
                procedimento: selectedProcedure,
                quantidade: quantidadeAmostras,
                descricao: observacao,
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
                    setDialogMessage(`Análise ${i + 1} cadastrada com sucesso!`);
                    console.log(`Análise ${i + 1} salva com sucesso`);
                } else {
                    const errorData = await response.json();
                    console.error('Erro ao salvar a análise:', errorData);
                    setDialogMessage('Erro ao cadastrar a análise.');
                }
            } catch (error) {
                console.error('Erro ao enviar dados:', error);
                setDialogMessage('Erro ao salvar a análise no banco de dados.');
            }

            // Atualizando o progresso
            setProgress(((i + 1) / quantidadeAmostras) * 100);
        }

        setIsLoading(false);
        setDialogOpen(true);
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
                            <LinearProgress variant="determinate" value={progress} />
                            <Typography variant="caption" align="center">{`Cadastrando: ${Math.round(progress)}%`}</Typography>
                        </Box>
                    )}

                    {console.log('Total Análises:', totalAnalises)}
                    {console.log('Progress:', progress)}

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
                                options={[{ label: contratoNome }]} // Passa um array com um único objeto
                                getOptionLabel={(option) => option.label}
                                value={selectedContracts} // Define o valor atual
                                onChange={(event, value) => setSelectedContracts(value)} // Atualiza o estado
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Contratos Associados"
                                        required
                                        margin="normal"
                                        style={{ width: '300px' }}
                                        disabled // Torna o campo não editável
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
                            value={observacao}
                            onChange={(e) => setObservacao(e.target.value)}
                        />

                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button variant="contained" type="submit" disabled={isLoading}>
                                {isLoading ? 'Cadastrando...' : 'Salvar'}
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

export default ContCadastroAnalise;
