import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Slide,
  Box,
  Typography,
  IconButton,
  Backdrop
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { atualizarUsuario } from "../../services/usuarioService";

// Animação do Modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditarUsuarioOverlay = ({ usuario, onClose }) => {
  const [formData, setFormData] = useState({
    nome: usuario.nome,
    cpf: usuario.cpf,
    email: usuario.email,
    crq: usuario.crq,
    cargo: usuario.cargo,
    dataAdmissao: usuario.dataAdmissao,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function salvar() {
    try {
      await atualizarUsuario(usuario.id, formData);
      alert("Dados atualizados com sucesso!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      alert("Erro ao atualizar usuário.");
    }
  }

  return (
    <Dialog
      open
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
      BackdropComponent={(props) => (
        <Backdrop
          {...props}
          sx={{
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)", // deixa o fundo visível e borrado
          }}
        />
      )}
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: "#f7f9f8",
        },
      }}
    >
      {/* Título */}
      <DialogTitle sx={{ background: "#1b5e20", color: "white" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Editar Informações</Typography>

          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Conteúdo */}
      <DialogContent sx={{ mt: 2 }}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            margin="normal"
            disabled
          />

          <TextField
            fullWidth
            label="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="CRQ"
            name="crq"
            value={formData.crq}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Data de Admissão"
            name="dataAdmissao"
            type="date"
            value={formData.dataAdmissao}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </DialogContent>

      {/* Ações */}
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          sx={{ textTransform: "none" }}
        >
          Cancelar
        </Button>

        <Button
          onClick={salvar}
          variant="contained"
          color="success"
          sx={{ textTransform: "none" }}
        >
          Salvar Alterações
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarUsuarioOverlay;
