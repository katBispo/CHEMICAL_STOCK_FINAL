import React, { useState, useEffect } from "react";
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
    drawerOpen,
    Grid

} from '@mui/material';import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';


const ReposicaoReagentOverlay = ({ onClose }) => {
  const [reagentes, setReagentes] = useState([]);
  const [selectedReagente, setSelectedReagente] = useState(null);
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [lote, setLote] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [controlado, setControlado] = useState('não');
  const [numeroControlado, setNumeroControlado] = useState('');
  const [quantidadeDeFrascos, setquantidadeDeFrascos] = useState('');
  const [quantidadePorFrasco, setquantidadePorFrasco] = useState('');
  const [selectedTipoReagente, setSelectedTipoReagente] = useState('');
  const [selectedUnidade, setSelectedUnidade] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(true);


  // Carregar reagentes cadastrados
  const fetchReagentes = async () => {
      try {
          const response = await fetch('http://localhost:8080/reagente');
          if (response.ok) {
              const data = await response.json();
              setReagentes(data); // Armazena a lista de reagentes
          } else {
              console.error('Erro ao buscar reagentes');
          }
      } catch (error) {
          console.error('Erro ao conectar ao backend:', error);
      }
  };

  useEffect(() => {
      fetchReagentes(); // Carregar os reagentes na primeira vez
  }, []);

  const handleSubmit = () => {
      // Lógica para salvar o novo reagente
      console.log('Reagente salvo:', {
          nome,
          marca,
          lote,
          tipo: selectedTipoReagente,
          unidadeReagente: selectedUnidade,
          dataValidade,
          controlado: controlado === 'sim',
          numeroControlado: controlado === 'sim' ? numeroControlado : null,
          quantidadeDeFrascos: Number(quantidadeDeFrascos),
          quantidadePorFrasco: Number(quantidadePorFrasco),
      });
  };
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);


  return (
    <Box sx={{ display: 'flex' }}>
         <AppBar position="fixed" sx={{ bgcolor: '#4CAF50', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Reposição de Reagentes
                    </Typography>
                </Toolbar>
            </AppBar>

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
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
                    Reposição de Reagentdddddes
                </Typography>
                <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Grid container spacing={2}>
                        {/* Autocomplete para reagentes cadastrados */}
                        <Grid item xs={12}>
                            <Autocomplete
                                options={reagentes}
                                getOptionLabel={(option) => option.nome}
                                onChange={(event, value) => {
                                    setSelectedReagente(value);
                                    if (value) {
                                        // Preenche os campos automaticamente com os dados do reagente selecionado
                                        setNome(value.nome);
                                        setMarca(value.marca);
                                        setLote(value.lote);
                                        setSelectedTipoReagente(value.tipo);
                                        setSelectedUnidade(value.unidade);
                                    } else {
                                        // Limpar campos se nenhum reagente for selecionado
                                        setNome('');
                                        setMarca('');
                                        setLote('');
                                        setSelectedTipoReagente('');
                                        setSelectedUnidade('');
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Reagentes Cadastrados" required margin="normal" />
                                )}
                            />
                        </Grid>

                        {/* Nome e Marca */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nome do Reagente"
                                value={nome}
                                disabled={Boolean(selectedReagente)}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Marca do Reagente"
                                value={marca}
                                disabled={Boolean(selectedReagente)}
                                onChange={(e) => setMarca(e.target.value)}
                            />
                        </Grid>

                        {/* Lote */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Lote"
                                value={lote}
                                disabled={Boolean(selectedReagente)}
                                onChange={(e) => setLote(e.target.value)}
                            />
                        </Grid>

                        {/* Tipo e Unidade do Reagente */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tipo de Reagente"
                                value={selectedTipoReagente}
                                disabled={Boolean(selectedReagente)}
                                onChange={(e) => setSelectedTipoReagente(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Unidade do Reagente"
                                value={selectedUnidade}
                                disabled={Boolean(selectedReagente)}
                                onChange={(e) => setSelectedUnidade(e.target.value)}
                            />
                        </Grid>

                        {/* Campos Editáveis */}
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

                        {/* Reagente Controlado */}
                        <Grid item xs={12}>
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
                                    value={numeroControlado}
                                    onChange={(e) => setNumeroControlado(e.target.value)}
                                />
                            </Grid>
                        )}

                        <Grid item xs={6}>
                            <TextField
                                label="Quantidade de Frascos"
                                variant="outlined"
                                type="number"
                                fullWidth
                                value={quantidadeDeFrascos}
                                onChange={(e) => setquantidadeDeFrascos(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Volume por Frasco"
                                variant="outlined"
                                type="number"
                                fullWidth
                                value={quantidadePorFrasco}
                                onChange={(e) => setquantidadePorFrasco(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    {/* Botão de salvar */}
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
);
};

export default ReposicaoReagentOverlay;
