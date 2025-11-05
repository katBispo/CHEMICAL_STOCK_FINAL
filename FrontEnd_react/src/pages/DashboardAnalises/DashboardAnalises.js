// src/pages/DashboardAnalises/DashboardAnalises.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Fade,
  Button,
  Modal,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import SideBar from "../components/SideBar";
import TabelaListaAnalises from "./TabelaListaAnalises";
import AnalisePendenteCardContainer from "./components/AnalisePendenteCardContainer";
import { getAnalises } from "../../services/AnaliseService";

// --- Componente de cards de indicadores ---
const IndicadoresCards = ({ indicadores }) => (
  <Grid container spacing={3} mb={5}>
    {indicadores.map((ind, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Fade in timeout={300 + index * 150}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              height: "100%",
              borderRadius: 3,
              borderLeft: `6px solid ${ind.cor}`,
              bgcolor: "background.paper",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 8,
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5} mb={1}>
              <Box
                sx={{
                  bgcolor: ind.cor + "22",
                  p: 1,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {ind.icon}
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                {ind.titulo}
              </Typography>
            </Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              color={ind.cor}
              sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
            >
              {ind.valor}
            </Typography>
          </Paper>
        </Fade>
      </Grid>
    ))}
  </Grid>
);

// --- Cabeçalho com botão de nova análise ---
const AnalisesHeader = () => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} sx={{ ml: "120px" }}>
    <Typography
      variant="h4"
      component="h1"
      fontWeight="bold"
      color="text.primary"
    >
      Dashboard de Análises
    </Typography>

    <Button
      component={Link}
      to="/analiseCadastro"
      variant="contained"
      style={{
        backgroundColor: "#4CAF50",
        color: "#fff",
        textTransform: "none",
        fontWeight: "bold",
      }}
      startIcon={<FaPlus />}
    >
      Nova Análise
    </Button>
  </Box>
);

const DashboardAnalises = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [analises, setAnalises] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [openFullTable, setOpenFullTable] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  // 🔹 Busca as análises do backend
  useEffect(() => {
    const carregarAnalises = async () => {
      try {
        const response = await getAnalises();
        setAnalises(response);
      } catch (error) {
        console.error("Erro ao buscar análises:", error);
      }
    };

    carregarAnalises();
  }, []);

  // 🔹 Mock para card lateral
  const analisesPendentesMock = [
    { id: 1, nome: "Análise de Água", qtdPendentes: 3 },
    { id: 2, nome: "Análise de Solo", qtdPendentes: 1 },
    { id: 3, nome: "Análise de pH", qtdPendentes: 2 },
    { id: 4, nome: "Análise de Resíduos", qtdPendentes: 5 },
  ];

  // 🔹 Indicadores
  const indicadores = [
    {
      titulo: "Análises em andamento",
      valor: 12,
      cor: "#4CAF50",
      icon: <PlayCircleIcon sx={{ color: "#4CAF50" }} />,
    },
    {
      titulo: "Aguardando resultado",
      valor: 5,
      cor: "#FFC107",
      icon: <ScheduleIcon sx={{ color: "#FFC107" }} />,
    },
    {
      titulo: "Finalizadas",
      valor: 40,
      cor: "#2196F3",
      icon: <CheckCircleIcon sx={{ color: "#2196F3" }} />,
    },
    {
      titulo: "Com atraso",
      valor: 3,
      cor: "#F44336",
      icon: <WarningAmberIcon sx={{ color: "#F44336" }} />,
    },
  ];

  return (
    <>
      {/* APPBAR */}
      <AppBar
        position="fixed"
        elevation={4}
        sx={{
          bgcolor: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Painel de Monitoramento de Análises
          </Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* CONTEÚDO PRINCIPAL */}
      <Fade in timeout={600}>
        <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", pt: 12 }}>
          <AnalisesHeader />

          {/* Cards de indicadores */}
          <Box mt={2} sx={{ ml: "120px", mr: "40px" }}>
            <IndicadoresCards indicadores={indicadores} />
          </Box>

          {/* GRID PRINCIPAL */}
          <Grid container spacing={3} sx={{ mt: 4, px: 10 }}>
            <Grid item xs={12} lg={8}>
              {/* 🔹 Tabela no mesmo design do original */}
              <Box
                flex={1}
                minWidth={300}
                mt={6}
                height="900px"
                sx={{
                  overflowY: "auto",
                  bgcolor: "#fff",
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <TabelaListaAnalises analises={analises} />
              </Box>
            </Grid>

            <Grid item xs={12} lg={4}>
              {/* 🔹 Card lateral */}
              <AnalisePendenteCardContainer analisesPendentes={analisesPendentesMock} />
            </Grid>
          </Grid>

          {/* OVERLAY "VER MAIS" */}
          {showOverlay && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(5px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999,
              }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  maxWidth: 500,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" mb={2}>
                  Visualização rápida da lista de análises
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#4CAF50",
                    "&:hover": { bgcolor: "#45A049" },
                    borderRadius: 10,
                    px: 4,
                    py: 1,
                    fontSize: "16px",
                  }}
                  onClick={() => {
                    setShowOverlay(false);
                    setOpenFullTable(true);
                  }}
                >
                  Ver mais
                </Button>
              </Paper>
            </Box>
          )}

          {/* MODAL TABELA COMPLETA */}
          <Modal
            open={openFullTable}
            onClose={() => setOpenFullTable(false)}
            aria-labelledby="modal-tabela-analises"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
            }}
          >
            <Paper
              elevation={6}
              sx={{
                width: "95%",
                maxHeight: "90vh",
                overflow: "auto",
                borderRadius: 4,
                p: 4,
              }}
            >
              <TabelaListaAnalises analises={analises} />
              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenFullTable(false)}
                >
                  Fechar
                </Button>
              </Box>
            </Paper>
          </Modal>
        </Box>
      </Fade>
    </>
  );
};

export default DashboardAnalises;
