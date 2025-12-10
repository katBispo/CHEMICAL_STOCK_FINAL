import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Avatar, IconButton, Typography,
  Container, Grid, Box, Divider, Tooltip, Card, CardContent, Paper
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { Pencil } from "lucide-react";

import SideBar from '../components/SideBar';
import EditarUsuarioOverlay from './EditarUsuarioOverlay';
import { getUsuarioLogado, atualizarFoto } from '../../services/usuarioService';

// 🔹 COMPONENTE PARA EXIBIÇÃO SOMENTE LEITURA
const InfoRow = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography sx={{ fontSize: 13, color: "text.secondary", fontWeight: 500 }}>
      {label}
    </Typography>
    <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
      {value || "—"}
    </Typography>
  </Box>
);

const Perfil = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [preview, setPreview] = useState(null);

  // 🔹 Estado PARA ABRIR O OVERLAY DE EDIÇÃO
  const [editarAberto, setEditarAberto] = useState(false);

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

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

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
      <AppBar position="fixed" elevation={1} sx={{ bgcolor: "#1b5e20" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Perfil</Typography>
        </Toolbar>
      </AppBar>

      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          mt: 8,
          pb: 10,
          borderRadius: 0,
          background: "linear-gradient(to bottom, #f4f6f5 0%, #ffffff 100%)",
        }}
      >
        <Container sx={{ pt: 6, textAlign: "center" }}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              src={preview}
              sx={{
                width: 170,
                height: 170,
                fontSize: 50,
                bgcolor: "#a5d6a7",
                border: "4px solid white",
                boxShadow: 3,
              }}
            >
              {!preview && usuario.nome.charAt(0)}
            </Avatar>

            <Tooltip title="Alterar foto">
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  bgcolor: "white",
                  width: 48,
                  height: 48,
                  boxShadow: 2,
                  borderRadius: "50%",
                  ":hover": { bgcolor: "#eeeeee" },
                }}
              >
                <PhotoCamera color="success" />
                <input hidden accept="image/*" type="file" onChange={handleImageChange} />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
            {usuario.nome}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {usuario.email}
          </Typography>
        </Container>
      </Paper>

      {/* Main Content */}
      <Container sx={{ mt: -6 }}>
        <Grid container spacing={4}>

          {/* CARD – Dados pessoais */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, p: 2, boxShadow: 4, position: "relative" }}>
              <CardContent>
                
                {/* 🔹 ÍCONE DA CANETA */}
                <IconButton
                  onClick={() => setEditarAberto(true)}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "#eeeeee",
                    ":hover": { bgcolor: "#e0e0e0" }
                  }}
                >
                  <Pencil size={20} color="#1b5e20" />
                </IconButton>

                <Box display="flex" alignItems="center" mb={2}>
                  <PersonIcon sx={{ mr: 1 }} color="success" />
                  <Typography variant="h6" fontWeight="bold">
                    Dados Pessoais
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <InfoRow label="Nome" value={usuario.nome} />
                <InfoRow label="CPF" value={usuario.cpf} />
                <InfoRow label="E-mail" value={usuario.email} />
              </CardContent>
            </Card>
          </Grid>

          {/* CARD – Dados profissionais */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, p: 2, boxShadow: 4, position: "relative" }}>
              <CardContent>

                {/* 🔹 ÍCONE DA CANETA */}
                <IconButton
                  onClick={() => setEditarAberto(true)}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "#eeeeee",
                    ":hover": { bgcolor: "#e0e0e0" }
                  }}
                >
                  <Pencil size={20} color="#1b5e20" />
                </IconButton>

                <Box display="flex" alignItems="center" mb={2}>
                  <WorkIcon sx={{ mr: 1 }} color="success" />
                  <Typography variant="h6" fontWeight="bold">
                    Dados Profissionais
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <InfoRow label="CRQ" value={usuario.crq} />
                <InfoRow label="Cargo" value={usuario.cargo} />
                <InfoRow
                  label="Data de Admissão"
                  value={usuario.dataAdmissao}
                />
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>

      {/* 🔹 COMPONENTE EXTERNO DO OVERLAY DE EDIÇÃO */}
      {editarAberto && (
        <EditarUsuarioOverlay
          usuario={usuario}
          onClose={() => setEditarAberto(false)}
        />
      )}
    </>
  );
};

export default Perfil;
