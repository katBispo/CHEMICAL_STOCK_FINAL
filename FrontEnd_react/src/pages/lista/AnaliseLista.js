import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import AnaliseDetailOverlay from "../components/analiseListaIcons/AnaliseDetailOverlay";
import AnaliseEditOverlay from "../components/analiseListaIcons/AnaliseEditOverlay";
import AnaliseExcluirOverlay from "../components/analiseListaIcons/AnaliseExcluirOverlay";
import { tabelaEstilo } from "../../styles/tabelaEstilo.js";
import { getAnalises, deleteAnalise } from "../../services/AnaliseService.js";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";

const AnaliseLista = () => {
  const [analise, setAnalise] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAnalise, setSelectedAnalise] = useState(null);
  const [openDeleteOverlay, setOpenDeleteOverlay] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOverlayOpen, setEditOverlayOpen] = useState(false);
  const [analiseToEdit, setAnaliseToEdit] = useState(null);

  const navigate = useNavigate();
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  // Recupera o papel (role) do usuário logado
  const role = localStorage.getItem("role");

  const fetchAnalises = async () => {
    try {
      const data = await getAnalises();
      setAnalise(data);
    } catch (error) {
      console.error("Erro ao carregar análises:", error);
    }
  };

  useEffect(() => {
    fetchAnalises();
  }, []);

  const handleOpenDeleteOverlay = (analise) => {
    setSelectedAnalise(analise);
    setOpenDeleteOverlay(true);
  };

  const handleCloseDeleteOverlay = () => {
    setOpenDeleteOverlay(false);
    setSelectedAnalise(null);
  };

  const handleDeleteAnalise = async (id) => {
    try {
      await deleteAnalise(id);
      console.log("Análise excluída com sucesso");
      fetchAnalises();
    } catch (error) {
      console.error("Erro ao excluir a análise:", error);
    }
    handleCloseDeleteOverlay();
  };

  const handleEditClick = (analise) => {
    setAnaliseToEdit(analise);
    setEditOverlayOpen(true);
  };

  const handleSave = (updatedAnalise) => {
    console.log("Análise salva:", updatedAnalise);
    setEditOverlayOpen(false);
    fetchAnalises();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "CONCLUIDA":
        return { backgroundColor: "green", color: "#fff" };
      case "EM_ANDAMENTO":
        return { backgroundColor: "yellow", color: "#000" };
      case "ATRASADA":
        return { backgroundColor: "red", color: "#fff" };
      default:
        return { backgroundColor: "gray", color: "#fff" };
    }
  };

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
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            Lista de Análises
          </Typography>
        </Toolbar>
      </AppBar>

      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
        <Toolbar />

        <Box textAlign="center" mt={2} mb={2}>
          <Typography variant="h4" fontWeight="bold">
            Lista de Análises
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          {/* Botão de Cadastrar Análise - apenas ADMIN */}
          {role === "ADMIN" && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
              }}
              startIcon={
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span>
              }
              onClick={() => navigate("/analiseCadastro")}
            >
              Cadastrar Análise
            </Button>
          )}

          {/* Botão Gerar - visível para todos */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
            }}
            startIcon={
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span>
            }
            onClick={() => navigate("/analiseCadastro")}
          >
            Gerar
          </Button>
        </Box>

        <Box display="flex" justifyContent="center" mt={2}>
          <TableContainer component={Paper} sx={tabelaEstilo.container}>
            <Table>
              <TableHead>
                <TableRow sx={tabelaEstilo.cabecalho}>
                  {[
                    "Nome",
                    "Contrato",
                    "Matriz",
                    "Quantidade de Amostras",
                    "Prazo Final",
                    "Status",
                    "Ações",
                  ].map((header) => (
                    <TableCell key={header} sx={tabelaEstilo.celulaCabecalho}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {analise.map((analise) => (
                  <TableRow
                    key={analise.id}
                    sx={tabelaEstilo.linha}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        tabelaEstilo.linhaHover.backgroundColor)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        tabelaEstilo.linha.backgroundColor)
                    }
                  >
                    <TableCell sx={tabelaEstilo.celula}>
                      {analise.nome}
                    </TableCell>
                    <TableCell sx={tabelaEstilo.celula}>
                      {analise.nomeContrato || ""}
                    </TableCell>
                    <TableCell sx={tabelaEstilo.celula}>
                      {analise.nomeMatriz || ""}
                    </TableCell>
                    <TableCell sx={tabelaEstilo.celula}>
                      {analise.quantidadeAmostras}
                    </TableCell>
                    <TableCell sx={tabelaEstilo.celula}>
                      {new Date(analise.prazoFinalizacao).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          ...tabelaEstilo.statusBox,
                          ...getStatusColor(analise.statusAnalise),
                        }}
                      >
                        {analise.statusAnalise}
                      </Box>
                    </TableCell>

                    {/* Ações: mostrar editar/excluir só para ADMIN */}
                    <TableCell sx={tabelaEstilo.botoesAcoes}>
                      {/* Visualizar - todos */}
                      <IconButton
                        onClick={() => {
                          handleOpen();
                          setSelectedAnalise(analise);
                        }}
                      >
                        <FaEye style={{ color: "#666", fontSize: "18px" }} />
                      </IconButton>

                      {/* Editar - apenas ADMIN */}
                      {role === "ADMIN" && (
                        <IconButton onClick={() => handleEditClick(analise)}>
                          <FaEdit
                            style={{ color: "#4CAF50", fontSize: "18px" }}
                          />
                        </IconButton>
                      )}

                      {/* Excluir - apenas ADMIN */}
                      {role === "ADMIN" && (
                        <IconButton
                          onClick={() => handleOpenDeleteOverlay(analise)}
                        >
                          <FaTrashAlt
                            style={{ color: "#e74c3c", fontSize: "18px" }}
                          />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Overlays */}
        {selectedAnalise && (
          <AnaliseDetailOverlay
            open={open}
            onClose={handleClose}
            analise={selectedAnalise}
          />
        )}

        <AnaliseEditOverlay
          open={editOverlayOpen}
          onClose={() => setEditOverlayOpen(false)}
          analise={analiseToEdit}
          onSave={handleSave}
        />

        {selectedAnalise && (
          <AnaliseExcluirOverlay
            open={openDeleteOverlay}
            onClose={handleCloseDeleteOverlay}
            onDelete={handleDeleteAnalise}
            analise={selectedAnalise}
          />
        )}
      </Box>
    </Box>
  );
};

export default AnaliseLista;
