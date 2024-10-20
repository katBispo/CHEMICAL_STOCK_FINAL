import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import FilterOverlay from '../components/FilterOverlay';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar'; // Importe o novo componente


import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Drawer,
    Typography,
    Pagination,
    Paper,
    Box,
    AppBar,
    Toolbar,
    IconButton,
} from '@mui/material';

const data = [
    {
        id: '#20462',
        name: 'Ácido Sulfúrico',
        startDate: '13/05/2022',
        endDate: '13/05/2022',
        contract: 'Contrato A',
        procedure: 'Procedimento B',
        matrix: 'Ácido',
    },
];

const analises = [
    { id: 1, nome: 'Ácido Sulfúrico', data: '12/12/2025', cliente: 'Cliente A', matriz: 'Ácido', analito: 'Sulfúrico', qtdAmostras: '5', status: 'concluida' },
    { id: 2, nome: 'Hidróxido de Sódio', data: '10/11/2024', cliente: 'Cliente B', matriz: 'Base', analito: 'Sódio', qtdAmostras: '3', status: 'atrasada' },
    { id: 3, nome: 'Nitrato de Potássio', data: '01/06/2024', cliente: 'Cliente C', matriz: 'Sal', analito: 'Potássio', qtdAmostras: '2', status: 'em andamento' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'concluida':
            return { backgroundColor: 'green', color: '#fff' };
        case 'em andamento':
            return { backgroundColor: 'yellow', color: '#000' };
        case 'atrasada':
            return { backgroundColor: 'red', color: '#fff' };
        default:
            return {};
    }
};



const ReagenteLista = () => {
    const [drawerOpen, setDrawerOpen] = useState(false); // Alterado para false, para que comece fechado
    const [showFilter, setShowFilter] = useState(false);
    const [analisesFiltradas, setAnalisesFiltradas] = useState(analises);
    const navigate = useNavigate();


    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev); // Alterna o estado da sidebar
    };

    const handleApplyFilter = (filters) => {
        const { nome, matriz, analito } = filters;

        const filtered = analises.filter((analise) =>
            (!nome || analise.nome.toLowerCase().includes(nome.toLowerCase())) &&
            (!matriz || analise.matriz.toLowerCase().includes(matriz.toLowerCase())) &&
            (!analito || analise.analito.toLowerCase().includes(analito.toLowerCase()))
        );

        setAnalisesFiltradas(filtered);
        setShowFilter(false);
    };

    const handleCancelFilter = () => {
        setShowFilter(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
                        Lista de Clientes
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar que agora usa o estado drawerOpen para controlar a visibilidade */}
            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
                <Toolbar />

                {/* Título da Página */}
                <Box textAlign="center" mt={2} mb={2}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Lista de Clientes
                    </Typography>
                </Box>
                {/* Botões de Ação */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button
                        variant="contained"
                        color="success"
                        style={{ backgroundColor: '#4CAF50', color: '#fff', textTransform: 'none', fontWeight: 'bold' }}
                        startIcon={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>}
                        onClick={() => navigate('/analiseCadastro')} // Adicione esta linha para redirecionar
                    >
                        Cadastrar Cliente
                    </Button>

                    <Box display="flex" gap={2}>
                        <Button
                            variant="outlined"
                            style={{ color: '#4CAF50', borderColor: '#4CAF50', textTransform: 'none', fontWeight: 'bold' }}
                        >
                            Gerar Relatório
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            style={{ backgroundColor: '#4CAF50', color: '#fff', textTransform: 'none', fontWeight: 'bold' }}
                            onClick={toggleDrawer} // Chama a função para alternar a sidebar
                        >
                            Filtro
                        </Button>
                    </Box>
                </Box>

                {/* Drawer para o filtro */}
                <Drawer anchor="right" open={showFilter} onClose={() => setShowFilter(false)}>
                    <FilterOverlay onApply={handleApplyFilter} onCancel={handleCancelFilter} />
                </Drawer>
                <Box display="flex" justifyContent="space-around" mt={2}>
                    {/* Tabela de Análises */}

                    <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#4CAF50' }}> {/* Cabeçalho com cor verde mais elegante */}
                                    {['Nome', 'Data', 'Cliente', 'Matriz', 'Analito', 'Quantidade de Amostras', 'Status', 'Ações'].map((header) => (
                                        <TableCell key={header} style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {analisesFiltradas.map((analise) => ( // Atualiza para usar analisesFiltradas
                                    <TableRow
                                        key={analise.id}
                                        style={{ backgroundColor: '#fff', transition: 'background-color 0.3s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'} // Efeito hover suave
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                    >
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{analise.nome}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{analise.data}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{analise.cliente}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{analise.matriz}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{analise.analito}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center', paddingLeft: '30px' }}>{analise.qtdAmostras}</TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    ...getStatusColor(analise.status),
                                                    padding: '5px',
                                                    borderRadius: '15px',
                                                    textAlign: 'center',
                                                    fontSize: '14px',
                                                    width: '100px',
                                                    margin: '0 auto', // Centraliza o box de status
                                                    color: '#fff', // Texto branco no status
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {analise.status}
                                            </Box>
                                        </TableCell>
                                        <TableCell style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                            <IconButton>
                                                <FaEye style={{ color: '#666', fontSize: '18px' }} />
                                            </IconButton>
                                            <IconButton>
                                                <FaEdit style={{ color: '#4CAF50', fontSize: '18px' }} />
                                            </IconButton>
                                            <IconButton>
                                                <FaTrashAlt style={{ color: '#e74c3c', fontSize: '18px' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default ReagenteLista;
