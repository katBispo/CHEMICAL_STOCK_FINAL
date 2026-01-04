import React, { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Chip from "@mui/material/Chip";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Autocomplete,
} from "@mui/material";
import { getReagentes } from "../../services/reagenteService.js";

function SelectReagente({ open, onClose, onSave }) {
  const [reagentesDisponiveis, setReagentesDisponiveis] = useState([]);
  const [selecionados, setSelecionados] = useState([]);

  useEffect(() => {
    const fetchReagentes = async () => {
      try {
        const data = await getReagentes();

        if (Array.isArray(data)) {
          setReagentesDisponiveis(data);
        } else {
          console.error("Resposta inesperada da API:", data);
          setReagentesDisponiveis([]);
        }
      } catch (error) {
        console.error("Erro ao buscar reagentes:", error);
        setReagentesDisponiveis([]);
      }
    };

    if (open) fetchReagentes();
  }, [open]);

  const handleSelecionar = (reagente) => {
    const jaSelecionado = selecionados.find(
      (item) => item.reagente.id === reagente.id
    );

    if (!jaSelecionado) {
      setSelecionados([...selecionados, { reagente, quantidade: 1 }]);
    }
  };

  const handleQuantidadeChange = (index, novaQuantidade) => {
    const novos = [...selecionados];
    novos[index].quantidade = Number(novaQuantidade);
    setSelecionados(novos);
  };

  const handleSalvar = () => {
    onSave(selecionados);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Selecionar Reagentes</DialogTitle>

      <DialogContent>
        {/* AUTOCOMPLETE DE REAGENTES */}
        <Autocomplete
          multiple
          options={reagentesDisponiveis}
          getOptionLabel={(option) => option.nome}
          value={selecionados.map((s) => s.reagente)}
          onChange={(event, novosSelecionados) => {
            const atualizados = novosSelecionados.map((reagente) => {
              const existente = selecionados.find(
                (item) => item.reagente.id === reagente.id
              );

              return existente ?? { reagente, quantidade: 1 };
            });

            setSelecionados(atualizados);
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.nome}
                {...getTagProps({ index })}
                key={option.id}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar reagente"
              placeholder="Digite o nome do reagente"
              fullWidth
            />
          )}
        />

        {/* QUANTIDADE POR REAGENTE */}
        <h4 style={{ marginTop: 20 }}>Quantidades</h4>

        {selecionados.map((item, index) => (
          <div
            key={item.reagente.id}
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <span style={{ flex: 1 }}>{item.reagente.nome}</span>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <TextField
                label="Quantidade"
                type="number"
                size="small"
                inputProps={{ min: 1 }}
                value={item.quantidade}
                onChange={(e) => handleQuantidadeChange(index, e.target.value)}
                style={{ width: 120 }}
              />

              <span style={{ fontWeight: 500 }}>
                {item.reagente.unidadeReagente}
              </span>
            </div>
          </div>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSalvar} variant="contained">
          Salvar Seleção
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default SelectReagente;
