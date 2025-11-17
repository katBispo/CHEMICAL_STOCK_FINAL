import React, { useState, useEffect } from "react";
import {
  Box, AppBar, Toolbar, IconButton, Typography, Button,
  TextField, Autocomplete, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "../components/SideBar.js";
import FeedbackDialog from "../components/FeedbackDialog.js";
import { useNavigate } from "react-router-dom";
import "./css/baseCadastro.css";
import Analise from "../../models/AnaliseModel.js";

import { getContratos } from "../../services/contratoService.js";
import { getMatrizes } from "../../services/MatrizService.js";
import { salvarAnalise } from "../../services/AnaliseService.js"; 

function AnaliseCadastro() {
  const [clientes, setClientes] = useState([]);
  const [matrizes, setMatrizes] = useState([]);
  const [contracts, setContracts] = useState([]);

  const [selectedMatriz, setSelectedMatriz] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);

  const [nome, setNome] = useState("");
  const [quantidadeAmostras, setQuantidadeAmostras] = useState("");
  const [descricaoGeral, setDescricaoGeral] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [prazoFinalizacao, setPrazoFinalizacao] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(true);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contratosRes, matrizesRes] = await Promise.all([
          getContratos(),
          getMatrizes(),
        ]);

        setContracts(contratosRes || []);
        setMatrizes(matrizesRes || []);
      } catch (error) {
        console.error("Erro ao buscar dados via services:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataCadastro = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    const statusAnalise =
      new Date(prazoFinalizacao) < new Date(dataCadastro)
        ? "ATRASADA"
        : "EM_ANDAMENTO";

    const novaAnalise = new Analise({
      nome,
      descricaoGeral,
      quantidadeAmostras,
      dataCadastro,
      dataInicio,
      prazoFinalizacao,
      statusAnalise,
      contrato: selectedContract ? { id: selectedContract.id } : null,
      matriz: selectedMatriz ? { id: selectedMatriz.id } : null,
    });

    console.log("Objeto enviado:", novaAnalise);

    try {
      await salvarAnalise(novaAnalise);
      setDialogMessage("✅ Análise cadastrada com sucesso!");
      setDialogOpen(true);
      setOpenAlertDialog(true);
    } catch (error) {
      console.error("Erro ao salvar análise:", error);
      setDialogMessage("❌ Erro ao salvar a análise.");
      setDialogOpen(true);
    }
  };

  const handleAlertOk = () => {
    setOpenAlertDialog(false);
    navigate("/analiseLista");
  };

  const handleCloseDialog = () => setDialogOpen(false);

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
  sx={{ width: "350px" }}   // <-- AQUI!
  getOptionLabel={(option) => option.nomeContrato || ""}
  onChange={(event, value) => setSelectedContract(value)}
  renderInput={(params) => (
    <TextField {...params} label="Contrato" required margin="normal" />
  )}
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
                label="Prazo de Finalização"
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
                onChange={(e) => setQuantidadeAmostras(e.target.value)}
              />
           <Autocomplete
  options={matrizes}
  sx={{ width: "350px" }}   // <-- AQUI!
  getOptionLabel={(option) => option.nomeMatriz || ""}
  onChange={(event, value) => setSelectedMatriz(value)}
  renderInput={(params) => (
    <TextField {...params} label="Matriz" required margin="normal" />
  )}
/>

            </div>

            <TextField
              label="Descrição Geral"
              required
              margin="normal"
              className="input-field"
              multiline
              rows={4}
              value={descricaoGeral}
              onChange={(e) => setDescricaoGeral(e.target.value)}
            />

            <div className="button-container">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#4CAF50",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#43a047" },
                }}
              >
                Salvar
              </Button>
            </div>
          </form>
        </Box>

        <Dialog open={openAlertDialog} onClose={handleAlertOk}>
          <DialogTitle>Atenção</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para adicionar amostras posteriormente, anote o ID desta análise.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertOk}>Ok</Button>
          </DialogActions>
        </Dialog>

        <FeedbackDialog open={dialogOpen} message={dialogMessage} onClose={handleCloseDialog} />
      </Box>
    </Box>
  );
}

export default AnaliseCadastro;
