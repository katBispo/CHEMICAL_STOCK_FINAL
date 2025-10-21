import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    TextField,
    Input,
    Dialog,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FeedbackDialog from '../components/FeedbackDialog';
import SideBar from '../components/SideBar.js';
import SelectReagente from '../components/SelectReagente';
import { useNavigate } from 'react-router-dom';

import Procedimento from "../../models/ProcedimentoModel.js";
import { salvarProcedimento } from "../../services/ProcedimentoService.js";

function ProcedimentoCadastro() {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [nomeProcedimento, setNomeProcedimento] = useState('');
    const [descricaoProcedimento, setDescricao] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [dataCadastro, setDataCadastro] = useState(new Date().toISOString().split('T')[0]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [overlayOpen, setOverlayOpen] = useState(false);
    const [reagentesSelecionados, setReagentesSelecionados] = useState([]);

    const navigate = useNavigate();

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    const handleSaveReagentes = (reagentes) => {
        console.log('Reagentes selecionados:', reagentes);

        setReagentesSelecionados(reagentes);
    };

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (reagentesSelecionados.length === 0) {
    setDialogMessage("Selecione pelo menos um reagente.");
    setDialogOpen(true);
    return;
  }

  const reagentesQuantidades = reagentesSelecionados.map((r) => ({
    idReagente: r.reagente.id,
    quantidade: r.quantidade,
  }));

  const novoProcedimento = new Procedimento(
    nomeProcedimento,
    descricaoProcedimento,
    dataCadastro,
    reagentesQuantidades
  );

  // 🔍 Corpo da requisição padronizado
  const requestBody = {
    procedimento: {
      nomeProcedimento: novoProcedimento.nomeProcedimento,
      descricaoProcedimento: novoProcedimento.descricaoProcedimento,
      dataCadastro: novoProcedimento.dataCadastro,
    },
    reagentesQuantidades: novoProcedimento.reagentesQuantidades,
  };

  console.log("Corpo da requisição que será enviado:", JSON.stringify(requestBody, null, 2));

  try {
    await salvarProcedimento(requestBody);
    setDialogMessage("Procedimento cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar o procedimento:", error);
    setDialogMessage("Erro ao salvar o procedimento no banco de dados.");
  }

  setDialogOpen(true);
};

    const handleDialogClose = () => {
        setDialogOpen(false);
        navigate('/');
    };

    return (
        <Box display="flex" justifyContent="flex-start" gap={2}>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cadastro de Procedimento
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    maxWidth: '800px',
                    marginLeft: '200px',
                    marginTop: '90px',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Cadastrar Procedimento
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome do Procedimento"
                        value={nomeProcedimento}
                        onChange={(e) => setNomeProcedimento(e.target.value)}
                        required
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Descrição Geral"
                        value={descricaoProcedimento}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                        margin="normal"
                        multiline
                        rows={4}
                        style={{ width: '100%' }}
                    />
                    <Input
                        type="file"
                        inputProps={{ accept: 'application/pdf' }}
                        onChange={(e) => setPdfFile(e.target.files[0])}
                        required
                        style={{ marginTop: '16px' }}
                    />
                    <div>
                        {/* Botão que abre o overlay */}
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button variant="contained" onClick={() => setOverlayOpen(true)}>
                                Selecionar Reagentes
                            </Button>
                        </Box>

                        {/* Componente Overlay com a lista de reagentes */}
                        <SelectReagente
                            open={overlayOpen}              
                            onClose={() => setOverlayOpen(false)}
                            onSave={handleSaveReagentes}     
                        />

                        {/* Exibe os reagentes selecionados */}
                        <div>
                            <h3>Reagentes Selecionados</h3>
                            <ul>
                                {reagentesSelecionados.map((item, index) => (
                                    <li key={index}>
                                        {item.reagente.nome} - {item.quantidade}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Cadastrar Procedimento
                        </Button>
                    </Box>
                </form>
            </Box>

            <FeedbackDialog open={dialogOpen} message={dialogMessage} onClose={handleDialogClose} />
        </Box>
    );
}

export default ProcedimentoCadastro;