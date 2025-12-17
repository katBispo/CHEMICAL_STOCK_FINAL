import { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import SideBar from "../components/SideBar";
import { getResiduos, deletarResiduo } from "../../services/ResiduoService";
import ResiduoDetailOverlay from "../components/residuosListaIcons/ResiduoDetailOverlay";

const ResiduoLista = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [residuos, setResiduos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openView, setOpenView] = useState(false);

  const [selectedResiduos, setSelectedResiduos] = useState([]);
  const [selectedResiduo, setSelectedResiduo] = useState(null);
  const [openDeleteOverlay, setOpenDeleteOverlay] = useState(false);
  const [selectedResiduoId, setSelectedResiduoId] = useState(null);

const [openDetail, setOpenDetail] = useState(false);

  // ================= HANDLERS =================

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const handleOpenDeleteOverlay = (residuo) => {
    setSelectedResiduo(residuo);
    setOpenDeleteOverlay(true);
  };

  const handleCloseDeleteOverlay = () => {
    setOpenDeleteOverlay(false);
    setSelectedResiduo(null);
  };

  const handleSelectRow = (id) => {
    setSelectedResiduos((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleOpenDetail = (id) => {
  setSelectedResiduoId(id);
  setOpenDetail(true);
};

  const handleSelectAll = () => {
    if (selectedResiduos.length === residuos.length) {
      setSelectedResiduos([]);
    } else {
      setSelectedResiduos(residuos.map((r) => r.id));
    }
  };

  const handleDeleteResiduo = async (id) => {
    try {
      await deletarResiduo(id);
      setResiduos((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Erro ao excluir resíduo", error);
    } finally {
      handleCloseDeleteOverlay();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "EM_ESTOQUE":
        return { backgroundColor: "#ea3c0dff", color: "#fff" };
      case "TRATADO":
        return { backgroundColor: "#FF9800", color: "#fff" };
      case "DESCARTADO":
        return { backgroundColor: "#4CAF50", color: "#fff" };
      default:
        return { backgroundColor: "#9E9E9E", color: "#fff" };
    }
  };

  // ================= FETCH =================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getResiduos();
        setResiduos(data);
      } catch (error) {
        console.error("Erro ao buscar resíduos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= RENDER =================

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ bgcolor: "#4CAF50" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Lista de Resíduos
          </Typography>
        </Toolbar>
      </AppBar>

      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button
            variant="contained"
            color="success"
            sx={{ fontWeight: "bold" }}
          >
            + Cadastrar Resíduo
          </Button>

          <Button
            variant="contained"
            color="error"
            disabled={selectedResiduos.length === 0}
            onClick={() => {
              selectedResiduos.forEach(handleDeleteResiduo);
              setSelectedResiduos([]);
            }}
          >
            Excluir Selecionados
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#4CAF50" }}>
                <TableCell align="center">
                  <Checkbox
                    checked={
                      selectedResiduos.length === residuos.length &&
                      residuos.length > 0
                    }
                    indeterminate={
                      selectedResiduos.length > 0 &&
                      selectedResiduos.length < residuos.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {[
                  "Nome",
                  "Tipo",
                  "Estado Físico",
                  "Quantidade",
                  "Status",
                  "Ações",
                ].map((h) => (
                  <TableCell
                    key={h}
                    align="center"
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {!loading &&
                residuos.map((residuo) => (
                  <TableRow key={residuo.id} hover>
                    <TableCell align="center">
                      <Checkbox
                        checked={selectedResiduos.includes(residuo.id)}
                        onChange={() => handleSelectRow(residuo.id)}
                      />
                    </TableCell>
                    <TableCell align="center">{residuo.nome}</TableCell>
                    <TableCell align="center">{residuo.tipo}</TableCell>
                    <TableCell align="center">{residuo.estadoFisico}</TableCell>
                    <TableCell align="center">
                      {residuo.quantidade} {residuo.unidadeMedida}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          ...getStatusColor(residuo.status),
                          px: 2,
                          py: 0.5,
                          borderRadius: 5,
                          fontWeight: "bold",
                          display: "inline-block",
                        }}
                      >
                        {residuo.status}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
  onClick={() => {
    setSelectedResiduoId(residuo.id);
    setOpenView(true);
  }}
>
  <FaEye />
</IconButton>

                      <IconButton>
                        <FaEdit style={{ color: "#4CAF50" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDeleteOverlay(residuo)}
                      >
                        <FaTrashAlt style={{ color: "#e74c3c" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

              {/* Modais de detalhes e edição */}
             <ResiduoDetailOverlay
  open={openView}
  onClose={() => setOpenView(false)}
  residuoId={selectedResiduoId}
/>

            </TableBody>
          </Table>
        </TableContainer>

        {openDeleteOverlay && selectedResiduo && (
          <Box mt={2}>
            <Typography>
              Deseja excluir o resíduo <b>{selectedResiduo.nome}</b>?
            </Typography>
            <Button
              color="error"
              onClick={() => handleDeleteResiduo(selectedResiduo.id)}
            >
              Confirmar Exclusão
            </Button>
            <Button onClick={handleCloseDeleteOverlay}>Cancelar</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ResiduoLista;
