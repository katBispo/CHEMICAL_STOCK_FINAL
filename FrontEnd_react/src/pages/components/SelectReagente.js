import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { getReagentes } from "../../services/reagenteService.js";

function SelectReagente({ open, onClose, onSave }) {
  const [reagentesDisponiveis, setReagentesDisponiveis] = useState([]);
  const [selecionados, setSelecionados] = useState([]);

  // Busca reagentes do backend via service
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

  // Adiciona reagente à lista de selecionados
  const handleSelecionar = (reagente) => {
    const jaSelecionado = selecionados.find(
      (item) => item.reagente.id === reagente.id
    );
    if (!jaSelecionado) {
      setSelecionados([...selecionados, { reagente, quantidade: 1 }]);
    }
  };

  // Atualiza a quantidade
  const handleQuantidadeChange = (index, novaQuantidade) => {
    const novos = [...selecionados];
    novos[index].quantidade = Number(novaQuantidade);
    setSelecionados(novos);
  };

  // Salva seleção
  const handleSalvar = () => {
    onSave(selecionados);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Selecionar Reagentes</DialogTitle>
      <DialogContent>
        <List>
          {reagentesDisponiveis.length > 0 ? (
            reagentesDisponiveis.map((reagente) => (
              <ListItem
                key={reagente.id}
                button
                onClick={() => handleSelecionar(reagente)}
              >
                <ListItemText primary={reagente.nome} />
              </ListItem>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "gray" }}>
              Nenhum reagente encontrado.
            </p>
          )}
        </List>

        <h4>Selecionados:</h4>
        {selecionados.map((item, index) => (
          <div key={item.reagente.id} style={{ marginBottom: "10px" }}>
            {item.reagente.nome}
            <TextField
              label="Quantidade"
              type="number"
              value={item.quantidade}
              onChange={(e) => handleQuantidadeChange(index, e.target.value)}
              style={{ marginLeft: "10px", width: "100px" }}
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSalvar} variant="contained" color="primary">
          Salvar Seleção
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SelectReagente;
