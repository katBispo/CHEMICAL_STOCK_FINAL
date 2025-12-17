import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import jsPDF from "jspdf";
import { getAmostraById } from "../../../services/amostraService";

const AmostraDetailOverlay = ({ open, onClose, amostraId }) => {
  const [amostra, setAmostra] = useState(null);
  const [quantidadeEtiquetas, setQuantidadeEtiquetas] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && amostraId) {
      setLoading(true);
      getAmostraById(amostraId)
        .then((data) => {
          console.log("AMOSTRA COMPLETA:", data);
          setAmostra(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar amostra:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [open, amostraId]);

  const handleDownloadPDF = () => {
    if (!amostra) return;

    const doc = new jsPDF();
    doc.text(`Amostra: ${amostra.nome}`, 10, 10);
    doc.save("etiqueta_amostra.pdf");
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
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Detalhes da Amostra</Typography>
          <IconButton onClick={onClose}>
            <FaTimes />
          </IconButton>
        </Box>

        {loading && <Typography>Carregando...</Typography>}

        {!loading && amostra && (
          <>
            <Typography><strong>Nome:</strong> {amostra.nome}</Typography>
            <Typography><strong>Data Cadastro:</strong> {amostra.dataCadastro}</Typography>
            <Typography><strong>Prazo Finalização:</strong> {amostra.prazoFinalizacao}</Typography>
            <Typography><strong>Endereço:</strong> {amostra.enderecoColeta}</Typography>
            <Typography><strong>Descrição:</strong> {amostra.descricao}</Typography>

            <Typography>
              <strong>Procedimentos:</strong>{" "}
              {amostra.procedimentosNomes?.length
                ? amostra.procedimentosNomes.join(", ")
                : "Nenhum"}
            </Typography>

            <Typography>
              <strong>Análise:</strong> {amostra.analise?.nome || "N/A"}
            </Typography>

            <Typography>
              <strong>Analitos:</strong>
            </Typography>

            {amostra.analitosSelecionados?.length ? (
              amostra.analitosSelecionados.map((a, i) => (
                <Typography key={i} sx={{ ml: 2 }}>
                  • {a.classificacao} - {a.subtipo}
                </Typography>
              ))
            ) : (
              <Typography>Nenhum analito selecionado</Typography>
            )}

            <Box mt={3} display="flex" alignItems="center">
              <TextField
                label="Qtd. Etiquetas"
                type="number"
                value={quantidadeEtiquetas}
                onChange={(e) =>
                  setQuantidadeEtiquetas(Number(e.target.value) || 1)
                }
                sx={{ mr: 2 }}
              />
              <Button variant="contained" onClick={handleDownloadPDF}>
                Baixar Etiquetas
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AmostraDetailOverlay;
