import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Ícone para o Cadastro de Processo
import SideBar from './components/SideBar.js'; // Componente Sidebar
import Dashboard from './components/Dashboard.js'; // Componente Dashboard
import { useNavigate } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import { Link } from 'react-router-dom';

function Menu() {
    const [drawerOpen, setDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    const navigate = useNavigate();

    const handleNavigate = () => {
        console.log('Botão clicado, redirecionando...');
        navigate('/analiseLista');
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
                        Menu Inicial
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Substitua a lógica do Drawer pelo componente SideBar */}
            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
                <Toolbar />
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Painel de Controle
                </Typography>

                <Box display="flex" justifyContent="space-around" mt={2}>
                    <ButtonBase
                        component={Link}
                        to="/analiseLista"
                    >
                        <Button
                            variant="contained"
                            startIcon={<ListAltIcon sx={{ fontSize: '50px' }} />}
                            sx={{
                                borderRadius: '20px',
                                bgcolor: '#76C043',
                                flexGrow: 1,
                                mx: 1,
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }}
                        >
                            Lista de Análises
                        </Button>
                    </ButtonBase>

                    <Button
                        variant="contained"
                        startIcon={<AddCircleIcon sx={{ fontSize: '50px' }} />}
                        sx={{
                            borderRadius: '20px',
                            bgcolor: '#76C043',
                            flexGrow: 1,
                            mx: 1,
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '18px',
                        }}
                    >
                        Cadastrar Reagente
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<AssessmentIcon sx={{ fontSize: '50px' }} />}
                        sx={{
                            borderRadius: '20px',
                            bgcolor: '#76C043',
                            flexGrow: 1,
                            mx: 1,
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '18px',
                        }}
                    >
                        Cadastrar Análise
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<EmojiNatureIcon sx={{ fontSize: '50px' }} />}
                        sx={{
                            borderRadius: '20px',
                            bgcolor: '#76C043',
                            flexGrow: 1,
                            mx: 1,
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '18px',
                        }}
                    >
                        Cadastrar Amostra
                    </Button>

                    {/* Botão para Cadastrar Processo com cor vermelha */}
                    <Button
                        variant="contained"
                        startIcon={<LocalHospitalIcon sx={{ fontSize: '50px' }} />}
                        sx={{
                            borderRadius: '20px',
                            bgcolor: 'red',
                            flexGrow: 1,
                            mx: 1,
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '18px',
                        }}
                        onClick={() => navigate('/cadastrarProcesso')}
                    >
                        Cadastrar Processo
                    </Button>
                </Box>

                <Container>
                    <Dashboard /> {/* Chamando o componente Dashboard */}
                </Container>
            </Box>
        </Box>
    );
}

export default Menu;
