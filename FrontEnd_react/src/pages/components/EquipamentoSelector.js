import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Autocomplete, Button
} from '@mui/material';
import { getEquipamentos } from '../../services/EquipamentoService.js';

const EquipamentoSelector = ({ selectedEquipamentos, handleClose, onEquipamentoSelect, open }) => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);

  useEffect(() => {
    if (!open) return;

    const fetchEquipamentos = async () => {
      try {
        const data = await getEquipamentos(); // ✅ GET simples
        if (!data || data.length === 0) {
          console.warn("⚠️ Nenhum equipamento retornado");
          return;
        }
        setEquipamentos(data);
      } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
      }
    };

    fetchEquipamentos();
  }, [open]);

  const handleSave = () => {
    if (!selectedEquipamento) {
      alert("Selecione pelo menos um equipamento.");
      return;
    }
    onEquipamentoSelect([selectedEquipamento]); // ✅ envia como array
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Escolha o Equipamento</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={equipamentos}
          getOptionLabel={(option) => option.nome || ""}
          onChange={(event, value) => setSelectedEquipamento(value)}
          value={selectedEquipamento}
          renderInput={(params) => (
            <TextField {...params} label="Equipamento" required margin="normal" />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Fechar</Button>
        <Button onClick={handleSave} color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EquipamentoSelector;