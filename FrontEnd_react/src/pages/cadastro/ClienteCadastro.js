import React, { useState } from 'react';
import {
  Box, AppBar, Toolbar, IconButton,
  Typography, Button, TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import FeedbackDialog from '../components/FeedbackDialog.js';
import { useNavigate } from 'react-router-dom';
import Cliente from '../../models/ClienteModel.js';
import { salvarCliente } from '../../services/ClienteService.js'; 

function ClienteCadastro({ onSuccess }) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const toggleDrawer = () => setDrawerOpen(prev => !prev);
  const navigate = useNavigate();

  // 🔹 Estados dos campos
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');

  // 🔹 Estados do feedback
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  // 🔹 Submissão do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    const cliente = new Cliente(nome, email, cnpj, telefone);

    try {
      await salvarCliente(cliente); 
      setDialogMessage('✅ Cliente cadastrado com sucesso!');
      setDialogOpen(true);

      if (onSuccess) onSuccess();
      else setTimeout(() => navigate('/clienteLista'), 1500); 
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      setDialogMessage('❌ Erro ao salvar o cliente no banco de dados.');
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => setDialogOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 🔹 AppBar */}
      <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Cadastro de Clientes
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 🔹 Sidebar */}
      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* 🔹 Conteúdo principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
        <Toolbar />
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            maxWidth: '800px',
            margin: 'auto'
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Cadastrar Cliente
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box display="flex" gap={2}>
              <TextField
                label="Nome do Cliente"
                required
                fullWidth
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <TextField
                label="E-mail"
                required
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box display="flex" gap={2} mt={2}>
              <TextField
                label="CNPJ"
                required
                fullWidth
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
              <TextField
                label="Telefone"
                required
                fullWidth
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </Box>

            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: '#4CAF50',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#43a047' }
                }}
              >
                Salvar Cliente
              </Button>
            </Box>
          </form>
        </Box>
      </Box>

      <FeedbackDialog open={dialogOpen} message={dialogMessage} onClose={handleDialogClose} />
    </Box>
  );
}

export default ClienteCadastro;
