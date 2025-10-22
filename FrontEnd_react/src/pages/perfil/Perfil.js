import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Avatar, TextField, IconButton, Typography,
  Container, Grid, Button, Box, Divider, Tooltip, Fab, Card, CardContent
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import SideBar from '../components/SideBar';
import { getUsuarioLogado } from '../../services/usuarioService';

const Perfil = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const dados = await getUsuarioLogado();
        setUsuario(dados);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    }
    carregarUsuario();
  }, []);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!usuario) {
    return <Typography sx={{ mt: 10, textAlign: "center" }}>Carregando dados do usuário...</Typography>;
  }

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#2e7d32' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Perfil do Usuário
          </Typography>
        </Toolbar>
      </AppBar>

      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      <Box sx={{ mt: 8, height: 180, background: 'linear-gradient(to right, #43a047, #2e7d32)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center', color: 'white' }}>
          <Typography variant="h5" fontWeight="bold">
            Bem-vindo, {usuario.nome}
          </Typography>
          <Typography variant="subtitle1">Gerencie suas informações pessoais e profissionais</Typography>
        </Box>
      </Box>

      <Container sx={{ position: 'relative', mt: -8, mb: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={image}
            sx={{
              width: 140, height: 140, bgcolor: '#81c784',
              fontSize: 48, boxShadow: 3, border: '4px solid white'
            }}
          >
            {!image && usuario.nome.charAt(0)}
          </Avatar>
          <Tooltip title="Alterar foto">
            <IconButton color="primary" component="label" sx={{ position: 'absolute', bottom: 0, right: 0 }}>
              <input hidden accept="image/*" type="file" onChange={handleImageChange} />
              <PhotoCamera />
            </IconButton>
          </Tooltip>
          <TextField
            label="Nome"
            size="small"
            sx={{ mt: 2, width: '300px' }}
            value={usuario.nome}
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Grid container spacing={4}>
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
                <TextField label="CPF" fullWidth margin="dense" value={usuario.cpf || ""} />
                <TextField label="E-mail" fullWidth margin="dense" value={usuario.email || ""} />
              </CardContent>
            </Card>
          </Grid>

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
                <TextField label="CRQ" fullWidth margin="dense" value={usuario.crq || ""} />
                <TextField label="Cargo" fullWidth margin="dense" value={usuario.cargo || ""} />
                <TextField
                  label="Data de Admissão"
                  type="date"
                  fullWidth
                  margin="dense"
                  value={usuario.dataAdmissao || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Perfil;
