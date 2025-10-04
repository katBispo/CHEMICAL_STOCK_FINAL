import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Box, AppBar, Toolbar, IconButton, Typography, Paper, CircularProgress
} from '@mui/material';
import SideBar from '../components/SideBar';
import { getClientes, deleteCliente } from '../../services/ClienteService.js';

const ClienteLista = () => {
  const [clientes, setClientes] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  // 🔹 Função para carregar clientes do backend
  const fetchClientes = async () => {
    try {
      setLoading(true);
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      alert('❌ Erro ao carregar a lista de clientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // 🔹 Deletar cliente
  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este cliente?')) {
      try {
        await deleteCliente(id);
        alert('✅ Cliente excluído com sucesso!');
        fetchClientes(); // Atualiza a lista
      } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        alert('❌ Erro ao excluir o cliente.');
      }
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 🔹 AppBar Superior */}
      <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Lista de Clientes
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 🔹 Sidebar */}
      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* 🔹 Conteúdo Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
        <Toolbar />
        <Box textAlign="center" mt={2} mb={2}>
          <Typography variant="h4" fontWeight="bold">Lista de Clientes</Typography>
        </Box>

        {/* 🔹 Botão para cadastrar */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="success"
            sx={{ backgroundColor: '#4CAF50', textTransform: 'none', fontWeight: 'bold' }}
            onClick={() => navigate('/clienteCadastro')}
          >
            + Cadastrar Cliente
          </Button>
        </Box>

        {/* 🔹 Loader enquanto busca dados */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
            <CircularProgress color="success" />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0px 4px 20px rgba(0,0,0,0.1)' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#4CAF50' }}>
                  {['ID', 'Nome', 'Email', 'CNPJ', 'Telefone', 'Ações'].map(header => (
                    <TableCell
                      key={header}
                      sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {clientes.length > 0 ? (
                  clientes.map(cliente => (
                    <TableRow key={cliente.id} sx={{ '&:hover': { backgroundColor: '#f1f1f1' } }}>
                      <TableCell align="center">{cliente.id}</TableCell>
                      <TableCell align="center">{cliente.nome}</TableCell>
                      <TableCell align="center">{cliente.email}</TableCell>
                      <TableCell align="center">{cliente.cnpj}</TableCell>
                      <TableCell align="center">{cliente.telefone}</TableCell>
                      <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton onClick={() => navigate(`/cliente/${cliente.id}`)}>
                          <FaEye style={{ color: '#666' }} />
                        </IconButton>
                        <IconButton onClick={() => navigate(`/clienteEditar/${cliente.id}`)}>
                          <FaEdit style={{ color: '#4CAF50' }} />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(cliente.id)}>
                          <FaTrashAlt style={{ color: '#e74c3c' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Nenhum cliente cadastrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default ClienteLista;
