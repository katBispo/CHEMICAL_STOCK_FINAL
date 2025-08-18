import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import AnaliseDetailOverlay from '../components/analiseListaIcons/AnaliseDetailOverlay';
import AnaliseEditOverlay from '../components/analiseListaIcons/AnaliseEditOverlay';
import AnaliseExcluirOverlay from '../components/analiseListaIcons/AnaliseExcluirOverlay';




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

const AnaliseLista = () => {
    const [analise, setAnalise] = useState([]);

    const [openDeleteOverlay, setOpenDeleteOverlay] = useState(false);
    const [selectedAnalise, setSelectedAnalise] = useState(null);

    const handleOpenDeleteOverlay = (analise) => {
        setSelectedAnalise(analise);
        setOpenDeleteOverlay(true);
    };

    const handleCloseDeleteOverlay = () => {
        setOpenDeleteOverlay(false);
        setSelectedAnalise(null);
    };

    const handleDeleteAnalise = async (id) => {
        const response = await fetch(`http://localhost:8080/analise/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Análise excluída com sucesso');

        } else {
            console.error('Erro ao excluir a análise');
        }

        handleCloseDeleteOverlay();
    };


    const [open, setOpen] = useState(false);

    const [editOverlayOpen, setEditOverlayOpen] = useState(false);
    const [analiseToEdit, setAnaliseToEdit] = useState(null);

    //  abrir o overlay de edição com a análise selecionada
    const handleEditClick = (analise) => {
        setAnaliseToEdit(analise);
        setEditOverlayOpen(true);
    };
    const handleSave = (updatedAnalise) => {
        console.log("Análise salva:", updatedAnalise);
        setEditOverlayOpen(false);
    };


    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);



    const fetchAnalises = async () => {
        try {
            const response = await fetch('http://localhost:8080/analise');
            if (!response.ok) {
                throw new Error(`Erro ao buscar análises: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setAnalise(data);
        } catch (error) {
            console.error('Erro ao conectar ao backend:', error.message);
        }
    };

    useEffect(() => {
        fetchAnalises();
    }, []);



    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };


    const getStatusColor = (status) => {
        switch (status) {
            case 'CONCLUIDA':
                return { backgroundColor: 'green', color: '#fff' };
            case 'EM_ANDAMENTO':
                return { backgroundColor: 'yellow', color: '#000' };
            case 'ATRASADA':
                return { backgroundColor: 'red', color: '#fff' };
            default:
                return { backgroundColor: 'gray', color: '#fff' }; // Cor padrão para status desconhecido
        }
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        Lista de Análises
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
                <Toolbar />

                <Box textAlign="center" mt={2} mb={2}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Lista de Análises
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button
                        variant="contained"
                        color="success"
                        style={{ backgroundColor: '#4CAF50', color: '#fff', textTransform: 'none', fontWeight: 'bold' }}
                        startIcon={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>}
                        onClick={() => navigate('/analiseCadastro')}
                    >
                        Cadastrar Análise
                    </Button>

                    <Button
                        variant="contained"
                        color="success"
                        style={{ backgroundColor: '#4CAF50', color: '#fff', textTransform: 'none', fontWeight: 'bold' }}
                        startIcon={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>}
                        onClick={() => navigate('/analiseCadastro')}
                    >
                        Gerar
                    </Button>
                </Box>

                <Box display="flex" justifyContent="space-around" mt={2}>
                    <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#4CAF50' }}>
                                    {['Nome', 'Contrato', 'Matriz', 'Quantidade de Amostras', 'Prazo Final', 'status', 'Ações'].map((header) => (
                                        <TableCell key={header} style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {analise.map((analise) => (
                                    <TableRow
                                        key={analise.id}
                                        style={{ backgroundColor: '#fff', transition: 'background-color 0.3s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                    >
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{analise.nome}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{analise.contrato ? analise.contrato.nomeContrato : ''}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{analise.matriz ? analise.matriz.nomeMatriz : ''}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{analise.quantidadeAmostras}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{analise.prazoFinalizacao}</TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    ...getStatusColor(analise.statusAnalise),
                                                    padding: '5px',
                                                    borderRadius: '15px',
                                                    textAlign: 'center',
                                                    fontSize: '14px',
                                                    width: '150px',
                                                    margin: '0 auto',
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {analise.statusAnalise}
                                            </Box>
                                        </TableCell>

                                        <TableCell style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                            <IconButton onClick={() => { handleOpen(); setSelectedAnalise(analise); }}>
                                                <FaEye style={{ color: '#666', fontSize: '18px' }} />
                                            </IconButton>
                                            <IconButton onClick={() => { handleEditClick(analise); }}>
                                                <FaEdit style={{ color: '#4CAF50', fontSize: '18px' }} />
                                            </IconButton>
                                            <IconButton onClick={() => handleOpenDeleteOverlay(analise)}>
                                                <FaTrashAlt style={{ color: '#e74c3c', fontSize: '18px' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {selectedAnalise && (
                                    <AnaliseDetailOverlay
                                        open={open}
                                        onClose={handleClose}
                                        analise={selectedAnalise} 
                                    />

                                )}

                                <AnaliseEditOverlay
                                    open={editOverlayOpen}
                                    onClose={() => setEditOverlayOpen(false)}
                                    analise={analiseToEdit}
                                    onSave={handleSave} // Passando handleSave como onSave
                                />

                                {selectedAnalise && (
                                    <AnaliseExcluirOverlay
                                        open={openDeleteOverlay}
                                        onClose={handleCloseDeleteOverlay}
                                        onDelete={handleDeleteAnalise}
                                        analise={selectedAnalise}
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

export default AnaliseLista;