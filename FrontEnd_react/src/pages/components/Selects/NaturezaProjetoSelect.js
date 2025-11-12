import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { getNaturezasProjeto } from "../services/NaturezaProjetoService";

function NaturezaProjetoSelect({ value, onChange }) {
  const [naturezas, setNaturezas] = useState([]);

  useEffect(() => {
    async function fetchNaturezas() {
      try {
        const data = await getNaturezasProjeto();
        setNaturezas(data);
      } catch (error) {
        console.error("Erro ao carregar naturezas de projeto:", error);
      }
    }
    fetchNaturezas();
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        select
        label="Natureza do Projeto"
        value={value}
        onChange={onChange}
        fullWidth
      >
        {naturezas.map((n) => (
          <MenuItem key={n} value={n}>
            {n.replaceAll("_", " ")}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default NaturezaProjetoSelect;
