import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WarningIcon from "@mui/icons-material/Warning";
import SecurityIcon from "@mui/icons-material/Security";
import ScheduleIcon from "@mui/icons-material/Schedule";

import { FaPlus } from "react-icons/fa";

import SideBar from "../components/SideBar";
import GraficoTiposReagente from "./graficos/GraficoTiposReagente";
import GraficoValidadeReagentes from "./graficos/GraficoValidadeReagentes";
import TabelaListaReagentes from "./tabelas/TabelaListaReagentes";

import { apiGet } from "../../services/api";

/* ================= KPI CARD ================= */
const KpiCard = ({ title, value, icon, color, subtitle }) => {
  return (
    <Card sx={{ height: "100%", borderLeft: `6px solid ${color}` }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>

            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>

            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>

          <Box sx={{ color }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );
};

/* ================= HEADER ================= */
const EstoqueHeader = () => {
  return (
    <Box
      mb={3}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
    >
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Estoque de Reagentes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Visão geral, alertas e controle de reagentes laboratoriais
        </Typography>
      </Box>

      <Button
        component={Link}
        to="/reagenteCadastro"
        variant="contained"
        startIcon={<FaPlus />}
        sx={{
          bgcolor: "#4CAF50",
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Novo Reagente
      </Button>
    </Box>
  );
};

/* ================= MAIN ================= */
export default function EstoqueReagentes() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reagentes, setReagentes] = useState([]);

  const [kpis, setKpis] = useState({
    frascos: 0,
    vencidos: 0,
    controlados: 0,
    proximos: 0,
  });

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reagentesData = await apiGet("/reagente");
        const vencidos = await apiGet("/reagente/vencidos/quantidade");
        const frascos = await apiGet("/reagente/total-frascos");
        const controlados = await apiGet("/reagente/quantidade-controlados");

        // se ainda não existir no backend, pode deixar 0 por enquanto
  const proximos = 0;


        setReagentes(reagentesData);
        setKpis({ frascos, vencidos, controlados, proximos });
      } catch (error) {
        console.error("Erro ao carregar dados do estoque:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* APP BAR */}
      <AppBar position="fixed" sx={{ bgcolor: "#4CAF50" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Estoque de Reagentes</Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* CONTEÚDO */}
      <Box
        sx={{
          p: 3,
          pt: 10,
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <EstoqueHeader />

        {/* KPIs */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Total de Frascos"
              value={kpis.frascos}
              color="#4CAF50"
              icon={<Inventory2Icon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Vencidos"
              value={kpis.vencidos}
              color="#f44336"
              icon={<WarningIcon fontSize="large" />}
              subtitle="Ação imediata"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Próx. Vencimento"
              value={kpis.proximos}
              color="#ff9800"
              icon={<ScheduleIcon fontSize="large" />}
              subtitle="Até 30 dias"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Controlados"
              value={kpis.controlados}
              color="#9c27b0"
              icon={<SecurityIcon fontSize="large" />}
            />
          </Grid>
        </Grid>

        {/* ALERTAS */}
        <Box mb={3} display="flex" gap={2} flexWrap="wrap">
          {kpis.vencidos > 0 && (
            <Chip
              color="error"
              icon={<WarningIcon />}
              label={`${kpis.vencidos} reagentes vencidos`}
            />
          )}

          {kpis.proximos > 0 && (
            <Chip
              color="warning"
              icon={<ScheduleIcon />}
              label={`${kpis.proximos} próximos do vencimento`}
            />
          )}

          {kpis.controlados > 0 && (
            <Chip
              color="secondary"
              icon={<SecurityIcon />}
              label={`${kpis.controlados} reagentes controlados`}
            />
          )}
        </Box>

        {/* GRÁFICOS */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>
                  Distribuição por Tipo de Reagente
                </Typography>
                <GraficoTiposReagente />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>
                  Validade dos Reagentes
                </Typography>
                <GraficoValidadeReagentes />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* TABELA */}
        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Lista de Reagentes
            </Typography>
            <TabelaListaReagentes reagentes={reagentes} />
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
