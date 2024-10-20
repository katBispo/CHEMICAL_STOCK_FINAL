import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar'; 

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Paper,
} from '@mui/material';

const ClienteTable = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        // Função para buscar os clientes do backend
        const fetchClientes = async () => {
            try {
                const response = await fetch('http://localhost:8080/cliente'); // Certifique-se de que a URL está correta
                const data = await response.json();
                setClientes(data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        fetchClientes();
    }, []);

    const [drawerOpen, setDrawerOpen] = useState(false); 
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev); 
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        Lista de Clientes
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
                <Toolbar />

                <Box textAlign="center" mt={2} mb={2}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Lista de Clientes
                    </Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button
                        variant="contained"
                        color="success"
                        style={{ backgroundColor: '#4CAF50', color: '#fff', textTransform: 'none', fontWeight: 'bold' }}
                        startIcon={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>}
                        onClick={() => navigate('/clienteCadastro')}
                    >
                        Cadastrar Cliente
                    </Button>
                </Box>

                <Box display="flex" justifyContent="space-around" mt={2}>
                    <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#4CAF50' }}>
                                    {/* Cabeçalhos da tabela */}
                                    {['ID', 'Nome', 'Email', 'CNPJ', 'Telefone', 'Ações'].map((header) => (
                                        <TableCell key={header} style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clientes.map((cliente) => (
                                    <TableRow
                                        key={cliente.id}
                                        style={{ backgroundColor: '#fff', transition: 'background-color 0.3s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                    >
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{cliente.id}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{cliente.nome}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{cliente.email}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{cliente.CNPJ}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{cliente.telefone}</TableCell>
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

export default ClienteTable;
