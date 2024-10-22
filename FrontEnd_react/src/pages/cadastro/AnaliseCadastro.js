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

function AnaliseCadastro() {


    const [clientes, setClientes] = useState([]); // Para armazenar os clientes
    const [matrizes, setMatrizes] = useState([]); // Para armazenar as matrizes
    const [procedures, setProcedures] = useState([]); // Para armazenar os procedimentos
    const [contracts, setContracts] = useState([]); // Para armazenar os contratos

    const [selectedMatriz, setSelectedMatriz] = useState(null);

    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false); // Estado para controle do diálogo
    const [dialogMessage, setDialogMessage] = useState(''); // Mensagem do diálogo

    const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleDrawer = () => setDrawerOpen((prev) => !prev);
    const navigate = useNavigate();

    const [selectedContracts, setSelectedContracts] = useState(null);
    const [nome, setNome] = useState('');
    const [quantidadeAmostras, setQuantidadeAmostras] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [prazoFinalizacao, setPrazoFinalizacao] = useState('');

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);




    const fetchMatrizes = async () => {
        try {
            const response = await fetch('http://localhost:8080/matriz');
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Verifique o que é retornado aqui
                setMatrizes(data);
            } else {
                console.error('Erro ao buscar matrizes');
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
    };


    // Função para buscar procedimentos
    const fetchProcedures = async () => {
        try {
            const response = await fetch('http://localhost:8080/procedimento'); // Endpoint que retorna todos os procedimentos
            if (response.ok) {
                const data = await response.json();
                setProcedures(data); // Armazena a lista de procedimentos no estado
            } else {
                console.error('Erro ao buscar procedimento');
            }
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error);
        }
    };

    // Função para buscar contratos
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

    useEffect(() => {
        fetchMatrizes(); // Chama a função para buscar matrizes
        fetchProcedures(); // Chama a função para buscar procedimentos
        fetchContracts(); // Chama a função para buscar contratos
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Contrato selecionado:", selectedContracts); // Adicione isso antes do envio




           
    // Certifique-se de que um contrato foi selecionado
    if (!selectedContracts || !selectedContracts.id) { // Verifique se selectedContract.id não é nulo
        console.error('Nenhum contrato selecionado ou ID do contrato está faltando');
        return; // Impede o envio se nenhum contrato estiver selecionado
    }
        const data = {
            nome,
            contratos: selectedContracts ? selectedContracts.label : null,
            matriz: selectedMatriz ? selectedMatriz.label : null,
            procedimento: selectedProcedure ? selectedProcedure.label : null,
            quantidade: quantidadeAmostras,
            descricao,
            dataInicio,
            prazoFinalizacao,
            statusAnalise: "EM_ANDAMENTO",
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
                setOpenConfirm(true); // Abre o diálogo de confirmação
            } else {
                console.error('Erro ao salvar a análise');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }

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
                                options={contracts}
                                getOptionLabel={(option) => option.nomeContrato} // Use o nome correto do campo
                                onChange={(event, value) => setSelectedContracts(value)} // Mude para um único contrato
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Contratos Associados"
                                        required
                                        margin="normal"
                                        style={{ width: '300px' }}
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
                                options={procedures} // Usando a lista de procedimentos
                                getOptionLabel={(option) => option.nomeProcedimento} // Ajuste conforme a estrutura do seu procedimento
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
                            options={matrizes} // Usando a lista de matrizes
                            getOptionLabel={(option) => option.nomeMatriz} // Acessa a propriedade correta
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
                            label="Descrição da Análise"
                            required
                            margin="normal"
                            style={{ width: '350px' }}
                            InputProps={{ style: { height: '100px' } }}
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />

                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button variant="contained" type="submit">
                                Salvar
                            </Button>
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

export default AnaliseCadastro;
