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
import FeedbackDialog from '../components/FeedbackDialog.js';
import { useNavigate, useLocation } from 'react-router-dom';
import "./css/baseCadastro.css"

function AnaliseCadastro() {


    const [clientes, setClientes] = useState([]); // Para armazenar os clientes
    const [matrizes, setMatrizes] = useState([]); // Para armazenar as matrizes
    const [procedures, setProcedures] = useState([]); // Para armazenar os procedimentos
    const [contracts, setContracts] = useState([]); // Para armazenar os contratos

    const [selectedMatriz, setSelectedMatriz] = useState(null); // Matriz selecionada
    const [selectedProcedure, setSelectedProcedure] = useState(null); // Procedimento selecionado
    const [selectedContract, setSelectedContract] = useState(null); // Contrato selecionado

    const [nome, setNome] = useState(''); // Nome da análise
    const [quantidadeAmostras, setQuantidadeAmostras] = useState(''); // Quantidade de amostras
    const [descricao, setDescricao] = useState(''); // Descrição da análise
    const [dataCadastro, setDataCadastro] = useState(''); // Data de início da análise
    const [dataInicio, setDataInicio] = useState(''); // Data de início da análise

    const [prazoFinalizacao, setPrazoFinalizacao] = useState(''); // Prazo de finalização
    const [dialogOpen, setDialogOpen] = useState(false); // Estado para controle do diálogo
    const [dialogMessage, setDialogMessage] = useState(''); // Mensagem do diálogo



    const [descricaoGeral, setDescricaoGeral] = useState(''); // Descrição geral da análise

    const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleDrawer = () => setDrawerOpen((prev) => !prev);
    const navigate = useNavigate();



    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);




    const fetchContracts = async () => {
        try {
            const response = await fetch('http://localhost:8080/contrato'); // Endpoint que retorna todos os contratos
            if (response.ok) {
                const data = await response.json();
                setContracts(data); // Armazena a lista de contratos no estado
            } else {
                console.error('Erro ao buscar contratos');
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
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
        fetchContracts(); // Chama a função para buscar contratos
        fetchMatrizes(); // Chama a função para buscar matrizes
        fetchProcedures(); // Chama a função para buscar procedimentos
    }, []);




    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Contrato selecionado:", selectedContract);

        const dataCadastro = new Date().toLocaleDateString('en-CA'); // Formata como "YYYY-MM-DD"

        if (!selectedContract || !selectedContract.id) {
            console.error('Nenhum contrato selecionado ou ID do contrato está faltando');
            return;
        }

        // Verifica se o prazoFinalizacao está atrasado
        let statusAnalise = "EM_ANDAMENTO"; // Valor padrão para o status
        if (new Date(prazoFinalizacao) < new Date(dataCadastro)) {
            statusAnalise = "ATRASADA"; // Define o status como "EM_ATRASO" se estiver atrasado
        }

        const data = {
            nome: nome,
            descricaoGeral: descricaoGeral,
            statusAnalise: statusAnalise, // Define o status com base na lógica
            contrato: selectedContract ? { id: selectedContract.id } : null,
            matriz: selectedMatriz ? { id: selectedMatriz.id } : null,
            //procedimento: selectedProcedure ? { id: selectedProcedure.id } : null,
            quantidadeAmostras: quantidadeAmostras,
            prazoFinalizacao: prazoFinalizacao,
            dataCadastro: dataCadastro,
            dataInicio: dataInicio,
        };

        console.log("Dados enviados:", data);

        try {
            const response = await fetch('http://localhost:8080/analise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setDialogOpen(true); // Abre o diálogo de confirmação
                setOpenAlertDialog(true); // Abre o alerta
            } else {
                console.error('Erro ao salvar a análise');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleAlertOk = () => {
        setOpenAlertDialog(false);
        navigate('/');
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" sx={{ bgcolor: "#4CAF50", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
                <Box className="cadastro-container">
                    <Typography variant="h4" gutterBottom>
                        Cadastrar Análise
                    </Typography>

                    <form onSubmit={handleSubmit} className="cadastro-form">
                        <div className="input-group">
                            <TextField
                                label="Nome"
                                required
                                margin="normal"
                                className="input-field"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Autocomplete
                                options={contracts}
                                getOptionLabel={(option) => option.nomeContrato}
                                onChange={(event, value) => setSelectedContract(value)}
                                renderInput={(params) => <TextField {...params} label="Contratos Associados" required margin="normal" className="input-field" />}
                            />
                        </div>

                        <div className="input-group">
                            <TextField
                                label="Data de Início"
                                type="date"
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                className="input-field"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                            />
                            <TextField
                                label="Prazo de finalização"
                                type="date"
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                className="input-field"
                                value={prazoFinalizacao}
                                onChange={(e) => setPrazoFinalizacao(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <TextField
                                label="Quantidade de Amostras"
                                required
                                margin="normal"
                                className="input-field"
                                type="number"
                                value={quantidadeAmostras}
                                onChange={(e) => setQuantidadeAmostras(e.target.valueAsNumber)}
                            />
                            <Autocomplete
                                options={matrizes}
                                getOptionLabel={(option) => option.nomeMatriz}
                                onChange={(event, value) => setSelectedMatriz(value)}
                                renderInput={(params) => <TextField {...params} label="Matriz" required margin="normal" className="input-field" />}
                            />
                        </div>

                        <TextField
                            label="Descrição da Análise"
                            required
                            margin="normal"
                            className="input-field"
                            InputProps={{ style: { height: "100px" } }}
                            value={descricaoGeral}
                            onChange={(e) => setDescricaoGeral(e.target.value)}
                        />

                        <div className="button-container">
                            <Button variant="contained" type="submit">
                                Salvar
                            </Button>
                        </div>
                    </form>
                </Box>

                <Dialog open={openAlertDialog} onClose={handleAlertOk}>
                    <DialogTitle>Alerta</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Para adicionar amostras posteriormente, não esqueça de adicionar o ID dessa análise.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAlertOk}>Ok</Button>
                    </DialogActions>
                </Dialog>

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

export default AnaliseCadastro;
    