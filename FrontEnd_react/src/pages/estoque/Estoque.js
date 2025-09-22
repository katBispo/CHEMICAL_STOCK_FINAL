import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Box, Button, Typography, Paper, AppBar, Toolbar, IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FaPlus } from "react-icons/fa";

import SideBar from "../components/SideBar";
import GraficoTiposReagente from "./graficos/GraficoTiposReagente";
import GraficoValidadeReagentes from "./graficos/GraficoValidadeReagentes";
import TabelaListaReagentes from "./tabelas/TabelaListaReagentes";

import { apiGet } from "../../services/api";

// Cabeçalho
const EstoqueHeader = ({ onAdd }) => (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary" sx={{ ml: '120px' }}>
            Estoque de Reagentes
        </Typography>
        <Button
            component={Link}
            to="/reagenteCadastro"
            variant="contained"
            style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
            }}
            startIcon={<FaPlus />}
        >
            Novo Reagente
        </Button>
    </Box>
);

// Cartões de resumo
const ResumoEstoque = ({ reagentes, vencidosTotal, frascosTotal, controlados }) => {
    const total = reagentes.reduce((sum, r) => sum + r.quantidadeTotal, 0);
    const vencidos = vencidosTotal !== undefined ? vencidosTotal : reagentes.filter(r => new Date(r.validade) < new Date()).length;

    return (
        <Box display="flex" gap={3} mb={4} flexWrap="wrap" sx={{ ml: '120px' }}>
            <Paper elevation={3} sx={{ p: 3, flex: '0 1 200px', borderLeft: '5px solid #4CAF50' }}>
                <Typography variant="h6" color="success.main">Total de Frascos</Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>{frascosTotal}</Typography>
            </Paper>
            <Paper elevation={3} sx={{ p: 3, flex: '0 1 200px', borderLeft: '5px solid #f44336' }}>
                <Typography variant="h6" color="error">Vencidos</Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>{vencidos}</Typography>
            </Paper>
            <Paper elevation={3} sx={{ p: 3, flex: '0 1 200px', borderLeft: '5px solid #f44336' }}>
                <Typography variant="h6" color="error">Controlados</Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>{controlados}</Typography>
            </Paper>
        </Box>
    );
};

// Componente principal
const EstoqueReagentes = () => {
    const [reagentes, setReagentes] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [vencidosCount, setVencidosCount] = useState(0);
    const [frascosCount, setFrascosCount] = useState(0);
    const [controladosCount, setControladosCount] = useState(0);

    const toggleDrawer = () => setDrawerOpen(prev => !prev);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reagentesData = await apiGet("/reagente");
                const vencidos = await apiGet("/reagente/vencidos/quantidade");
                const frascos = await apiGet("/reagente/total-frascos");
                const controlados = await apiGet("/reagente/quantidade-controlados");

                setReagentes(reagentesData);
                setVencidosCount(vencidos);
                setFrascosCount(frascos);
                setControladosCount(controlados);
            } catch (error) {
                console.error("Erro ao carregar dados do estoque:", error.message);
            }
        };

        fetchData();
    }, []);

    const handleAdd = () => {
        alert("Abrir modal para adicionar novo reagente (futuro recurso)");
    };

    return (
        <>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        Estoque de reagentes
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Box sx={{ maxWidth: '1600px', mx: 'auto', p: 3, bgcolor: '#f5f5f5', minHeight: '100vh', pt: 12 }}>
                <EstoqueHeader onAdd={handleAdd} />
                <ResumoEstoque
                    reagentes={reagentes}
                    vencidosTotal={vencidosCount}
                    frascosTotal={frascosCount}
                    controlados={controladosCount}
                />

                <Box display="flex" flexWrap="wrap" gap={4} mb={4} justifyContent="center" alignItems="stretch">
                    <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center" mb={4}>
                        <Box flex="1 1 400px" minWidth={300} maxWidth={600}>
                            <GraficoTiposReagente />
                        </Box>

                        <Box flex={1} minWidth={300} mt={6} height="900px" sx={{ overflowY: 'auto' }}>
                            <TabelaListaReagentes reagentes={reagentes} />
                        </Box>
                    </Box>
                </Box>

                <Box display="flex" gap={2} flexWrap="wrap" mt={-70} mb={4} ml={10}>
                    <Box flex="1 1 400px" minWidth={300} maxWidth={600}>
                        <GraficoValidadeReagentes />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default EstoqueReagentes;
