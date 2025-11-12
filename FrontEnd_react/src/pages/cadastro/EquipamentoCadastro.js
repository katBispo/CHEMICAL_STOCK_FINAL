import React, { useState } from "react";
import {
  Box, AppBar, Toolbar, IconButton, Typography, Button,
  TextField, MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "../components/SideBar";
import FeedbackDialog from "../components/FeedbackDialog";
import { useNavigate } from "react-router-dom";

import { criarEquipamento} from "../../services/EquipamentoService"

function EquipamentoCadastro({ onSuccess }) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const navigate = useNavigate();

  // Campos do formulário
  const [nome, setNome] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [modelo, setModelo] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");

  // Feedback
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const equipamento = {
      nome,
      fabricante,
      modelo,
      numeroSerie,
      descricao,
      status
    };

    try {
      await criarEquipamento(equipamento);
      setDialogMessage("✅ Equipamento cadastrado com sucesso!");
      setDialogOpen(true);

      if (onSuccess) onSuccess();
      else setTimeout(() => navigate("/equipamentoLista"), 1500);
    } catch (error) {
      console.error("Erro ao salvar equipamento:", error);
      setDialogMessage("❌ Erro ao salvar o equipamento no banco de dados.");
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => setDialogOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Barra superior */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#4CAF50",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cadastro de Equipamentos
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* Conteúdo principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4, ml: -15 }}>
        <Toolbar />
        <Box
          sx={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            marginLeft: "200px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Cadastrar Equipamento
          </Typography>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Nome e Fabricante */}
              <Box display="flex" gap={2}>
                <TextField
                  label="Nome do Equipamento"
                  required
                  margin="normal"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Fabricante"
                  required
                  margin="normal"
                  value={fabricante}
                  onChange={(e) => setFabricante(e.target.value)}
                  sx={{ flex: 1 }}
                />
              </Box>

              {/* Modelo e Nº de Série */}
              <Box display="flex" gap={2}>
                <TextField
                  label="Modelo"
                  required
                  margin="normal"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Número de Série"
                  required
                  margin="normal"
                  value={numeroSerie}
                  onChange={(e) => setNumeroSerie(e.target.value)}
                  sx={{ flex: 1 }}
                />
              </Box>

              {/* Status */}
              <TextField
                select
                label="Status do Equipamento"
                required
                margin="normal"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="ATIVO">Ativo</MenuItem>
                <MenuItem value="INATIVO">Inativo</MenuItem>
                <MenuItem value="EM_MANUTENCAO">Em manutenção</MenuItem>
              </TextField>

              {/* Descrição */}
              <TextField
                label="Descrição"
                margin="normal"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                multiline
                rows={4}
              />

              {/* Botão */}
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Salvar Equipamento
              </Button>
            </Box>
          </form>

          {/* Diálogo de feedback */}
          <FeedbackDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            message={dialogMessage}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default EquipamentoCadastro;
