import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Avatar, TextField, IconButton, Typography,
  Container, Grid, Box, Divider, Tooltip, Card, CardContent
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import SideBar from '../components/SideBar';
import { getUsuarioLogado, atualizarFoto } from '../../services/usuarioService';

const Perfil = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await getUsuarioLogado();
        setUsuario(dados);

        if (dados.fotoPerfil) {
          setPreview(`data:image/jpeg;base64,${dados.fotoPerfil}`);
        }
      } catch (err) {
        console.error("Erro ao carregar usuário", err);
      }
    }
    carregar();
  }, []);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  // 🔥 ENVIO DE FOTO PARA O BACKEND (CORRIGIDO)
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Preview instantâneo
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // Cria FormData com o campo correto
    const formData = new FormData();
    formData.append("foto", file);

    try {
      const atualizado = await atualizarFoto(formData);
      setUsuario(atualizado);
    } catch (error) {
      console.error("Erro ao atualizar foto", error);
    }
  };

  if (!usuario) {
    return (
      <Typography sx={{ mt: 10, textAlign: "center" }}>
        Carregando dados do usuário...
      </Typography>
    );
  }

  return (
    <>
      {/* Top Bar */}
      <AppBar position="fixed" sx={{ bgcolor: '#2e7d32' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Perfil do Usuário</Typography>
        </Toolbar>
      </AppBar>

      {/* SideBar */}
      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* Banner */}
      <Box
        sx={{
          mt: 8,
          height: 200,
          background: 'linear-gradient(to right, #43a047, #2e7d32)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }}
      >
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold">
            Olá, {usuario.nome}
          </Typography>
          <Typography variant="subtitle1">
            Aqui você gerencia suas informações pessoais e profissionais
          </Typography>
        </Box>
      </Box>

      {/* Conteúdo principal */}
      <Container sx={{ position: 'relative', mt: -10 }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Foto do Usuário */}
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={preview}
              sx={{
                width: 160,
                height: 160,
                bgcolor: '#81c784',
                fontSize: 48,
                border: '5px solid white',
                boxShadow: 4,
              }}
            >
              {!preview && usuario.nome.charAt(0)}
            </Avatar>

            {/* Botão de upload */}
            <Tooltip title="Alterar foto">
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  bgcolor: 'white',
                  width: 45,
                  height: 45,
                  boxShadow: 3,
                  ":hover": { bgcolor: '#e0e0e0' }
                }}
              >
                <PhotoCamera color="success" />
                <input hidden accept="image/*" type="file" onChange={handleImageChange} />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
            {usuario.nome}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {usuario.email}
          </Typography>
        </Box>

        {/* Cards */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Dados pessoais */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <PersonIcon sx={{ mr: 1 }} color="success" />
                  <Typography variant="h6" fontWeight="bold">
                    Dados Pessoais
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <TextField label="Nome" fullWidth margin="dense" value={usuario.nome} />
                <TextField label="CPF" fullWidth margin="dense" value={usuario.cpf} />
                <TextField label="E-mail" fullWidth margin="dense" value={usuario.email} />
              </CardContent>
            </Card>
          </Grid>

          {/* Dados profissionais */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <WorkIcon sx={{ mr: 1 }} color="success" />
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
