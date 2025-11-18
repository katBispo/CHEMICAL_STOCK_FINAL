import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "../components/SideBar";
import FeedbackDialog from "../components/FeedbackDialog";

import { criarResiduo } from "../../services/ResiduoService";

const ResiduoCadastro = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState(null);
  const [quantidade, setQuantidade] = useState("");
  const [unidadeMedida, setUnidadeMedida] = useState(null);
  const [estadoFisico, setEstadoFisico] = useState(null);
  const [dataGeracao, setDataGeracao] = useState("");
  const [dataDescarte, setDataDescarte] = useState("");
  const [observacao, setObservacao] = useState("");

  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const residuoData = {
      nome,
      tipo,
      quantidade: parseFloat(quantidade),
      unidadeMedida,
      estadoFisico,
      dataGeracao,
      dataDescarte,
      observacao,
    };

    try {
      await criarResiduo(residuoData);
      setDialogMessage("✅ Resíduo cadastrado com sucesso!");
      setDialogOpen(true);

      // Limpar campos após sucesso
      setNome("");
      setTipo(null);
      setQuantidade("");
      setUnidadeMedida(null);
      setEstadoFisico(null);
      setDataGeracao("");
      setDataDescarte("");
      setObservacao("");

      // Exibir alerta para anotar ID (opcional)
      setOpenAlertDialog(true);
    } catch (error) {
      console.error("Erro ao cadastrar resíduo:", error);
      setDialogMessage("❌ Erro ao cadastrar resíduo. Tente novamente.");
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => setDialogOpen(false);
  const handleAlertOk = () => setOpenAlertDialog(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ bgcolor: "#4CAF50", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cadastro de Resíduos
          </Typography>
        </Toolbar>
      </AppBar>

      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
        <Toolbar />
        <Box
          className="cadastro-container"
          sx={{
            width: "1200px",
            height: "800px", // ✅ altura fixa
            margin: "0 auto", // centraliza horizontalmente
            backgroundColor: "#fff", // opcional para destacar
            padding: "24px", // espaçamento interno
            borderRadius: "8px", // bordas arredondadas
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // sombra opcional
          }}
        >
          <Typography variant="h4" gutterBottom>
            Cadastrar Resíduo
          </Typography>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)", // 2 colunas iguais
              gap: "20px", // espaçamento entre os campos
              width: "100%", // ocupa toda a largura do container
            }}
          >
            {/* Nome (ocupa duas colunas) */}
            <TextField
              label="Nome do Resíduo"
              required
              margin="normal"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={{ gridColumn: "span 2" }} // ocupa as duas colunas
            />

            {/* Tipo de Resíduo (agora é campo livre) */}
            <TextField
              label="Tipo do Resíduo"
              required
              margin="normal"
              fullWidth
              value={tipo || ""}
              onChange={(e) => setTipo(e.target.value)}
            />

            {/* Estado Físico */}

            <TextField
              label="Estado Físico"
              required
              margin="normal"
              fullWidth
              value={estadoFisico || ""}
              onChange={(e) => setEstadoFisico(e.target.value)}
            />

            {/* Quantidade */}
            <TextField
              label="Quantidade"
              required
              margin="normal"
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />

            {/* Unidade */}

            {/* Unidade */}
            <TextField
              label="Unidade de Medida"
              required
              margin="normal"
              fullWidth
              value={unidadeMedida || ""}
              onChange={(e) => setUnidadeMedida(e.target.value)}
            />

            {/* Data de Geração */}
            <TextField
              label="Data de Geração"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dataGeracao}
              onChange={(e) => setDataGeracao(e.target.value)}
            />

            {/* Data de Descarte */}
            <TextField
              label="Data de Descarte"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dataDescarte}
              onChange={(e) => setDataDescarte(e.target.value)}
            />

            {/* Observação (ocupa duas colunas) */}
            <TextField
              label="Observação"
              margin="normal"
              multiline
              rows={4}
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              style={{ gridColumn: "span 2" }} // ocupa as duas colunas
            />

            {/* Botão (ocupa duas colunas e centraliza) */}
            <Box
              style={{
                gridColumn: "span 2",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "200px",
                  height: "50px",
                  backgroundColor: "#4CAF50",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#43a047" },
                }}
              >
                Salvar
              </Button>
            </Box>
          </form>
        </Box>

        {/* Dialogs */}
        <Dialog open={openAlertDialog} onClose={handleAlertOk}>
          <DialogTitle>Atenção</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para controle, anote o ID do resíduo cadastrado.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertOk}>Ok</Button>
          </DialogActions>
        </Dialog>

      
      </Box>
    </Box>
  );
};

export default ResiduoCadastro;
