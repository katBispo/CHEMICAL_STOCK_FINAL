import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { tabelaEstilo } from "../../styles/tabelaEstilo.js";
import {
  getEquipamentos,
  deletarEquipamento,
} from "../../services/EquipamentoService.js";

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

const EquipamentoLista = () => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);

  const navigate = useNavigate();
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const role = localStorage.getItem("role");

  const fetchEquipamentos = async () => {
    try {
      const data = await getEquipamentos();
      setEquipamentos(data);
    } catch (error) {
      console.error("Erro ao carregar equipamentos:", error);
    }
  };

  useEffect(() => {
    fetchEquipamentos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este equipamento?")) {
      try {
        await deletarEquipamento(id);
        fetchEquipamentos();
      } catch (error) {
        console.error("Erro ao excluir equipamento:", error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ATIVO":
        return { backgroundColor: "#4CAF50", color: "#fff" };
      case "INATIVO":
        return { backgroundColor: "#9E9E9E", color: "#fff" };
      case "MANUTENCAO":
        return { backgroundColor: "#FFC107", color: "#000" };
      default:
        return { backgroundColor: "#BDBDBD", color: "#fff" };
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
            Lista de Equipamentos
          </Typography>
        </Toolbar>
      </AppBar>

      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
        <Toolbar />

        <Box textAlign="center" mt={2} mb={2}>
          <Typography variant="h4" fontWeight="bold">
            Lista de Equipamentos
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
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
              onClick={() => navigate("/equipamentoCadastro")}
            >
              Cadastrar Equipamento
            </Button>
          )}
        </Box>

        <Box display="flex" justifyContent="center" mt={2}>
          <TableContainer component={Paper} sx={tabelaEstilo.container}>
            <Table>
              <TableHead>
                <TableRow sx={tabelaEstilo.cabecalho}>
                  {[
                    "Nome",
                    "Fabricante",
                    "Modelo",
                    "Número de Série",
                    "Status",
                    "Descrição",
                    "Ações",
                  ].map((header) => (
                    <TableCell key={header} sx={tabelaEstilo.celulaCabecalho}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {equipamentos.map((equip) => (
                  <TableRow
                    key={equip.id}
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
                    <TableCell sx={tabelaEstilo.celula}>{equip.nome}</TableCell>
                    <TableCell sx={tabelaEstilo.celula}>
                      {equip.fabricante}
                    </TableCell>
                    <TableCell sx={tabelaEstilo.celula}>
                      {equip.modelo}
                    </TableCell>
                    <TableCell sx={tabelaEstilo.celula}>
                      {equip.numeroSerie}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          ...tabelaEstilo.statusBox,
                          ...getStatusColor(equip.status),
                        }}
                      >
                        {equip.status}
                      </Box>
                    </TableCell>
                    <TableCell sx={tabelaEstilo.celula}>
                      {equip.descricao}
                    </TableCell>

                    {/* Ações */}
                    <TableCell sx={tabelaEstilo.botoesAcoes}>
                      <IconButton
                        onClick={() => setSelectedEquipamento(equip)}
                        title="Visualizar"
                      >
                        <FaEye style={{ color: "#666", fontSize: "18px" }} />
                      </IconButton>

                      {role === "ADMIN" && (
                        <>
                          <IconButton
                            onClick={() =>
                              navigate(`/equipamentoEditar/${equip.id}`)
                            }
                            title="Editar"
                          >
                            <FaEdit
                              style={{ color: "#4CAF50", fontSize: "18px" }}
                            />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(equip.id)}
                            title="Excluir"
                          >
                            <FaTrashAlt
                              style={{ color: "#e74c3c", fontSize: "18px" }}
                            />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default EquipamentoLista;
