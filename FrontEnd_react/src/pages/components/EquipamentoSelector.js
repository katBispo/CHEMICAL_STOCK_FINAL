import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Button,
  Box,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import { getEquipamentos } from "../../services/EquipamentoService.js";

const EquipamentoSelector = ({
  open,
  handleClose,
  onEquipamentoSelect,
}) => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [selectedEquipamentos, setSelectedEquipamentos] = useState([]);

  useEffect(() => {
    if (!open) return;

    const fetchEquipamentos = async () => {
      try {
        const data = await getEquipamentos();
        setEquipamentos(data || []);
      } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
      }
    };

    fetchEquipamentos();
  }, [open]);

  const handleSave = () => {
    if (selectedEquipamentos.length === 0) {
      alert("Selecione pelo menos um equipamento.");
      return;
    }

    onEquipamentoSelect(selectedEquipamentos);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Selecionar Equipamentos</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Você pode selecionar um ou mais equipamentos
        </Typography>

        <Autocomplete
          multiple
          options={equipamentos}
          value={selectedEquipamentos}
          onChange={(event, newValue) => setSelectedEquipamentos(newValue)}
          getOptionLabel={(option) => option.nome || "Sem nome"}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.nome}
                {...getTagProps({ index })}
                color="warning"
                variant="outlined"
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pesquisar Equipamentos"
              placeholder="Digite para buscar..."
              margin="normal"
            />
          )}
        />

        {selectedEquipamentos.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2">
              Equipamentos selecionados ({selectedEquipamentos.length})
            </Typography>

            <Box mt={1}>
              {selectedEquipamentos.map((eq) => (
                <Typography key={eq.id} variant="body2">
                  • {eq.nome}
                </Typography>
              ))}
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="warning"
          disabled={selectedEquipamentos.length === 0}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EquipamentoSelector;
