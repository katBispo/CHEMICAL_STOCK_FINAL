import React, { useState, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid, Pie, Cell, Legend, PieChart
} from "recharts";
import {
    Box, Button, Typography, Paper, AppBar, Toolbar, IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FaPlus } from "react-icons/fa";
import SideBar from "../components/SideBar";
import GraficoTiposReagente from "./graficos/GraficoTiposReagente";
import GraficoValidadeReagentes from "./graficos/GraficoValidadeReagentes";
import TabelaListaReagentes from "./tabelas/TabelaListaReagentes";

// Cabeçalho com botão
const EstoqueHeader = ({ onAdd }) => (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="text.primary"
            sx={{ ml: '120px' }}
        >
            Estoque de Reagentes
        </Typography>
        <Button
            onClick={onAdd}
            variant="contained"
            style={{ backgroundColor: '#4CAF50', color: '#fff', textTransform: 'none', fontWeight: 'bold' }}
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
        <Box
            display="flex"
            gap={3}
            mb={4}
            flexWrap="wrap"
            sx={{ ml: '120px' }} // Ajuste esse valor para mover os cards manualmente
        >
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



    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    useEffect(() => {
        const fetchReagentes = async () => {
            try {
                const response = await fetch('http://localhost:8080/reagente');
                const data = await response.json();
                setReagentes(data);
            } catch (error) {
                console.error('Erro ao buscar reagentes:', error);
            }
        };

        const fetchReagentesVencidosCount = async () => {
            try {
                const response = await fetch('http://localhost:8080/reagente/vencidos/quantidade');
                const data = await response.json();
                console.log('quantidade de vencidos: ', data);
                setVencidosCount(data);
            } catch (error) {
                console.error('Erro ao buscar quantidade de reagentes vencidos:', error);
            }
        };
        const fetchReagentesTotalControlados = async () => {
            try {
                const response = await fetch('http://localhost:8080/reagente/quantidade-controlados');
                const data = await response.json();
                console.log('quantidade de Controlados: ', data);
                setControladosCount(data);
            } catch (error) {
                console.error('Erro ao buscar quantidade de reagentes Controlados:', error);
            }
        };
        const fetchReagentesTotalFrascos = async () => {
            try {
                const response = await fetch('http://localhost:8080/reagente/total-frascos');
                const data = await response.json();
                console.log('quantidade de frascos: ', data);
                setFrascosCount(data);
            } catch (error) {
                console.error('Erro ao buscar quantidade de reagentes vencidos:', error);
            }
        };


        fetchReagentes();
        fetchReagentesVencidosCount();
        fetchReagentesTotalFrascos();
        fetchReagentesTotalControlados();


    }, []);

    const handleAdd = () => {
        alert("Abrir modal para adicionar novo reagente (futuro recurso)");
    };

    return (
        <>
            {/* Barra superior */}
            <AppBar
                position="fixed"
                sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, textAlign: 'left' }}
                    >
                        Estoque de reagentes
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Menu lateral */}
            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            {/* Conteúdo principal */}
            <Box
                sx={{
                    maxWidth: '1600px',
                    mx: 'auto',
                    p: 3,
                    bgcolor: '#f5f5f5',
                    minHeight: '100vh',
                    pt: 12 // padding-top para compensar a AppBar fixa
                }}
            >
                <EstoqueHeader onAdd={handleAdd} />
                <ResumoEstoque reagentes={reagentes} vencidosTotal={vencidosCount} frascosTotal={frascosCount} controlados={controladosCount}
                />
                <Box
                    display="flex"
                    flexWrap="wrap"
                    gap={4}
                    mb={4}
                    justifyContent="center"
                    alignItems="stretch"
                >
                    <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center" mb={4}>

                        <Box flex="1 1 400px" minWidth={300} maxWidth={600}>
                            <GraficoTiposReagente />
                        </Box>

                        <Box
                            flex={1}
                            minWidth={300}
                            mt={6}
                            height="900px"  // ⬅️ Aumente esse valor conforme necessário
                            sx={{ overflowY: 'auto' }}  // ⬅️ Para rolar caso o conteúdo passe
                        >
                            <TabelaListaReagentes reagentes={reagentes} />
                        </Box>

                    </Box>
                </Box>


                <Box
                    display="flex"
                    gap={2}
                    flexWrap="wrap"
                    mt={-70}  
                    mb={4}   
                    ml={10}
                >
                    <Box
                        flex="1 1 400px"
                        minWidth={300}
                        maxWidth={600}
                    >
                        <GraficoValidadeReagentes />
                    </Box>
                </Box>

            </Box>
        </>
    );
};

export default EstoqueReagentes;
