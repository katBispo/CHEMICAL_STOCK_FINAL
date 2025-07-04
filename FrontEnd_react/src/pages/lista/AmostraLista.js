import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import SideBar from '../components/SideBar';
import AmostraDetailOverlay from '../components/amostraListaIcons/AmostraDetailOverlay';
import AmostraEditOverlay from '../components/amostraListaIcons/AmostraEditOverlay';
import AmostraExcluirOverlay from '../components/amostraListaIcons/AmostraExcluirOverlay';
import SelectAnaliseDaAmostra from '../components/SelectAnaliseDaAmostra';




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

const AmostraLista = () => {
    const [amostras, setAmostras] = useState([]);
    const [analises, setAnalises] = useState([]);


    const [selectedAmostra, setSelectedAmostra] = useState(null); // Amostra selecionada
    const [open, setOpen] = useState(false);

    const [openAmostraOverlay, setOpenAmostraOverlay] = useState(false); // Controla o modal


    const [editOverlayOpen, setEditOverlayOpen] = useState(false);
    const [amostraToEdit, setAmostraToEdit] = useState(null);

    const [openDeleteOverlay, setOpenDeleteOverlay] = useState(false);

    const handleOpenDeleteOverlay = (amostra) => {
        setSelectedAmostra(amostra);
        setOpenDeleteOverlay(true);
    };
    const handleOpenAmostraOverlay = () => setOpenAmostraOverlay(true);

    const handleCloseAmostraOverlay = () => {
        setOpenAmostraOverlay(false);
        //navigate("/amostraCadastro"); // Redireciona para a rota de cadastro
    };

    const handleCloseDeleteOverlay = () => {
        setOpenDeleteOverlay(false);
        setSelectedAmostra(null);
    };
    const [selectedAmostras, setSelectedAmostras] = useState([]);

    const handleCheckboxChange = (amostraId) => {//tenho que chamar ele la na frente
        setSelectedAmostras((prevSelected) => {
            if (prevSelected.includes(amostraId)) {
                // Desmarcar
                return prevSelected.filter((id) => id !== amostraId);
            } else {
                // Marcar
                return [...prevSelected, amostraId];
            }
        });
    };
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectRow = (id) => {
        setSelectedAmostras(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(selectedId => selectedId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedAmostras.length === amostras.length) {
            setSelectedAmostras([]);
        } else {
            setSelectedAmostras(amostras.map((amostra) => amostra.id));
        }
    };


    const handleDeleteAmostra = async (id) => {
        const response = await fetch(`http://localhost:8080/amostra/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Amostra excluída com sucesso');
            setAmostras(prevAmostras => prevAmostras.filter(amostra => amostra.id !== id)); // Remove da lista local
        } else {
            console.error('Erro ao excluir a amostra');
        }

        handleCloseDeleteOverlay();
    };



    // Função para abrir o modal
    const handleOpen = () => setOpen(true);

    // Função para fechar o modal
    const handleClose = () => setOpen(false);

    const handleEditClick = (amostra) => {
        setAmostraToEdit(amostra);
        setEditOverlayOpen(true);
    };



    useEffect(() => {
        // Função para buscar as amostras do backend
        const fetchAmostras = async () => {
            try {
                const response = await fetch('http://localhost:8080/amostra');
                const data = await response.json();
                console.log("Amostras carregadas:", data); // Verifique o formato no console

                setAmostras(data);
            } catch (error) {
                console.error('Erro ao buscar amostras:', error);
            }
        };
        const fetchAnalises = async () => {
            try {
                const response = await fetch('http://localhost:8080/analise');
                const data = await response.json();
                setAnalises(data);
            } catch (error) {
                console.error('Erro ao buscar análises:', error);
            }
        };


        // Função para buscar as análises do backend


        // Chamando ambas as funções de busca
        fetchAmostras();
        fetchAnalises();
    }, []);

    const getAnaliseNomeById = (id) => {
        const analise = analises.find(a => a.id === id);
        return analise ? analise.nome : '';
    };

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
                        Lista de Amostras
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
                <Toolbar />

                <Box textAlign="center" mt={2} mb={2}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Lista de Amostras
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button
                        variant="contained"
                        color="success"
                        style={{
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: 'bold'
                        }}
                        startIcon={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>}
                        onClick={handleOpenAmostraOverlay} // Abre o overlay
                    >
                        Cadastrar Amostra
                    </Button>
                    <SelectAnaliseDaAmostra
                        open={openAmostraOverlay}
                        handleClose={handleCloseAmostraOverlay}
                    />


                    <Button
                        variant="contained"
                        color="error"
                        style={{ textTransform: 'none', fontWeight: 'bold' }}
                        onClick={() => {
                            selectedAmostras.forEach(amostraId => {
                                handleDeleteAmostra(amostraId); // Exclui as amostras selecionadas
                            });
                            setSelectedAmostras([]); // limpa seleção após deletar
                        }}
                    >
                        Excluir Selecionados
                    </Button>

                </Box>

                <Box display="flex" justifyContent="space-around" mt={2}>
                    <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#4CAF50' }}>
                                    {/* Adiciona a coluna de checkbox */}
                                    <TableCell style={{ textAlign: 'center' }}>
                                        <Checkbox
                                            checked={selectedAmostras.length === amostras.length && amostras.length > 0}
                                            indeterminate={selectedAmostras.length > 0 && selectedAmostras.length < amostras.length}
                                            onChange={handleSelectAll}
                                            color="primary"
                                        />

                                    </TableCell>
                                    {['Nome', 'Prazo Finalização', 'Endereço', 'Análise', 'Status', 'Ações'].map((header) => (
                                        <TableCell key={header} style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {amostras.map((amostra) => (
                                    <TableRow
                                        key={amostra.id}
                                        style={{ backgroundColor: '#fff', transition: 'background-color 0.3s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                    >
                                        {/* Checkbox para cada linha */}
                                        <TableCell style={{ textAlign: 'center' }}>
                                            <Checkbox
                                                checked={selectedAmostras.includes(amostra.id)}
                                                onChange={() => handleSelectRow(amostra.id)}
                                                color="primary"
                                            />
                                        </TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{amostra.nome}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{amostra.prazoFinalizacao}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{amostra.enderecoColeta}</TableCell>
                                        <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>
                                            {getAnaliseNomeById(amostra.analiseId)}
                                        </TableCell>


                                        <TableCell>
                                            <Box
                                                sx={{
                                                    ...getStatusColor(amostra.status),
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
                                                {amostra.status}
                                            </Box>
                                        </TableCell>

                                        <TableCell style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                            <IconButton onClick={() => { handleOpen(); setSelectedAmostra(amostra); }}>
                                                <FaEye style={{ color: '#666', fontSize: '18px' }} />
                                            </IconButton>
                                            <IconButton onClick={() => { handleEditClick(amostra); }}>
                                                <FaEdit style={{ color: '#4CAF50', fontSize: '18px' }} />
                                            </IconButton>
                                            <IconButton onClick={() => handleOpenDeleteOverlay(amostra)}>
                                                <FaTrashAlt style={{ color: '#e74c3c', fontSize: '18px' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {/* Modais de detalhes e edição */}
                                {selectedAmostra && (
                                    <AmostraDetailOverlay
                                        open={open}
                                        onClose={handleClose}
                                        amostra={selectedAmostra} // Passa a amostra selecionada para o modal
                                    />
                                )}

                                <AmostraEditOverlay
                                    open={editOverlayOpen}
                                    onClose={() => setEditOverlayOpen(false)}
                                    amostra={amostraToEdit}
                                />
                                {selectedAmostra && (
                                    <AmostraExcluirOverlay
                                        open={openDeleteOverlay}
                                        onClose={handleCloseDeleteOverlay}
                                        onDelete={handleDeleteAmostra}
                                        amostra={selectedAmostra}
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

export default AmostraLista;
