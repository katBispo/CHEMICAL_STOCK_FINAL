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
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

// Componentes
import SideBar from "../components/SideBar";
import IndicadoresEquipamentos from "./componentes/IndicadoresEquipamentos";
import TabelaListaEquipamentos from "./TabelaListaEquipamentos";

// Serviços
import { getEquipamentos } from "../../services/EquipamentoService";

// Novos componentes (mockados)
import DistribuicaoProcedimento from "./componentes/DistribuicaoProcedimento";
import ContagemUsoEquipamentos from "./componentes/ContagemUsoEquipamentos";
import Top5MaisUsados from "./componentes/Top5MaisUsados";


// ================== HEADER ==================
const EquipamentosHeader = () => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mb={4}
    sx={{ ml: "120px" }}
  >
    <Typography variant="h4" component="h1" fontWeight="bold">
      Dashboard de Equipamentos
    </Typography>

    <Button
      component={Link}
      to="/analiseCadastro"
      variant="contained"
      startIcon={<FaPlus />}
      sx={{
        backgroundColor: "#4CAF50",
        color: "#fff",
        textTransform: "none",
        fontWeight: "bold",
      }}
    >
      Novo Equipamento
    </Button>
  </Box>
);


// ================== DASHBOARD PRINCIPAL ==================
const DashboardEquipamentos = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [equipamentos, setEquipamentos] = useState([]);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  // Carregar equipamentos
  useEffect(() => {
    const carregarEquipamentos = async () => {
      try {
        const response = await getEquipamentos();
        setEquipamentos(response);
      } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
      }
    };

    carregarEquipamentos();
  }, []);

  // Mock para indicadores
  const indicadores = [
    {
      titulo: "Equipamentos Ativos",
      valor: 25,
      cor: "#4CAF50",
      icon: <PlayCircleIcon sx={{ color: "#4CAF50" }} />,
    },
    {
      titulo: "Em Manutenção",
      valor: 4,
      cor: "#FFC107",
      icon: <ScheduleIcon sx={{ color: "#FFC107" }} />,
    },
    {
      titulo: "Disponíveis",
      valor: 18,
      cor: "#2196F3",
      icon: <CheckCircleIcon sx={{ color: "#2196F3" }} />,
    },
    {
      titulo: "Com Defeito",
      valor: 2,
      cor: "#F44336",
      icon: <WarningAmberIcon sx={{ color: "#F44336" }} />,
    },
  ];

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={4}
        sx={{
          backgroundColor: "#4CAF50",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Painel de Monitoramento de Equipamentos
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* Conteúdo */}
      <Fade in timeout={600}>
        <Box sx={{ bgcolor: "#f5f5f5", minWidth: "170vh", pt: 12, px: 6 }}>
          <EquipamentosHeader />

          {/* Indicadores */}
          <Box mt={2} sx={{ ml: "120px", mr: "40px" }}>
            <IndicadoresEquipamentos indicadores={indicadores} />
          </Box>

          {/* GRID PRINCIPAL */}
          <Grid container spacing={3} sx={{ mt: 4, px: 10 }}>
            
            {/* Tabela */}
            <Grid item xs={12} lg={8}>
              <Box
                flex={1}
                minWidth={300}
                mt={6}
                height="500px"
                sx={{
                  overflowY: "auto",
                  bgcolor: "#fff",
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <TabelaListaEquipamentos equipamentos={equipamentos} />
              </Box>
            </Grid>

            {/* Painel lateral (gráficos) */}
            <Grid item xs={12} lg={4} sx={{ mt: 6 }}>
              <DistribuicaoProcedimento />
              <ContagemUsoEquipamentos />
              <Top5MaisUsados />
            </Grid>

          </Grid>

        </Box>
      </Fade>
    </>
  );
};

export default DashboardEquipamentos;
