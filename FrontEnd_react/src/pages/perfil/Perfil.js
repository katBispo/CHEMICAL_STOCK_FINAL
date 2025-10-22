import React, { useState } from 'react';
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
  Box,
  Divider,
  Tooltip,
  Fab,
  Card,
  CardContent
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import SideBar from '../components/SideBar';

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
      {/* Barra superior */}
      <AppBar position="fixed" sx={{ bgcolor: '#2e7d32', boxShadow: 3 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Perfil do Usuário
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* Banner */}
      <Box
        sx={{
          mt: 8,
          height: 180,
          background: 'linear-gradient(to right, #43a047, #2e7d32)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Box sx={{ textAlign: 'center', color: 'white' }}>
          <Typography variant="h5" fontWeight="bold">
            Bem-vindo, {userName}
          </Typography>
          <Typography variant="subtitle1">Gerencie suas informações pessoais e profissionais</Typography>
        </Box>
      </Box>

      {/* Avatar central */}
      <Container sx={{ position: 'relative', mt: -8, mb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={image}
              sx={{
                width: 140,
                height: 140,
                bgcolor: '#81c784',
                fontSize: 48,
                boxShadow: 3,
                border: '4px solid white'
              }}
            >
              {!image && userName.charAt(0)}
            </Avatar>
            <Tooltip title="Alterar foto">
              <IconButton
                color="primary"
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: 'white',
                  boxShadow: 2,
                  '&:hover': { bgcolor: '#e8f5e9' }
                }}
              >
                <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                <PhotoCamera />
              </IconButton>
            </Tooltip>
          </Box>

          <TextField
            label="Nome"
            size="small"
            sx={{ mt: 2, width: '300px' }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Box>

        {/* Cards de informações */}
        <Grid container spacing={4}>
          {/* Dados Pessoais */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <PersonIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Dados Pessoais
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <TextField label="CPF" fullWidth margin="dense" defaultValue="999.999.999-99" />
                <TextField label="E-mail" fullWidth margin="dense" defaultValue="usuario@exemplo.com" />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2, borderRadius: 2, width: '100%' }}
                >
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Dados Profissionais */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <WorkIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Dados Profissionais
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
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
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2, borderRadius: 2, width: '100%' }}
                >
                  Salvar
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Alterar Senha */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <LockIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Alterar Senha
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <TextField label="Senha Atual" type="password" fullWidth margin="dense" />
                <TextField label="Nova Senha" type="password" fullWidth margin="dense" />
                <TextField label="Confirmar Senha" type="password" fullWidth margin="dense" />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2, borderRadius: 2, width: '100%' }}
                >
                  Atualizar Senha
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Botão Flutuante */}
        <Tooltip title="Editar Perfil">
          <Fab
            color="success"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              boxShadow: 3,
              '&:hover': { bgcolor: '#43a047' }
            }}
          >
            <EditIcon />
          </Fab>
        </Tooltip>
      </Container>
    </>
  );
};

export default Perfil;
