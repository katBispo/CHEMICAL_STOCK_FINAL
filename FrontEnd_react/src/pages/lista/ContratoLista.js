
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import FilterOverlay from '../components/FilterOverlay';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import ContratoDetailOverlay from '../components/contratoListaIcons/ContratoDetailOverlay';
import ContratoEditOverlay from '../components/contratoListaIcons/ContratoEditOverlay';
import ContratoExcluirOverlay from '../components/contratoListaIcons/ContratoExcluirOverlay';
import { getContratos, deleteContrato } from '../../services/contratoService.js';



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

    const [contratos, setContratos] = useState([]);
    const [contratoToEdit, setContratoToEdit] = useState(null);
    const [editOverlayOpen, setEditOverlayOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();
    const [selectedContratos, setSelectedContratos] = useState(null);
    const [openDeleteOverlay, setOpenDeleteOverlay] = useState(false);
    const [selectedContrato, setSelectedContrato] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleOpenDeleteOverlay = (contratos) => {
        setSelectedContrato(contratos);
        setOpenDeleteOverlay(true);
    };

    const handleCloseDeleteOverlay = () => {
        setOpenDeleteOverlay(false);
        setSelectedContrato(null);
    };

    const fetchContratos = async () => {
        try {
            const data = await getContratos();
            setContratos(data);
        } catch (error) {
            console.error('Erro ao buscar contratos:', error);
        }
    };

    useEffect(() => {
        fetchContratos();
    }, []);

    const handleDeleteContrato = async (id) => {
        try {
            await deleteContrato(id);
            console.log('Contrato excluído com sucesso!');
            fetchContratos();
        } catch (error) {
            console.error('Erro ao excluir contrato:', error);
        } finally {
            handleCloseDeleteOverlay();
        }
    };


    const handleEditClick = (contrato) => {
        setContratoToEdit(contrato);
        setEditOverlayOpen(true);
    };

    const handleSave = (updatedContratos) => {
        console.log("contrato salvo:", updatedContratos);
        setEditOverlayOpen(false);
    };





    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };


    const handleCancelFilter = () => {
        setShowFilter(false);
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'ATIVO':
                return { backgroundColor: 'green', color: '#fff' };
            case 'CANCELADO':
                return { backgroundColor: 'yellow', color: '#000' };
            case 'PENDENTE':
                return { backgroundColor: 'red', color: '#fff' };
            default:
                return {};
        }
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
                        Lista de Contratos
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
                <Toolbar />

                {/* Título da Página */}
                <Box textAlign="center" mt={2} mb={2}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Lista de Contratos
                    </Typography>
                </Box>
                {/* Botões de Ação */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button
                        variant="contained"
                        color="success"
                        style={{ backgroundColor: '#4CAF50', color: '#fff', textTransform: 'none', fontWeight: 'bold' }}
                        startIcon={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>}
                        onClick={() => navigate('/contratoCadastro')}
                    >
                        Cadastrar Contrato
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
                            onClick={toggleDrawer}
                        >
                            Filtro
                        </Button>
                    </Box>
                </Box>



                <Box display="flex" justifyContent="space-around" mt={2}>

                    {/* Tabela de Contratos */}
                    <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#4CAF50' }}>
                                    {['Nome Contrato', 'Número Contrato', 'Quantidade de Análises', 'Data de Entrega', 'Nome Cliente', 'Status', 'Ações'].map((header) => (
                                        <TableCell key={header} style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contratos.map((contrato) => (
                                    <TableRow
                                        key={contrato.id}
                                        style={{ backgroundColor: '#fff', transition: 'background-color 0.3s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                    >
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{contrato.nomeContrato}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{contrato.numeroContrato}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{contrato.quantidadeAnalises}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{new Date(contrato.dataEntrega).toLocaleDateString()}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{contrato.cliente ? contrato.cliente.nome : ''}</TableCell>

                                        <TableCell>
                                            <Box
                                                sx={{
                                                    ...getStatusColor(contrato.statusContrato),
                                                    padding: '5px',
                                                    borderRadius: '15px',
                                                    textAlign: 'center',
                                                    fontSize: '14px',
                                                    width: '100px',
                                                    margin: '0 auto',
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {contrato.statusContrato}
                                            </Box>
                                        </TableCell>
                                        <TableCell style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                            <IconButton
                                                onClick={() => {
                                                    console.log("Botão clicado, contrato selecionado:", contrato);
                                                    handleOpen();
                                                    setSelectedContrato(contrato);
                                                }}
                                            >
                                                <FaEye style={{ color: '#666', fontSize: '18px' }} />
                                            </IconButton>

                                            <IconButton onClick={() => handleEditClick(contrato)}>
                                                <FaEdit style={{ color: '#666', fontSize: '18px' }} />
                                            </IconButton>

                                            <IconButton onClick={() => handleOpenDeleteOverlay(contratos)}>
                                                <FaTrashAlt style={{ color: '#e74c3c', fontSize: '18px' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {selectedContrato && (
                                    <ContratoDetailOverlay
                                        open={open}
                                        onClose={handleClose}
                                        contratos={selectedContrato}
                                    />
                                )}

                                {contratoToEdit && (
                                    <ContratoEditOverlay
                                        open={editOverlayOpen}
                                        onClose={() => setEditOverlayOpen(false)}
                                        contratos={contratoToEdit}
                                        onSave={handleSave}
                                    />
                                )}


                                {selectedContrato && (
                                    <ContratoEditOverlay
                                        open={openDeleteOverlay}
                                        onClose={handleCloseDeleteOverlay}
                                        onDelete={handleDeleteContrato}
                                        contratos={selectedContrato}
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

export default AnalysisTable;
