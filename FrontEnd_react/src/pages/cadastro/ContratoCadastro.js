import React, { useState, useEffect } from 'react';
import {
  Box, AppBar, Toolbar, IconButton, Typography,
  Button, TextField, Autocomplete
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import FeedbackDialog from '../components/FeedbackDialog.js';
import { useNavigate } from 'react-router-dom';
import Contrato from '../../models/ContratoModel.js';
import { salvarContrato } from '../../services/contratoService.js';
import { getClientes } from '../../services/ClienteService.js';

function ContratoCadastro({ onSuccess }) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const toggleDrawer = () => setDrawerOpen(prev => !prev);
  const navigate = useNavigate();

  const [numeroContrato, setNumeroContrato] = useState('');
  const [nomeContrato, setNomeContrato] = useState('');
  const [dataContrato, setDataContrato] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [quantidadeAnalises, setQuantidadeAnalises] = useState('');
  const [observacao, setObservacao] = useState('');
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    async function carregarClientes() {
      try {
        const response = await getClientes();
        setClientes(response.clientes || response);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    }
    carregarClientes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contrato = new Contrato(
      numeroContrato,
      nomeContrato,
      dataContrato,
      dataEntrega,
      parseInt(quantidadeAnalises, 10),
      observacao,
      selectedCliente
    );

    try {
      await salvarContrato(contrato);
      setDialogMessage('✅ Contrato cadastrado com sucesso!');
      setDialogOpen(true);

      if (onSuccess) onSuccess();
      else setTimeout(() => navigate('/contratoLista'), 1500);
    } catch (error) {
      console.error('Erro ao salvar contrato:', error);
      setDialogMessage('❌ Erro ao salvar o contrato no banco de dados.');
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => setDialogOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cadastro de Contratos
          </Typography>
        </Toolbar>
      </AppBar>

      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4, ml: -15 }}>
        <Toolbar />
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '800px',
            marginLeft: '200px',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Cadastrar Contrato
          </Typography>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Número e Nome do Contrato */}
              <Box display="flex" gap={2}>
                <TextField
                  label="Número do Contrato"
                  required
                  margin="normal"
                  value={numeroContrato}
                  onChange={(e) => setNumeroContrato(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Nome do Contrato"
                  required
                  margin="normal"
                  value={nomeContrato}
                  onChange={(e) => setNomeContrato(e.target.value)}
                  sx={{ flex: 2 }}
                />
              </Box>

              {/* Cliente e Quantidade de Análises */}
              <Box display="flex" gap={2}>
                <Autocomplete
                  options={clientes}
                  getOptionLabel={(option) => option.nome}
                  onChange={(event, value) => setSelectedCliente(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Cliente Associado"
                      required
                      margin="normal"
                      style={{ width: '300px' }}
                    />
                  )}
                />
                <TextField
                  label="Quantidade de Análises"
                  required
                  margin="normal"
                  type="number"
                  value={quantidadeAnalises}
                  onChange={(e) => setQuantidadeAnalises(e.target.value)}
                  sx={{ flex: 1 }}
                />
              </Box>

              {/* Datas */}
              <Box display="flex" justifyContent="flex-start" gap={2}>
                <TextField
                  label="Data de Contratação"
                  type="date"
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  style={{ width: '350px' }}
                  value={dataContrato}
                  onChange={(e) => setDataContrato(e.target.value)}
                />
                <TextField
                  label="Prazo de finalização"
                  type="date"
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  style={{ width: '300px' }}
                  value={dataEntrega}
                  onChange={(e) => setDataEntrega(e.target.value)}
                />
              </Box>

              {/* Observação */}
              <TextField
                label="Observação"
                margin="normal"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                multiline
                rows={4}
              />

              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Salvar Contrato
              </Button>
            </Box>
          </form>

          <FeedbackDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            message={dialogMessage}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ContratoCadastro;
