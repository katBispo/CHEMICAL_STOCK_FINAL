import { FaEye, FaEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import React, { useEffect, useState, toast } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import SideBar from "../components/SideBar";
import AmostraDetailOverlay from "../components/amostraListaIcons/AmostraDetailOverlay";
import AmostraEditOverlay from "../components/amostraListaIcons/AmostraEditOverlay";
import AmostraExcluirOverlay from "../components/amostraListaIcons/AmostraExcluirOverlay";
import SelectAnaliseDaAmostra from "../components/SelectAnaliseDaAmostra";
import {
  getAmostrasComAnalises,
  deleteAmostra,
  encerrarAmostra,
} from "../../services/amostraService";
import EncerrarAmostraModal from "../components/EncerrarAmostraModal";
import { getAnalises } from "../../services/AnaliseService";
import { tabelaEstilo } from "../../styles/tabelaEstilo";

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
const AmostraLista = () => {
  const [amostras, setAmostras] = useState([]);
  const [analises, setAnalises] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedAmostra, setSelectedAmostra] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAmostraOverlay, setOpenAmostraOverlay] = useState(false);
  const [editOverlayOpen, setEditOverlayOpen] = useState(false);
  const [amostraToEdit, setAmostraToEdit] = useState(null);
  const [openDeleteOverlay, setOpenDeleteOverlay] = useState(false);
  const [selectedAmostras, setSelectedAmostras] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [openConfirmEncerrar, setOpenConfirmEncerrar] = useState(false);
  const [amostraParaEncerrar, setAmostraParaEncerrar] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [selectedAmostraId, setSelectedAmostraId] = useState(null);

  const handleOpenDeleteOverlay = (amostra) => {
    setSelectedAmostra(amostra);
    setOpenDeleteOverlay(true);
  };
  const handleOpenAmostraOverlay = () => setOpenAmostraOverlay(true);
  const handleCloseAmostraOverlay = () => {
    setOpenAmostraOverlay(false);
    // navigate("/amostraCadastro");
  };
  const handleCloseDeleteOverlay = () => {
    setOpenDeleteOverlay(false);
    setSelectedAmostra(null);
  };

  const handleCheckboxChange = (amostraId) => {
    setSelectedAmostras((prevSelected) => {
      if (prevSelected.includes(amostraId)) {
        return prevSelected.filter((id) => id !== amostraId);
      } else {
        return [...prevSelected, amostraId];
      }
    });
  };
  const handleEncerrarAmostra = async (id) => {
    try {
      await encerrarAmostra(id);
      toast.success("Amostra encerrada com sucesso!");

      setAmostras((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "ENCERRADA" } : a))
      );
    } catch (error) {
      console.error("Erro ao encerrar a amostra:", error);
      toast.error("Erro ao encerrar a amostra!");
    }
  };
  const handleSelectRow = (id) => {
    setSelectedAmostras((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedAmostras.length === amostras.length) {
      setSelectedAmostras([]);
    } else {
      setSelectedAmostras(amostras.map((amostra) => amostra.id));
    }
  };

  const handleDeleteAmostra = async (id) => {
    try {
      await deleteAmostra(`/amostra/${id}`);
      console.log("Amostra excluída com sucesso");

      // Atualiza a lista local
      setAmostras((prevAmostras) =>
        prevAmostras.filter((amostra) => amostra.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir a amostra:", error);
    } finally {
      handleCloseDeleteOverlay();
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditClick = (amostra) => {
    setAmostraToEdit(amostra);
    setEditOverlayOpen(true);
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const amostrasData = await getAmostrasComAnalises();
        console.log("Amostras com análises:", amostrasData);
        setAmostras(amostrasData);
      } catch (error) {
        console.error("Erro ao buscar amostras com análises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            Lista de Amostras
          </Typography>
        </Toolbar>
      </AppBar>

      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
        <Toolbar />

        <Box textAlign="center" mt={2} mb={2}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Lista de Amostras
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Button
            variant="contained"
            color="success"
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
            }}
            startIcon={
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span>
            }
            onClick={handleOpenAmostraOverlay}
          >
            Cadastrar Amostra
          </Button>
          <SelectAnaliseDaAmostra
            open={openAmostraOverlay}
            handleClose={handleCloseAmostraOverlay}
          />

          <Button
            variant="contained"
            color="error"
            style={{ textTransform: "none", fontWeight: "bold" }}
            onClick={() => {
              selectedAmostras.forEach((amostraId) => {
                handleDeleteAmostra(amostraId); // Exclui as amostras selecionadas
              });
              setSelectedAmostras([]); // limpa seleção após deletar
            }}
          >
            Excluir Selecionados
          </Button>
        </Box>

        <Box display="flex" justifyContent="space-around" mt={2}>
          <TableContainer
            component={Paper}
            style={{
              marginTop: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#4CAF50" }}>
                  {/* Adiciona a coluna de checkbox */}
                  <TableCell style={{ textAlign: "center" }}>
                    <Checkbox
                      checked={
                        selectedAmostras.length === amostras.length &&
                        amostras.length > 0
                      }
                      indeterminate={
                        selectedAmostras.length > 0 &&
                        selectedAmostras.length < amostras.length
                      }
                      onChange={handleSelectAll}
                      color="primary"
                    />
                  </TableCell>
                  {[
                    "Nome",
                    "Prazo Finalização",
                    "Endereço",
                    "Análise",
                    "Status",
                    "Ações",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {amostras.map((amostra) => (
                  <TableRow
                    key={amostra.id}
                    style={{
                      backgroundColor: "#fff",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f1f1f1")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fff")
                    }
                  >
                    {/* Checkbox para cada linha */}
                    <TableCell style={{ textAlign: "center" }}>
                      <Checkbox
                        checked={selectedAmostras.includes(amostra.id)}
                        onChange={() => handleSelectRow(amostra.id)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px", textAlign: "center" }}
                    >
                      {amostra.nome}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px", textAlign: "center" }}
                    >
                      {amostra.prazoFinalizacao}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px", textAlign: "center" }}
                    >
                      {amostra.enderecoColeta}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "14px", textAlign: "center" }}
                    >
                      {amostra.nomeAnalise || "Não associada"}
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          ...getStatusColor(amostra.status),
                          padding: "5px",
                          borderRadius: "15px",
                          textAlign: "center",
                          fontSize: "14px",
                          width: "150px",
                          margin: "0 auto",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        {amostra.status}
                      </Box>
                    </TableCell>

                    <TableCell
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                     <IconButton
  onClick={() => {
    setSelectedAmostraId(amostra.id);
    setOpenView(true);
  }}
>
  <FaEye />
</IconButton>

                      <IconButton
                        onClick={() => {
                          handleEditClick(amostra);
                        }}
                      >
                        <FaEdit
                          style={{ color: "#4CAF50", fontSize: "18px" }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDeleteOverlay(amostra)}
                      >
                        <FaTrashAlt
                          style={{ color: "#e74c3c", fontSize: "18px" }}
                        />
                      </IconButton>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setAmostraParaEncerrar(amostra);
                          setOpenConfirmEncerrar(true);
                        }}
                        disabled={
                          amostra.status === "ENCERRADA" ||
                          amostra.status === "CONCLUIDA"
                        }
                        sx={{
                          backgroundColor: "#B0BEC5",
                          color: "#000",
                          textTransform: "none",
                          fontWeight: "bold",
                          borderRadius: "20px",
                          "&:hover": {
                            backgroundColor: "#90A4AE",
                          },
                          "&:disabled": {
                            backgroundColor: "#E0E0E0",
                            color: "#9E9E9E",
                          },
                        }}
                      >
                        Encerrar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Modais de detalhes e edição */}
               <AmostraDetailOverlay
  open={openView}
  onClose={() => setOpenView(false)}
  amostraId={selectedAmostraId}
/>

                <AmostraEditOverlay
                  open={editOverlayOpen}
                  onClose={() => setEditOverlayOpen(false)}
                  amostra={amostraToEdit}
                />
                {selectedAmostra && (
                  <AmostraExcluirOverlay
                    open={openDeleteOverlay}
                    onClose={handleCloseDeleteOverlay}
                    onDelete={handleDeleteAmostra}
                    amostra={selectedAmostra}
                  />
                )}
                <EncerrarAmostraModal
                  open={openConfirmEncerrar}
                  onClose={() => setOpenConfirmEncerrar(false)}
                  amostraSelecionada={amostraParaEncerrar}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default AmostraLista;
