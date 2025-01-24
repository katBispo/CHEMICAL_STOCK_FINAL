import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnalitoCadastro from '../cadastro/AnalitoCadastro';
import MatrizCadastro from '../cadastro/MatrizCadastro';
import SelectAnaliseDaAmostra from './SelectAnaliseDaAmostra';

import {
    ArrowForward as ArrowForwardIcon,
    Description as DescriptionIcon,
    ExpandLess,
    ExpandMore,
    Home as HomeIcon,
    Inventory as InventoryIcon,
    PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Collapse,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';

const SideBar = ({ drawerOpen, toggleDrawer }) => {


    const [openMatrizOverlay, setOpenMatrizOverlay] = useState(false); // Estado para controlar o overlay da Matriz
    const [openAnalitoOverlay, setOpenAnalitoOverlay] = useState(false); // Estado para controlar o overlay do Analito
    const [openAmostraOverlay, setOpenAmostraOverlay] = useState(false); // Controla o modal



    const handleCloseAmostraOverlay = () => {
        setOpenAmostraOverlay(false);
        //navigate("/amostraCadastro"); // Redireciona para a rota de cadastro
    };


    const handleOpenAmostraOverlay = () => {
        setOpenAmostraOverlay(true); // Abre o overlay para selecionar a análise
    };

    const handleOpenMatrizOverlay = () => {
        setOpenMatrizOverlay(true);
    };

    const handleCloseMatrizOverlay = () => {
        setOpenMatrizOverlay(false);
    };

    // Funções para abrir e fechar o overlay do Analito
    const handleOpenAnalitoOverlay = () => {
        setOpenAnalitoOverlay(true);
    };

    const handleCloseAnalitoOverlay = () => {
        setOpenAnalitoOverlay(false);
    };





    const [openProcessos, setOpenProcessos] = useState(false);

    const [openListas, setOpenListas] = useState(false);


    const [openCadastroPessoas, setOpenCadastroPessoas] = useState(false);
    const [openCadastroItens, setOpenCadastroItens] = useState(false);
    const [selectedItem, setSelectedItem] = useState('/'); // Estado para item selecionado

    const handleProcessosClick = () => setOpenProcessos(!openProcessos);
    const handleListasClick = () => setOpenListas(!openListas);


    const handleCadastroPessoasClick = () => setOpenCadastroPessoas(!openCadastroPessoas);
    const handleCadastroItensClick = () => setOpenCadastroItens(!openCadastroItens);

    return (
        <>
            <Drawer
                sx={{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 300,
                        boxSizing: 'border-box',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        mt: 8,
                        height: '100vh', // Defina a altura da sidebar para preencher a tela
                    },
                }}
                variant="persistent"
                anchor="left"
                open={drawerOpen}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: '#FFD700' }}>U</Avatar>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                        Usuário
                    </Typography>
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                        usuatio@exemplo.com
                    </Typography>
                </Box>

                <List>
                    <ListItem
                        button
                        component={Link}
                        to="/" // Define a rota
                        onClick={() => setSelectedItem('/')} // Atualiza o item selecionado
                        selected={selectedItem === '/'} // Condição para o estilo selecionado
                        sx={{
                            bgcolor: selectedItem === '/' ? '#8BC34A' : 'transparent', // Muda a cor se selecionado
                            textDecoration: 'none',
                            color: 'white',
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>


                    <ListItem button onClick={handleListasClick}>
                        <ListItemIcon>
                            <DescriptionIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Listas" />
                        {openListas ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={openListas} timeout="auto" unmountOnExit>


                        <List component="div" disablePadding>



                            <ListItem
                                button
                                component={Link}
                                to="/analiseLista" // Define a nova rota
                                onClick={() => setSelectedItem('/analiseLista')} // Atualiza o item selecionado
                                selected={selectedItem === '/analiseLista'} // Condição para o estilo selecionado
                                sx={{
                                    bgcolor: selectedItem === '/analiseLista' ? '#8BC34A' : 'transparent', // Muda a cor se selecionado
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <ListItemText primary="Análises" />
                            </ListItem>





                            <ListItem
                                button
                                component={Link}
                                to="/procedimentoLista" // Define a nova rota
                                onClick={() => setSelectedItem('/procedimentoLista')} // Atualiza o item selecionado
                                selected={selectedItem === '/procedimentoLista'} // Condição para o estilo selecionado
                                sx={{
                                    bgcolor: selectedItem === '/procedimentoLista' ? '#8BC34A' : 'transparent', // Muda a cor se selecionado
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <ListItemText primary="Procedimentos" />
                            </ListItem>



                            <ListItem
                                button
                                component={Link}
                                to="/contratoLista" // Define a nova rota
                                onClick={() => setSelectedItem('/contratoLista')} // Atualiza o item selecionado
                                selected={selectedItem === '/contratoLista'} // Condição para o estilo selecionado
                                sx={{
                                    bgcolor: selectedItem === '/contratoLista' ? '#8BC34A' : 'transparent', // Muda a cor se selecionado
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <ListItemText primary="Contratos" />
                            </ListItem>



                            <ListItem
                                button
                                component={Link}
                                to="/analiseLista" // Define a nova rota
                                onClick={() => setSelectedItem('/analiseLista')} // Atualiza o item selecionado
                                selected={selectedItem === '/analiseLista'} // Condição para o estilo selecionado
                                sx={{
                                    bgcolor: selectedItem === '/analiseLista' ? '#8BC34A' : 'transparent', // Muda a cor se selecionado
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <ListItemText primary="Análises" />
                            </ListItem>


                            <ListItem
                                button
                                component={Link}
                                to="/matrizLista" // Define a nova rota
                                onClick={() => setSelectedItem('/matrizLista')} // Atualiza o item selecionado
                                selected={selectedItem === '/matrizLista'} // Condição para o estilo selecionado
                                sx={{
                                    bgcolor: selectedItem === '/matrizLista' ? '#8BC34A' : 'transparent', // Muda a cor se selecionado
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <ListItemText primary="Matrizes" />
                            </ListItem>



                            <ListItem
                                button
                                component={Link}
                                to="/clientesLista" // Define a nova rota
                                onClick={() => setSelectedItem('/clientesLista')} // Atualiza o item selecionado
                                selected={selectedItem === '/clientesLista'} // Condição para o estilo selecionado
                                sx={{
                                    bgcolor: selectedItem === '/clientesLista' ? '#8BC34A' : 'transparent', // Muda a cor se selecionado
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <ListItemText primary="Clientes" />
                            </ListItem>



                            <ListItem
                                button
                                component={Link}
                                to="/amostraLista" // Define a nova rota
                                onClick={() => setSelectedItem('/amostraLista')} // Atualiza o item selecionado
                                selected={selectedItem === '/amostraLista'} // Condição para o estilo selecionado
                                sx={{
                                    bgcolor: selectedItem === '/amostraLista' ? '#8BC34A' : 'transparent', // Muda a cor se selecionado
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <ListItemText primary="Amostras" />
                            </ListItem>
                        </List>
                    </Collapse>



                    <ListItem button onClick={handleCadastroItensClick}>
                        <ListItemIcon>
                            <InventoryIcon sx={{ color: 'white' }} />
                        </ListItemIcon>


                        <ListItemText primary="Cadastro de Itens" />
                        {openCadastroItens ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={openCadastroItens} timeout="auto" unmountOnExit>

                        <List component="div" disablePadding>


                            <ListItem
                                button
                                component={Link}
                                to="/analiseCadastro" // Define a nova rota
                                onClick={() => setSelectedItem('/analiseCadastro')} // Atualiza o item selecionado
                                selected={selectedItem === '/analiseCadastro'} // Condição para o estilo selecionado
                                sx={{
                                    pl: 4,
                                    bgcolor: selectedItem === '/analiseCadastro' ? '#8BC34A' : 'transparent', // Muda a cor se selecionado
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <ListItemText primary="Análises" />
                            </ListItem>


                            <ListItem
                                button
                                onClick={handleOpenAmostraOverlay}  // Agora apenas abre o overlay
                                selected={selectedItem === "/amostraCadastro"}
                                sx={{
                                    pl: 4,
                                    bgcolor: selectedItem === "/amostraCadastro" ? "#8BC34A" : "transparent",
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                <ListItemText primary="Amostras" />
                            </ListItem>

                            <SelectAnaliseDaAmostra
                                open={openAmostraOverlay}
                                handleClose={handleCloseAmostraOverlay}  // Fecha o overlay quando necessário

                            />


                            <ListItem
                                button
                                component={Link}
                                to="/reagenteCadastro" // Define a nova rota
                                onClick={() => setSelectedItem('/reagenteCadastro')} // Atualiza o item selecionado
                                selected={selectedItem === '/reagenteCadastro'} // Condição para o estilo selecionado
                                sx={{
                                    pl: 4,
                                    bgcolor: selectedItem === '/reagenteCadastro' ? '#8BC34A' : 'transparent', // Muda a cor se selecionado
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <ListItemText primary="Reagentes" />
                            </ListItem>


                            <div>
                                <ListItem
                                    button
                                    onClick={handleOpenMatrizOverlay} // Abre o overlay da Matriz ao clicar
                                    sx={{
                                        pl: 4,
                                        bgcolor: selectedItem === '/matrizCadastro' ? '#8BC34A' : 'transparent',
                                        textDecoration: 'none',
                                        color: 'white',
                                    }}
                                >
                                    <ListItemText primary="Matriz" />
                                </ListItem>
                                <MatrizCadastro open={openMatrizOverlay} handleClose={handleCloseMatrizOverlay} />
                            </div>


                            {/* Seção Analito */}
                            <div>
                                <ListItem
                                    button
                                    onClick={handleOpenAnalitoOverlay} // Abre o overlay do Analito ao clicar
                                    sx={{
                                        pl: 4,
                                        bgcolor: selectedItem === '/analitoCadastro' ? '#8BC34A' : 'transparent',
                                        textDecoration: 'none',
                                        color: 'white',
                                    }}
                                >
                                    <ListItemText primary="Analito" />
                                </ListItem>
                                <AnalitoCadastro open={openAnalitoOverlay} handleClose={handleCloseAnalitoOverlay} />
                            </div>


                            <ListItem
                                button
                                component={Link}
                                to="/clienteCadastro" // Define a nova rota
                                onClick={() => setSelectedItem('/clienteCadastro')} // Atualiza o item selecionado
                                selected={selectedItem === '/clienteCadastro'} // Condição para o estilo selecionado
                                sx={{
                                    pl: 4,
                                    bgcolor: selectedItem === '/clienteCadastro' ? '#8BC34A' : 'transparent', // Muda a cor se selecionado
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <ListItemText primary="Clientes" />
                            </ListItem>


                            <ListItem
                                button
                                component={Link}
                                to="/procedimentoCadastro" // Define a nova rota
                                onClick={() => setSelectedItem('/procedimentoCadastro')} // Atualiza o item selecionado
                                selected={selectedItem === '/procedimentoCadastro'} // Condição para o estilo selecionado
                                sx={{
                                    pl: 4,
                                    bgcolor: selectedItem === '/procedimentoCadastro' ? '#8BC34A' : 'transparent', // Muda a cor se selecionado
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <ListItemText primary="Procedimentos" />
                            </ListItem>








                        </List>
                    </Collapse>
                    <ListItem
                        button
                        component={Link}
                        to="/perfil"
                        onClick={() => setSelectedItem('/perfil')}
                        selected={selectedItem === '/perfil'}
                        sx={{
                            bgcolor: selectedItem === '/perfil' ? '#8BC34A' : 'transparent',
                            textDecoration: 'none',
                            color: 'white',
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Perfil" />
                    </ListItem>

                </List>
            </Drawer >

            {/* Retângulo com ícones quando a sidebar estiver oculta */}
            {
                !drawerOpen && (
                    <Box
                        sx={{
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            height: '100vh', // Altura igual à altura da sidebar
                            width: 60, // Largura reduzida para apenas mostrar ícones
                            backgroundColor: '#4CAF50',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 1,
                            boxShadow: 2,
                            paddingTop: '70px', // Adiciona espaço acima dos ícones
                        }}
                    >
                        <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
                            <ArrowForwardIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <HomeIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <DescriptionIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <PersonAddIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <InventoryIcon />
                        </IconButton>
                    </Box>
                )
            }
        </>
    );
};

export default SideBar;