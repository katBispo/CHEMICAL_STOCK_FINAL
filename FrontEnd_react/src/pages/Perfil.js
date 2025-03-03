import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import SideBar from './components/SideBar';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
    AppBar,
    Toolbar,
    Avatar,
    TextField,
    IconButton,
    Typography,
    Paper,
    Container,
    Grid,
    Button,
    Box
} from '@mui/material';

const Perfil = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState('Usuário');
    
    const toggleDrawer = () => setDrawerOpen(!drawerOpen);
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <AppBar position="fixed" sx={{ bgcolor: '#4CAF50' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        Perfil do Usuário
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

            <Container sx={{ mt: 10, p: 3 }}>

                <Grid container direction="column" spacing={3} justifyContent="center">
                    {/* Seção de Foto de Perfil */}
                    <Grid item xs={12}>
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h6">Foto de Perfil</Typography>
                            <Avatar
                                src={image}
                                sx={{ width: 100, height: 100, m: 'auto', bgcolor: 'orange', fontSize: 40 }}
                            >
                                {!image && userName.charAt(0)}
                            </Avatar>
                            <IconButton color="primary" component="label">
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
                        </Box>
                    </Grid>

                    {/* Seção de Dados Pessoais */}
                    <Grid item xs={12}>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h6">Dados Pessoais</Typography>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField label="Nome" fullWidth defaultValue="Usuário" />
                                <TextField label="CPF" fullWidth defaultValue="999.999.999-99" />
                                <TextField label="E-mail" fullWidth defaultValue="usuario@exemplo.com" />
                                <Button variant="contained" color="success">Salvar</Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Seção de Dados Profissionais */}
                    <Grid item xs={12}>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h6">Dados Profissionais</Typography>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField label="CRQ" fullWidth defaultValue="9999999999" />
                                <TextField label="Cargo" fullWidth defaultValue="-" />
                                <TextField
                                    label="Data de Admissão"
                                    type="date"
                                    defaultValue="2022-05-13"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                                <Button variant="contained" color="success">Salvar</Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Seção de Alterar Senha */}
                    <Grid item xs={12}>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h6">Alterar Senha</Typography>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField label="Senha Atual" fullWidth />
                                <TextField label="Nova Senha" fullWidth />
                                <TextField label="Confirmar Senha" fullWidth />
                                <Button variant="contained" color="success">Salvar</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>



        </>
    );
};

export default Perfil;
