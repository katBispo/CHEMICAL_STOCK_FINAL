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
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SideBar from './components/SideBar.js'; // Importe o novo componente
import Dashboard from './components/MenuComponents/Dashboard.js'; // Importe o novo componente
import { useNavigate } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import { Link } from 'react-router-dom';
import InfoCard from './components/MenuComponents/InfoCard.js';
import AmostraCardContainer from './components/MenuComponents/AmostraCardContainer.js';
import CardReabastecimentoEstoque from './components/MenuComponents/CardReabastecimentoEstoque.js';
import ListaMovimentacoes from './components/MenuComponents/ListaMovimentacoes.js';

import LineChartDashboard from './components/MenuComponents/LineChartDashboard'; // ajuste o caminho conforme necessário



//EXEMPLOS
const amostras = [
    { dataVencimento: '2024-08-10', nome: 'Amostra 1', diasParaVencer: 5, endereco: 'Laboratório A' },
    { dataVencimento: '2024-08-12', nome: 'Amostra 2', diasParaVencer: 7, endereco: 'Laboratório B' },
    { dataVencimento: '2024-08-15', nome: 'Amostra 3', diasParaVencer: 10, endereco: 'Laboratório C' },
    { dataVencimento: '2024-08-18', nome: 'Amostra 4', diasParaVencer: 13, endereco: 'Laboratório D' } // Essa NÃO será exibida
];

const reagentes = [
    { nome: "Ácido Sulfúrico", quantidade: 5, limite: 10 },
    { nome: "Hidróxido de Sódio", quantidade: 3, limite: 5 },
    { nome: "Água Destilada", quantidade: 15, limite: 10 } // Esse não precisa ser reposto
];

const movimentacoes = [
    { dataMovimentacao: '2024-08-05', reagente: 'Ácido Clorídrico', quantidade: 20, tipo: 'Entrada' },
    { dataMovimentacao: '2024-08-07', reagente: 'Hidróxido de Sódio', quantidade: 5, tipo: 'Saída' },
    { dataMovimentacao: '2024-08-10', reagente: 'Sulfato de Cobre', quantidade: 10, tipo: 'Entrada' },
    { dataMovimentacao: '2024-08-12', reagente: 'Ácido Sulfúrico', quantidade: 7, tipo: 'Saída' }, // Essa NÃO será exibida
];

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

                <Box display="flex" justifyContent="space-around" mt={2} flexWrap="wrap" gap={2}>

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
                    <Box
                        display="flex"
                        justifyContent="flex-start" // Mantém os elementos alinhados à esquerda
                        alignItems="flex-start"
                        sx={{ width: '100%' }}
                    >
                        {/* Gráfico */}
                        <Box sx={{ marginRight: "50px" }}> {/* Ajuste o espaço aqui */}
                            <Dashboard />
                        </Box>

                        {/* Amostras Próximas a Vencer */}
                        <Box sx={{ position: "relative", top: "30px" }}>
                            <AmostraCardContainer amostras={amostras} />
                        </Box>
                    </Box>


                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                        {/* Novo Box para o Card de Reabastecimento */}
                        <Box sx={{ flex: 1 }}>
                            <CardReabastecimentoEstoque reagentes={reagentes} />
                        </Box>

                        {/* Lista de Movimentações */}
                        <Box sx={{ flex: 1 }}>
                            <ListaMovimentacoes />
                        </Box>
                    </Box>

                </Box>



                <div>
      <h1 className="text-xl font-bold">Dashboard</h1>
      <LineChartDashboard />
    </div>
                    


            </Box>

            
        </Box>

        
    );

}

export default Menu;
