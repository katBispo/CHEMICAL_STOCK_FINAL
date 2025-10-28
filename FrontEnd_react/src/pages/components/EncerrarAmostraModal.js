import React from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { encerrarAmostra } from "../../services/amostraService";

const EncerrarAmostraModal = ({
  open,
  onClose,
  amostraSelecionada,
}) => {
  const navigate = useNavigate();

  const handleConfirmar = async () => {
    try {
      await encerrarAmostra(amostraSelecionada.id);
      onClose();
      alert("Amostra encerrada com sucesso!");
      navigate("/amostraLista");
    } catch (error) {
      console.error(error);
      alert("Erro ao encerrar a amostra.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "12px",
          p: 4,
          width: 400,
          textAlign: "center",
        }}
      >
        <Typography id="modal-title" variant="h6" fontWeight="bold" mb={2}>
          Encerrar Amostra
        </Typography>

        <Typography id="modal-description" mb={3}>
          Deseja realmente encerrar a amostra{" "}
          <strong>{amostraSelecionada?.nome}</strong>?
        </Typography>

        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" color="error" onClick={handleConfirmar}>
            Sim
          </Button>

          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: "#B0BEC5",
              color: "#000",
              "&:hover": { backgroundColor: "#90A4AE" },
            }}
          >
            Não
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EncerrarAmostraModal;
