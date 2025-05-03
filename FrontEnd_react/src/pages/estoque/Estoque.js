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

// Cabeçalho com botão
const EstoqueHeader = ({ onAdd }) => (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
            📦 Estoque de Reagentes
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
const ResumoEstoque = ({ reagentes }) => {
    const total = reagentes.reduce((sum, r) => sum + r.quantidade, 0);
    const vencidos = reagentes.filter(r => new Date(r.validade) < new Date()).length;

    return (
        <Box display="flex" gap={4} mb={4} flexWrap="wrap">
            <Paper elevation={3} sx={{ p: 3, flex: 1, minWidth: 250, borderLeft: '5px solid #2196F3' }}>
                <Typography variant="h6" color="primary">Total em Estoque</Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>{total}</Typography>
            </Paper>
            <Paper elevation={3} sx={{ p: 3, flex: 1, minWidth: 250, borderLeft: '5px solid #f44336' }}>
                <Typography variant="h6" color="error">Reagentes Vencidos</Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>{vencidos}</Typography>
            </Paper>
        </Box>
    );
};

// Gráfico de pizza
const GraficoPizza = ({ reagentes }) => {
    const data = reagentes.map(r => ({
        nome: r.nome,
        quantidade: r.quantidade,
    }));

    const cores = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#f44336'];

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={2} color="text.secondary">
                🧪 Distribuição por Quantidade
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="quantidade"
                        nameKey="nome"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        fill="#8884d8"
                        label
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
};

// Gráfico de barras
const GraficoValidade = ({ reagentes }) => {
    const data = reagentes.map(r => ({
        nome: r.nome,
        validade: new Date(r.validade).getFullYear()
    }));

    const contagem = {};
    data.forEach(item => {
        contagem[item.validade] = (contagem[item.validade] || 0) + 1;
    });

    const graficoData = Object.entries(contagem).map(([ano, qtd]) => ({
        ano,
        reagentes: qtd,
    }));

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={2} color="text.secondary">
                📊 Reagentes por Ano de Validade
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={graficoData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ano" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="reagentes" fill="#3b82f6" radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};

// Tabela
const TabelaReagentes = ({ reagentes }) => (
    <Paper elevation={3} sx={{ overflowX: 'auto', borderRadius: '10px' }}>
        <table className="min-w-full">
            <thead style={{ backgroundColor: '#4CAF50' }}>
                <tr>
                    {['Nome', 'Quantidade', 'Validade', 'Lote'].map((header) => (
                        <th
                            key={header}
                            style={{ color: '#fff', padding: '12px 24px', textAlign: 'left', fontWeight: 'bold' }}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {reagentes.map((r) => (
                    <tr
                        key={r.id}
                        style={{ transition: 'background-color 0.3s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                    >
                        <td style={{ padding: '12px 24px' }}>{r.nome}</td>
                        <td style={{ padding: '12px 24px' }}>{r.quantidadeTotal}</td>
                        <td style={{ padding: '12px 24px' }}>{r.dataValidade}</td>
                        <td style={{ padding: '12px 24px' }}>{r.lote}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Paper>
);

// Componente principal
const EstoqueReagentes = () => {
    const [reagentes, setReagentes] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

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

        fetchReagentes();
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
                    maxWidth: '1200px',
                    mx: 'auto',
                    p: 3,
                    bgcolor: '#f5f5f5',
                    minHeight: '100vh',
                    pt: 12 // padding-top para compensar a AppBar fixa
                }}
            >
                <EstoqueHeader onAdd={handleAdd} />
                <ResumoEstoque reagentes={reagentes} />

                <Box display="flex" gap={4} flexWrap="wrap" mb={4}>
                    <Box flex={1} minWidth={300}>
                        <GraficoPizza reagentes={reagentes} />
                    </Box>
                    <Box flex={1} minWidth={300}>
                        <GraficoValidade reagentes={reagentes} />
                    </Box>
                </Box>

                <TabelaReagentes reagentes={reagentes} />
            </Box>
        </>
    );
};

export default EstoqueReagentes;
