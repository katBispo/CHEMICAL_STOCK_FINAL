import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import ProcedimentoDetailOverlay from '../components/procedimentosListaIcons/ProcedimentoDetailOverlay';
import ProcedimentoEditOverlay from '../components/procedimentosListaIcons/ProcedimentoEditOverlay';
import ProcedimentoExcluirOverlay from '../components/procedimentosListaIcons/ProcedimentoExcluirOverlay';

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

const ProcedimentoLista = () => {
    const [procedimento, setProcedimento] = useState([]);
    const [openDeleteOverlay, setOpenDeleteOverlay] = useState(false);
    const [selectedProcedimento, setSelectedProcedimento] = useState(null);
    const [editOverlayOpen, setEditOverlayOpen] = useState(false);
    const [procedimentoToEdit, setProcedimentoToEdit] = useState(null);
    const [open, setOpen] = useState(false);
    
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    const handleOpenDeleteOverlay = (procedimento) => {
        setSelectedProcedimento(procedimento);
        setOpenDeleteOverlay(true);
    };

    const handleCloseDeleteOverlay = () => {
        setOpenDeleteOverlay(false);
        setSelectedProcedimento(null);
    };

    const handleDeleteProcedimento = async (id) => {
        const response = await fetch(`http://localhost:8080/procedimento/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Procedimento excluído com sucesso');
            setProcedimento(prev => prev.filter(p => p.id !== id));
        } else {
            console.error('Erro ao excluir o Procedimento');
        }

        handleCloseDeleteOverlay();
    };

    const handleEditClick = (procedimento) => {
        setProcedimentoToEdit(procedimento);
        setEditOverlayOpen(true);
    };

    const handleSave = (updatedProcedimento) => {
        console.log("Procedimento salvo:", updatedProcedimento);
        setEditOverlayOpen(false);
        // Aqui você pode atualizar a lista de procedimentos com os novos dados
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchProcedimentos = async () => {
            try {
                const response = await fetch('http://localhost:8080/procedimento');
                const data = await response.json();
                setProcedimento(data);
            } catch (error) {
                console.error('Erro ao buscar procedimentos:', error);
            }
        };

        fetchProcedimentos();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        Lista de Procedimentos
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
                <Toolbar />

                <Box textAlign="center" mt={2} mb={2}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Lista de Procedimentos
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button
                        variant="contained"
                        color="success"
                        style={{ backgroundColor: '#4CAF50', color: '#fff', textTransform: 'none', fontWeight: 'bold' }}
                        startIcon={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>}
                        onClick={() => navigate('/procedimentoCadastro')}
                    >
                        Cadastrar Procedimento
                    </Button>
                </Box>

                <Box display="flex" justifyContent="space-around" mt={2}>
                    <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#4CAF50' }}>
                                    {['Nome', 'Data Cadastro', 'Ações'].map((header) => (
                                        <TableCell key={header} style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {procedimento.map((procedimento) => (
                                    <TableRow
                                        key={procedimento.id}
                                        style={{ backgroundColor: '#fff', transition: 'background-color 0.3s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                    >
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{procedimento.nomeProcedimento}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{procedimento.dataCadastro}</TableCell>
                                        <TableCell style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                            <IconButton onClick={() => { handleOpen(); setSelectedProcedimento(procedimento); }}>
                                                <FaEye style={{ color: '#666', fontSize: '18px' }} />
                                            </IconButton>
                                            <IconButton onClick={() => { handleEditClick(procedimento); }}>
                                                <FaEdit style={{ color: '#4CAF50', fontSize: '18px' }} />
                                            </IconButton>
                                            <IconButton onClick={() => handleOpenDeleteOverlay(procedimento)}>
                                                <FaTrashAlt style={{ color: '#e74c3c', fontSize: '18px' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {selectedProcedimento && (
                                    <ProcedimentoDetailOverlay
                                        open={open}
                                        onClose={handleClose}
                                        procedimento={selectedProcedimento}
                                    />
                                )}

                                <ProcedimentoEditOverlay
                                    open={editOverlayOpen}
                                    onClose={() => setEditOverlayOpen(false)}
                                    procedimento={procedimentoToEdit}
                                    onSave={handleSave}
                                />

                                {selectedProcedimento && (
                                    <ProcedimentoExcluirOverlay
                                        open={openDeleteOverlay}
                                        onClose={handleCloseDeleteOverlay}
                                        onDelete={handleDeleteProcedimento}
                                        procedimento={selectedProcedimento}
                                    />
                                )}
                                
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default ProcedimentoLista;
