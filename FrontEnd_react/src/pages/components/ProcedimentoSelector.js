import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import { getProcedimentos } from "../../services/ProcedimentoService.js";

function ProcedimentoSelector({ onSave, onClose }) {
  const [procedures, setProcedures] = useState([]);
  const [selectedProcedures, setSelectedProcedures] = useState([]);

useEffect(() => {
  const fetchProcedures = async () => {
    const data = await getProcedimentos();
    setProcedures(Array.isArray(data) ? data : []);
  };
  fetchProcedures();
}, []);

  const handleSave = () => {
    onSave(selectedProcedures);
    onClose();
  };

  return (
    <Box sx={styles.overlay}>
      <Box sx={styles.content}>
        <Typography variant="h5" gutterBottom>
          Selecionar Procedimentos
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Você pode selecionar um ou mais procedimentos
        </Typography>

        {/* 🔎 AUTOCOMPLETE MULTIPLO */}
        <Autocomplete
          multiple
          options={procedures}
          value={selectedProcedures}
          onChange={(event, newValue) => setSelectedProcedures(newValue)}
          getOptionLabel={(option) =>
            option.nomeProcedimento || "Sem nome"
          }
          isOptionEqualToValue={(option, value) =>
            option.id === value.id
          }
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.nomeProcedimento}
                {...getTagProps({ index })}
                color="success"
                variant="outlined"
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pesquisar Procedimentos"
              placeholder="Digite para buscar..."
              margin="normal"
            />
          )}
          sx={{ width: "100%" }}
        />

        {/* 📋 RESUMO */}
        {selectedProcedures.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Procedimentos selecionados ({selectedProcedures.length})
            </Typography>

            <Box sx={{ maxHeight: 150, overflowY: "auto" }}>
              {selectedProcedures.map((proc) => (
                <Typography key={proc.id} variant="body2">
                  • {proc.nomeProcedimento}
                </Typography>
              ))}
            </Box>
          </>
        )}

        {/* 🔘 BOTÕES */}
        <Box
          display="flex"
          justifyContent="flex-end"
          gap={2}
          mt={3}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            color="success"
            disabled={selectedProcedures.length === 0}
            onClick={handleSave}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

/* 🎨 ESTILOS */
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1300,
  },
  content: {
    backgroundColor: "#fff",
    padding: 3,
    borderRadius: 2,
    width: "600px",
    maxHeight: "80vh",
    overflowY: "auto",
  },
};

export default ProcedimentoSelector;
