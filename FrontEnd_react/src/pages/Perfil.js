import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import SideBar from './components/SideBar';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
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
    Avatar,
    TextField,
    IconButton,
    Typography,
    Paper
} from '@mui/material';

const Perfil = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState('Usuário');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
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
                        Perfil do Usuário
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
                <Toolbar />

                <Box textAlign="center" mt={2} mb={2}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Perfil do Usuário
                    </Typography>
                </Box>

                <Box display="flex" flexWrap="wrap" justifyContent="space-around" gap={4} p={2}>
                    {/* Foto de Perfil */}
                    <Paper elevation={3} sx={{ p: 2, width: 280, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ bgcolor: 'grey.300', p: 1 }}>Foto de Perfil</Typography>
                        <Avatar
                            src={image}
                            sx={{ width: 80, height: 80, m: 'auto', bgcolor: 'orange', fontSize: 40 }}
                        >
                            {!image && userName.charAt(0)} {/* Mostra a letra inicial do nome se não houver imagem */}
                        </Avatar>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                            <PhotoCamera />
                        </IconButton>
                        <TextField
                            label="Nome"
                            fullWidth
                            margin="dense"
                            defaultValue={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </Paper>

                    {/* Dados Pessoais */}
                    <Paper elevation={3} sx={{ p: 2, width: 400 }}>
                        <Typography variant="h6" sx={{ bgcolor: 'grey.300', p: 1 }}>Dados Pessoais</Typography>
                        <Box mt={2}>
                            <TextField label="Nome" fullWidth margin="dense" defaultValue="Usuário" />
                            <TextField label="CPF" fullWidth margin="dense" defaultValue="999.999.999-99" />
                            <TextField label="E-mail" fullWidth margin="dense" defaultValue="usuario@exemplo.com" />
                            <Button variant="contained" color="success" sx={{ mt: 2 }}>Salvar</Button>
                        </Box>
                    </Paper>

                    {/* Alterar Senha */}
                    <Paper elevation={3} sx={{ p: 2, width: 400 }}>
                        <Typography variant="h6" sx={{ bgcolor: 'grey.300', p: 1 }}>Alterar Senha</Typography>
                        <Box mt={2}>
                            <TextField label="Senha Atual" fullWidth margin="dense" />
                            <TextField label="CPF" fullWidth margin="dense" defaultValue="999.999.999-99" />
                            <TextField label="E-mail" fullWidth margin="dense" defaultValue="usuario@exemplo.com" />
                            <Button variant="contained" color="success" sx={{ mt: 2 }}>Salvar</Button>
                        </Box>
                    </Paper>

                    {/* Dados Profissionais */}
                    <Paper elevation={3} sx={{ p: 2, width: 400 }}>
                        <Typography variant="h6" sx={{ bgcolor: 'grey.300', p: 1 }}>Dados Profissionais</Typography>
                        <Box mt={2}>
                            <TextField label="CRQ" fullWidth margin="dense" defaultValue="9999999999" />
                            <TextField label="Cargo" fullWidth margin="dense" defaultValue="-" />
                            <TextField
                                label="Data de Admissão"
                                type="date"
                                defaultValue="2022-05-13"
                                fullWidth
                                margin="dense"
                                InputLabelProps={{ shrink: true }}
                            />
                            <Button variant="contained" color="success" sx={{ mt: 2 }}>Salvar</Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Perfil;
