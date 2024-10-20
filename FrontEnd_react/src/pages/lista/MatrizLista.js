
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
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





const AnalysisTable = () => {

    const [matrizes, setMatrizes] = useState([]);

    useEffect(() => {
        // Função para buscar as matrizes do backend
        const fetchMatrizes = async () => {
            try {
                const response = await fetch('http://localhost:8080/cadastroMatrizes'); // Certifique-se de que a URL está correta
                const data = await response.json();
                setMatrizes(data);
            } catch (error) {
                console.error('Erro ao buscar matrizes:', error);
            }
        };

        fetchMatrizes();
    }, []);



    const [drawerOpen, setDrawerOpen] = useState(false); // Alterado para false, para que comece fechado
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();


    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev); // Alterna o estado da sidebar
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
                        Lista de Matrizes
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
                        Lista de Matrizes
                    </Typography>
                </Box>
                {/* Botões de Ação */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button
                        variant="contained"
                        color="success"
                        style={{ backgroundColor: '#4CAF50', color: '#fff', textTransform: 'none', fontWeight: 'bold' }}
                        startIcon={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>}
                        onClick={() => navigate('/matrizCadastro')} // Adicione esta linha para redirecionar
                    >
                        Cadastrar Matriz
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
              
              
                <Box display="flex" justifyContent="space-around" mt={2}>
                    <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#4CAF50' }}>
                                    {/* Cabeçalhos da tabela */}
                                    {['ID', 'Nome', 'Ações'].map((header) => (
                                        <TableCell key={header} style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {matrizes.map((matriz) => (
                                    <TableRow
                                        key={matriz.id}
                                        style={{ backgroundColor: '#fff', transition: 'background-color 0.3s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                    >
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{matriz.id}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{matriz.nomeMatriz}</TableCell>
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

export default AnalysisTable;
