import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import AvisoOverlay from "./AvisoOverlayReserva.js"; 

import {
  salvarReserva,
  getNaturezasProjeto,
} from "../../services/ReservaLaboratorioService.js";
import { getEquipamentos } from "../../services/EquipamentoService";

export default function ReservaPublicPage() {
  const [mostrarAviso, setMostrarAviso] = useState(true); // <-- overlay ativado ao abrir
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [equipamentos, setEquipamentos] = useState([]);
  const [naturezas, setNaturezas] = useState([]);

  const [formData, setFormData] = useState({
    nomeSolicitante: "",
    emailSolicitante: "",
    telefoneContato: "",
    instituicao: "",
    naturezaProjeto: "",
    orientadores: "",
    analise: "",
    amostra: "",
    auxilioEquipamento: false,
    equipamento: "",
    dataInicio: "",
    dataFim: "",
    horarioUso: "",
  });

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [equipResp, naturezasResp] = await Promise.all([
          getEquipamentos(),
          getNaturezasProjeto(),
        ]);
        setEquipamentos(equipResp);
        setNaturezas(naturezasResp);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reserva = {
      ...formData,
      equipamento: { id: formData.equipamento },
    };

    try {
      await salvarReserva(reserva);
      alert("Solicitação enviada com sucesso! Aguarde aprovação por e-mail.");

      setFormData({
        nomeSolicitante: "",
        emailSolicitante: "",
        telefoneContato: "",
        instituicao: "",
        naturezaProjeto: "",
        orientadores: "",
        analise: "",
        amostra: "",
        auxilioEquipamento: false,
        equipamento: "",
        dataInicio: "",
        dataFim: "",
        horarioUso: "",
      });
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      alert("Falha ao enviar. Tente novamente.");
    }
  };

return (
  <>
    {mostrarAviso && (
      <AvisoOverlay onConfirm={() => setMostrarAviso(false)} />
    )}

    {!mostrarAviso && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Cabeçalho */}
        <AppBar position="fixed" sx={{ bgcolor: "#4CAF50" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Solicitação de Reserva de Equipamento
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Conteúdo */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              width: "850px",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              textAlign="center"
              sx={{ color: "#4CAF50" }}
            >
              Formulário de Solicitação
            </Typography>

            <Typography variant="subtitle1" textAlign="center" sx={{ mb: 4 }}>
              Preencha as informações abaixo para solicitar o uso do laboratório.
            </Typography>

            <form onSubmit={handleSubmit}>
            {/* DADOS PESSOAIS */}
            <Typography variant="h6" sx={{ mb: 2, mt: 1, color: "#333" }}>
              Dados do Solicitante
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap">
              <TextField
                label="Nome completo"
                name="nomeSolicitante"
                value={formData.nomeSolicitante}
                onChange={handleChange}
                required
                sx={{ flex: 1 }}
              />
              <TextField
                label="E-mail"
                name="emailSolicitante"
                type="email"
                value={formData.emailSolicitante}
                onChange={handleChange}
                required
                sx={{ flex: 1 }}
              />
              <TextField
                label="Telefone"
                name="telefoneContato"
                value={formData.telefoneContato}
                onChange={handleChange}
                sx={{ flex: 1 }}
              />
            </Box>

            <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
              <TextField
                label="Instituição"
                name="instituicao"
                value={formData.instituicao}
                onChange={handleChange}
                required
                sx={{ flex: 1 }}
              />
              <TextField
                select
                label="Natureza do Projeto"
                name="naturezaProjeto"
                value={formData.naturezaProjeto}
                onChange={handleChange}
                required
                sx={{ flex: 1 }}
              >
                {naturezas.map((n) => (
                  <MenuItem key={n} value={n}>
                    {n.replaceAll("_", " ")}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <TextField
              label="Orientador(es)"
              name="orientadores"
              value={formData.orientadores}
              onChange={handleChange}
              fullWidth
              sx={{ mt: 2 }}
            />

            {/* EQUIPAMENTO E DATAS */}
            <Typography variant="h6" sx={{ mb: 2, mt: 4, color: "#333" }}>
              Detalhes da Reserva
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap">
              <TextField
                select
                label="Equipamento"
                name="equipamento"
                value={formData.equipamento}
                onChange={handleChange}
                required
                sx={{ flex: 1 }}
              >
                {equipamentos.map((eq) => (
                  <MenuItem key={eq.id} value={eq.id}>
                    {eq.nome}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Data de Início"
                name="dataInicio"
                type="date"
                value={formData.dataInicio}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ flex: 1 }}
              />

              <TextField
                label="Data de Fim"
                name="dataFim"
                type="date"
                value={formData.dataFim}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ flex: 1 }}
              />

              <TextField
                label="Horário de Uso"
                name="horarioUso"
                type="time"
                value={formData.horarioUso}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ flex: 1 }}
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.auxilioEquipamento}
                  onChange={handleChange}
                  name="auxilioEquipamento"
                />
              }
              label="Necessita auxílio técnico no uso do equipamento?"
              sx={{ mt: 2 }}
            />

            {/* CAMPOS DE TEXTO LIVRE */}
            <TextField
              label="Descrição da Análise"
              name="analise"
              value={formData.analise}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              sx={{ mt: 3 }}
            />

            <TextField
              label="Descrição das Amostras"
              name="amostra"
              value={formData.amostra}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              sx={{ mt: 3 }}
            />

            {/* BOTÃO ENVIAR */}
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#4CAF50",
                  fontSize: "16px",
                  px: 4,
                  py: 1.5,
                  "&:hover": { backgroundColor: "#45a049" },
                }}
              >
                Enviar Solicitação
              </Button>
            </Box>
          </form>
          </Paper>
        </Box>

        {/* Rodapé */}
        <Box
          component="footer"
          sx={{
            textAlign: "center",
            py: 2,
            backgroundColor: "#e3f2fd",
            color: "#555",
            mt: "auto",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Laboratório de Análises Cromatográficas
            (LAC) – Todos os direitos reservados.
          </Typography>
        </Box>
      </Box>
    )}
  </>
);
}