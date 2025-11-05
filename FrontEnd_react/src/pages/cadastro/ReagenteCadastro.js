import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  TextField,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  Grid
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import { useNavigate } from 'react-router-dom';
import FeedbackDialog from '../components/FeedbackDialog'; 
import ReporEstoqueModal from '../components/ReposicaoReagentOverlay.js'

// Importando o service
import { 
  salvarReagente, 
  getTiposReagentes, 
  getUnidadesReagentes 
} from '../../services/reagenteService.js'

function ReagenteCadastro({ open, handleClose }) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const navigate = useNavigate();
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const [isEscolhaAcaoOpen, setIsEscolhaAcaoOpen] = useState(true); 
  const [isReporEstoqueOpen, setIsReporEstoqueOpen] = useState(false);

  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [lote, setLote] = useState('');
  const [controlado, setControlado] = useState('não');
  const [numeroControlado, setNumeroControlado] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [tiposReagentes, setTiposReagentes] = useState([]);
  const [selectedTipoReagente, setSelectedTipoReagente] = useState('');
  const [selectedUnidade, setSelectedUnidade] = useState(null);
  const [unidadesReagentes, setUnidadesReagentes] = useState([]);
  const [quantidadeDeFrascos, setQuantidadeDeFrascos] = useState('');
  const [quantidadePorFrasco, setQuantidadePorFrasco] = useState('');

  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const tipos = await getTiposReagentes();
        setTiposReagentes(tipos);

        const unidades = await getUnidadesReagentes();
        setUnidadesReagentes(unidades);
      } catch (error) {
        console.error('Erro ao buscar enums de reagentes:', error);
      }
    };

    fetchEnums();
  }, []);

  const handleSubmit = async () => {
    const data = {
      nome,
      marca,
      lote,
      dataValidade,
      controlado: controlado === 'sim',
      numeroControlado: controlado === 'sim' ? numeroControlado : null,
      tipo: selectedTipoReagente,
      unidadeReagente: selectedUnidade,
      quantidadeDeFrascos: Number(quantidadeDeFrascos),
      quantidadePorFrasco: Number(quantidadePorFrasco)
    };

    try {
      await salvarReagente(data);
      setDialogMessage('Reagente salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar reagente:', error);
      setDialogMessage('Erro ao salvar reagente');
    }

    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate('/listaReagentesCompleta');
  };

  return (
    <>
      {/* Modal de Escolha de Ação */}
      <Modal open={isEscolhaAcaoOpen} onClose={() => setIsEscolhaAcaoOpen(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            margin: "auto",
            marginTop: "100px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Escolha uma ação
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEscolhaAcaoOpen(false)}
            sx={{ m: 1, width: "80%" }}
          >
            Cadastrar Novo Reagente
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setIsEscolhaAcaoOpen(false);
              navigate("/reposicaoReagente");
            }}
            sx={{ m: 1, width: "80%" }}
          >
            Repor Estoque
          </Button>
        </Box>
      </Modal>

      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Cadastro de Reagentes
            </Typography>
          </Toolbar>
        </AppBar>

        <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
          <Toolbar />
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <Typography variant="h4" gutterBottom align="center">
              Cadastrar Reagente
            </Typography>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Grid container spacing={2}>
                {/* Nome, Marca, Lote, Data */}
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Nome do Reagente" required value={nome} onChange={(e) => setNome(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Marca do Reagente" required value={marca} onChange={(e) => setMarca(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Lote" required value={lote} onChange={(e) => setLote(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Data de Validade"
                    type="date"
                    required
                    InputLabelProps={{ shrink: true }}
                    value={dataValidade}
                    onChange={(e) => setDataValidade(e.target.value)}
                  />
                </Grid>

                {/* Tipo e Unidade */}
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    options={tiposReagentes}
                    getOptionLabel={(option) => option.toString()}
                    value={selectedTipoReagente}
                    onChange={(event, newValue) => setSelectedTipoReagente(newValue)}
                    renderInput={(params) => <TextField {...params} label="Tipo de Reagente" fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    options={unidadesReagentes}
                    getOptionLabel={(option) => option}
                    value={selectedUnidade}
                    onChange={(event, newValue) => setSelectedUnidade(newValue)}
                    renderInput={(params) => <TextField {...params} label="Unidade do Reagente" fullWidth />}
                  />
                </Grid>

                {/* Quantidade */}
                <Grid item xs={6}>
                  <TextField
                    label="Quantidade de Frascos"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={quantidadeDeFrascos}
                    onChange={(e) => setQuantidadeDeFrascos(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Volume por Frasco"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={quantidadePorFrasco}
                    onChange={(e) => setQuantidadePorFrasco(e.target.value)}
                  />
                </Grid>

                {/* Controlado */}
                <Grid item xs={12}>
                  <Typography variant="h6">Reagente Controlado</Typography>
                  <RadioGroup row value={controlado} onChange={(e) => setControlado(e.target.value)}>
                    <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                    <FormControlLabel value="não" control={<Radio />} label="Não" />
                  </RadioGroup>
                </Grid>

                {controlado === 'sim' && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Número do Reagente Controlado"
                      required
                      value={numeroControlado}
                      onChange={(e) => setNumeroControlado(e.target.value)}
                    />
                  </Grid>
                )}
              </Grid>

              <Box display="flex" justifyContent="center" marginTop={2}>
                <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
              </Box>
            </Box>

            <FeedbackDialog open={dialogOpen} message={dialogMessage} onClose={handleDialogClose} />

          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ReagenteCadastro;
