import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AnalitoSelector from "../components/AnalitoSelector";
import ProcedimentoSelector from "../components/ProcedimentoSelector";
import EquipamentoSelector from "../components/EquipamentoSelector";

import SideBar from "../components/SideBar";
import { salvarAmostra } from "../../services/amostraService.js";
import Amostra from "../../models/AmostraModel.js";

import { getAnalises } from "../../services/AnaliseService.js";
import { getProcedimentos } from "../../services/ProcedimentoService.js";

function AmostraCadastro() {
  const [showAnalitoSelector, setShowAnalitoSelector] = useState(false);
  const [showProcedureSelector, setShowProcedureSelector] = useState(false);
  const [selectedAnalitos, setSelectedAnalitos] = useState([]);
  const [selectedProcedures, setSelectedProcedures] = useState([]);
  const [selectedEquipamentos, setSelectedEquipamentos] = useState([]);

  const [showEquipamentoSelector, setShowEquipamentoSelector] = useState(false);

  const [procedimentos, setProcedimentos] = useState([]);
  const [analise, setAnalise] = useState([]);
  const [nome, setNome] = useState("");
  const [dataColeta, setDataColeta] = useState("");
  const [prazoFinalizacao, setPrazoFinalizacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [enderecoColeta, setEnderecoColeta] = useState("");
  const [coordenadaColeta, setCoordenadaColeta] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const location = useLocation();

  const { selectedAnalise } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analisesData = await getAnalises();
        setAnalise(analisesData);

        const procedimentosData = await getProcedimentos();
        setProcedimentos(procedimentosData);
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    };

    fetchData();
  }, [
    showAnalitoSelector,
    showProcedureSelector,
    selectedAnalise,
    selectedProcedures,
    selectedAnalitos,
  ]);

  const handleCloseOverlay = () => {
    setShowAnalitoSelector(false);
  };

  const handleCloseProcedureSelector = () => {
    setShowProcedureSelector(false);
  };

  const handleSaveProcedures = (procedures) => {
    setSelectedProcedures(procedures || []);
    setShowProcedureSelector(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProcedures?.length) {
      alert("Por favor, selecione pelo menos um procedimento.");
      return;
    }

    if (!selectedAnalise) {
      alert("Por favor, selecione uma análise.");
      return;
    }

    if (!selectedAnalitos?.length) {
      alert("Por favor, selecione pelo menos um analito com subtipo.");
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];

    const novaAmostra = new Amostra(
      nome,
      dataColeta,
      prazoFinalizacao,
      enderecoColeta,
      descricao,
      currentDate,
      coordenadaColeta,
      selectedAnalise.id,
      selectedProcedures.map((p) => p.id),
      "EM_ANDAMENTO",
      selectedAnalitos
    );

    try {
      await salvarAmostra(novaAmostra);
      console.log("✅ Amostra salva com sucesso!");
      console.log("Payload enviado:", novaAmostra);

      setNome("");
      setDescricao("");
      setCoordenadaColeta("");
      setSelectedProcedures([]);
      setSelectedAnalitos([]);
      setShowAnalitoSelector(false);
      setShowProcedureSelector(false);

      navigate("/");
    } catch (error) {
      console.error("Erro ao salvar a amostra:", error);
      console.log("Payload enviado:", novaAmostra);

      alert("Erro ao salvar a amostra. Verifique o console para detalhes.");
    }
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ bgcolor: "#4CAF50", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cadastro de Amostras
          </Typography>
        </Toolbar>
      </AppBar>

      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
        <Toolbar />
        <Box
          sx={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Cadastrar Amostra
          </Typography>

          {selectedAnalise && (
            <Box
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle1">
                <strong>Análise selecionada:</strong> {selectedAnalise.nome}
              </Typography>
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            <Box display="flex" justifyContent="flex-start" gap={2}>
              <TextField
                label="Nome"
                required
                margin="normal"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                sx={{ width: "350px" }}
              />
              <TextField
                label="Endereço"
                required
                margin="normal"
                value={enderecoColeta}
                onChange={(e) => setEnderecoColeta(e.target.value)}
                sx={{ width: "350px" }}
              />
            </Box>

            <Box display="flex" justifyContent="flex-start" gap={2}>
              <TextField
                label="Data de Início"
                type="date"
                required
                margin="normal"
                value={dataColeta}
                onChange={(e) => setDataColeta(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: "350px" }}
              />
              <TextField
                label="Prazo de Finalização"
                type="date"
                required
                margin="normal"
                value={prazoFinalizacao}
                onChange={(e) => setPrazoFinalizacao(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: "300px" }}
              />
            </Box>
            {/* 🔽 CAMPO DE COORDENADAS ABAIXO DA DATA DE INÍCIO */}
            <Box display="flex" justifyContent="flex-start">
              <TextField
                label="Coordenadas da Coleta"
                margin="normal"
                value={coordenadaColeta}
                onChange={(e) => setCoordenadaColeta(e.target.value)}
                sx={{ width: "350px" }}
                placeholder="Ex: 123.456;789.012"
                helperText="Digite as coordenadas no formato: xxx;yyy"
              />
            </Box>

            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                onClick={() => {
                  setShowProcedureSelector(true);
                  console.log(
                    "Botão Selecionar Procedimentos clicado, showProcedureSelector:",
                    true
                  );
                }}
                sx={{
                  width: "350px",
                  height: "50px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  "&:hover": { backgroundColor: "#45a049" },
                }}
              >
                Selecionar Procedimentos
              </Button>

              {selectedProcedures?.length > 0 && (
                <Box
                  sx={{
                    backgroundColor: "#f9f9f9",
                    padding: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    width: "350px",
                  }}
                >
                  <Typography variant="subtitle1">
                    Procedimentos Selecionados:
                  </Typography>
                  <List>
                    {selectedProcedures.map((procedure, index) => (
                      <ListItem key={index}>
                        <Typography variant="body2">
                          {procedure.nomeProcedimento}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              <Button
                onClick={() => {
                  setShowAnalitoSelector(true);
                  console.log(
                    "Botão Selecionar Analitos clicado, showAnalitoSelector:",
                    true
                  );
                }}
                sx={{
                  width: "350px",
                  height: "50px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  "&:hover": { backgroundColor: "#45a049" },
                }}
              >
                Selecionar Analitos
              </Button>

              {/* Botão Selecionar Equipamentos */}
              {/* Botão Selecionar Equipamentos */}
              <Button
                onClick={() => {
                  setShowEquipamentoSelector(true);
                }}
                sx={{
                  width: "350px",
                  height: "50px",
                  backgroundColor: "#ff9800",
                  color: "white",
                  "&:hover": { backgroundColor: "#e68900" },
                }}
              >
                Selecionar Equipamentos
              </Button>

              {/* ✅ EXIBIÇÃO DOS EQUIPAMENTOS SELECIONADOS */}
              {selectedEquipamentos?.length > 0 && (
                <Box
                  sx={{
                    backgroundColor: "#f9f9f9",
                    padding: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    width: "350px",
                    mt: 1,
                  }}
                >
                  <Typography variant="subtitle1">
                    Equipamentos Selecionados:
                  </Typography>

                  <List>
                    {selectedEquipamentos.map((equipamento) => (
                      <ListItem key={equipamento.id}>
                        <Typography variant="body2">
                          {equipamento.nome}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {selectedAnalitos?.length > 0 && (
                <Box
                  sx={{
                    backgroundColor: "#f9f9f9",
                    padding: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    width: "350px",
                  }}
                >
                  <Typography variant="subtitle1">
                    Analitos Selecionados:
                  </Typography>
                  <List>
                    {Object.entries(
                      selectedAnalitos.reduce((acc, analito) => {
                        if (!acc[analito.classificacao]) {
                          acc[analito.classificacao] = [];
                        }
                        acc[analito.classificacao].push(analito.subtipo);
                        return acc;
                      }, {})
                    ).map(([classificacao, subtipos], index) => (
                      <ListItem key={index}>
                        <Typography variant="body2">
                          {classificacao} - {subtipos.join(", ")}
                        </Typography>
                      </ListItem>
                    ))}
                    
                  </List>
                </Box>
              )}

              {showProcedureSelector && (
                <ProcedimentoSelector
                  open={showProcedureSelector}
                  onSave={handleSaveProcedures}
                  onClose={handleCloseProcedureSelector}
                />
              )}

              {showAnalitoSelector && (
                <AnalitoSelector
                  open={showAnalitoSelector}
                  selectedAnalitos={selectedAnalitos}
                  onAnalitoSelect={setSelectedAnalitos}
                  handleClose={handleCloseOverlay}
                />
              )}

              {/* ✅ Modal de Equipamentos */}
              {showEquipamentoSelector && (
                <EquipamentoSelector
                  open={showEquipamentoSelector}
                  selectedEquipamentos={selectedEquipamentos}
                  onEquipamentoSelect={setSelectedEquipamentos}
                  handleClose={() => setShowEquipamentoSelector(false)}
                />
              )}
            </Box>

            <Box display="flex" justifyContent="center" marginTop={2}>
              <Button type="submit" variant="contained" color="primary">
                Cadastrar
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default AmostraCadastro;
