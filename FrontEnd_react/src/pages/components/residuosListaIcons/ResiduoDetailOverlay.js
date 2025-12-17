import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Button,
  TextField,
  Chip,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import jsPDF from "jspdf";
import { getResiduoById } from "../../../services/ResiduoService";

const ResiduoDetailOverlay = ({ open, onClose, residuoId }) => {
  const [residuo, setResiduo] = useState(null);
  const [quantidadeEtiquetas, setQuantidadeEtiquetas] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && residuoId) {
      setLoading(true);
      getResiduoById(residuoId)
        .then((data) => {
          console.log("RESÍDUO COMPLETO:", data);
          setResiduo(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar resíduo:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [open, residuoId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "EM_ESTOQUE":
        return "success";
      case "TRATADO":
        return "warning";
      case "DESCARTADO":
        return "error";
      default:
        return "default";
    }
  };

  const handleDownloadPDF = () => {
    if (!residuo) return;

    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text(`Etiqueta de Resíduo`, 10, 10);
    doc.text(`Nome: ${residuo.nome}`, 10, 20);
    doc.text(`Tipo: ${residuo.tipo}`, 10, 30);
    doc.text(`Estado Físico: ${residuo.estadoFisico}`, 10, 40);
    doc.text(
      `Quantidade: ${residuo.quantidade} ${residuo.unidadeMedida}`,
      10,
      50
    );
    doc.text(`Status: ${residuo.status}`, 10, 60);
    doc.text(
      `Data de Geração: ${residuo.dataGeracao || "N/A"}`,
      10,
      70
    );

    doc.save("etiqueta_residuo.pdf");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          outline: "none",
          maxWidth: "600px",
          width: "90%",
        }}
      >
        {/* Cabeçalho */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Detalhes do Resíduo</Typography>
          <IconButton onClick={onClose}>
            <FaTimes />
          </IconButton>
        </Box>

        {loading && <Typography>Carregando...</Typography>}

        {!loading && residuo && (
          <>
            <Typography>
              <strong>Nome:</strong> {residuo.nome}
            </Typography>

            <Typography>
              <strong>Tipo:</strong> {residuo.tipo}
            </Typography>

            <Typography>
              <strong>Estado Físico:</strong> {residuo.estadoFisico}
            </Typography>

            <Typography>
              <strong>Quantidade:</strong>{" "}
              {residuo.quantidade} {residuo.unidadeMedida}
            </Typography>

            <Typography>
              <strong>Data de Geração:</strong>{" "}
              {residuo.dataGeracao || "Não informada"}
            </Typography>

            <Typography>
              <strong>Data de Descarte:</strong>{" "}
              {residuo.dataDescarte || "Ainda não descartado"}
            </Typography>

            <Typography>
              <strong>Observações:</strong>{" "}
              {residuo.observacao || "Nenhuma"}
            </Typography>

            <Box mt={2}>
              <strong>Status:</strong>{" "}
              <Chip
                label={residuo.status}
                color={getStatusColor(residuo.status)}
                sx={{ fontWeight: "bold" }}
              />
            </Box>

            {/* Etiquetas */}
            <Box mt={3} display="flex" alignItems="center">
              <TextField
                label="Qtd. Etiquetas"
                type="number"
                value={quantidadeEtiquetas}
                onChange={(e) =>
                  setQuantidadeEtiquetas(Number(e.target.value) || 1)
                }
                sx={{ mr: 2, width: "150px" }}
                inputProps={{ min: 1 }}
              />
              <Button
                variant="contained"
                color="success"
                onClick={handleDownloadPDF}
              >
                Baixar Etiquetas
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ResiduoDetailOverlay;
