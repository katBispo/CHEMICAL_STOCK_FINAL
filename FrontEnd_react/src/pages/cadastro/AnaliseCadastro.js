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

    const [selectedMatriz, setSelectedMatriz] = useState(null); // Matriz selecionada
    const [selectedProcedure, setSelectedProcedure] = useState(null); // Procedimento selecionado
    const [selectedContract, setSelectedContract] = useState(null); // Contrato selecionado

    const [nome, setNome] = useState(''); // Nome da análise
    const [quantidadeAmostras, setQuantidadeAmostras] = useState(''); // Quantidade de amostras
    const [descricao, setDescricao] = useState(''); // Descrição da análise
    const [dataCadastro, setDataCadastro] = useState(''); // Data de início da análise
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
        console.log("Contrato selecionado:", selectedContract); // Adicione isso antes do envio

        // Certifique-se de que um contrato foi selecionado
        if (!selectedContract || !selectedContract.id) { // Verifique se selectedContract.id não é nulo
            console.error('Nenhum contrato selecionado ou ID do contrato está faltando');
            return; // Impede o envio se nenhum contrato estiver selecionado
        }
        const data = {
            nome: nome, // Outros campos da análise
            descricaoGeral: descricaoGeral,
            statusAnalise: "EM_ANDAMENTO", // Status default para a análise
            contrato: selectedContract ? { id: selectedContract.id } : null, // Inclua o contrato aqui (atenção ao singular)
            matriz: selectedMatriz ? { id: selectedMatriz.id } : null, // Inclua a matriz aqui
            procedimento: selectedProcedure ? { id: selectedProcedure.id } : null, // Inclua o procedimento aqui
            quantidadeAmostras: quantidadeAmostras, // Ajuste conforme os campos do formulário
            prazoFinalizacao: prazoFinalizacao,
            dataCadastro: dataCadastro,
        };
        console.log("Dados enviados:", data); // Verifique os dados antes de enviar

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
                                getOptionLabel={(option) => option.nomeContrato} // Ajusta conforme a estrutura do contrato
                                onChange={(event, value) => setSelectedContract(value)} // Atualiza o contrato selecionado
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
                                value={dataCadastro}
                                onChange={(e) => setDataCadastro(e.target.value)}
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
                                getOptionLabel={(option) => option.nomeProcedimento} // Ajusta conforme a estrutura do procedimento
                                onChange={(event, value) => setSelectedProcedure(value)} // Atualiza o procedimento selecionado
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
                                type="number" // Adicione isso para garantir que seja um número
                                value={quantidadeAmostras}
                                onChange={(e) => setQuantidadeAmostras(e.target.valueAsNumber)} // Use valueAsNumber para garantir que seja numérico
                            />

                        </Box>

                        <Autocomplete
                            options={matrizes}
                            getOptionLabel={(option) => option.nomeMatriz} // Acessa a propriedade correta da matriz
                            onChange={(event, value) => setSelectedMatriz(value)} // Atualiza a matriz selecionada
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
                            value={descricaoGeral}
                            onChange={(e) => setDescricaoGeral(e.target.value)}
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
