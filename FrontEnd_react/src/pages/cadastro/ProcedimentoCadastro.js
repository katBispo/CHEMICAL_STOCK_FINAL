import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, List, ListItem, Checkbox, Typography } from '@mui/material';

const ProcedimentoSelector = ({ onSave, onClose }) => {
  const [procedures, setProcedures] = useState([]);
  const [selectedProcedures, setSelectedProcedures] = useState([]);

  // Função para buscar procedimentos
  const fetchProcedures = async () => {
    try {
      const response = await fetch('http://localhost:8080/procedimento');
      if (response.ok) {
        const data = await response.json();
        setProcedures(data);
      } else {
        console.error('Erro ao buscar procedimentos');
      }
    } catch (error) {
      console.error('Erro ao conectar ao backend:', error);
    }
  };

  // Carregar procedimentos ao montar o componente
  useEffect(() => {
    fetchProcedures();
  }, []);

  // Função para lidar com a seleção de procedimentos
  const handleSelectProcedure = (procedimento) => {
    setSelectedProcedures((prevSelected) => {
      if (prevSelected.includes(procedimento)) {
        return prevSelected.filter((item) => item !== procedimento);
      } else {
        return [...prevSelected, procedimento];
      }
    });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          width: '500px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Selecione os Procedimentos
        </Typography>

        <TextField
          label="Pesquisar Procedimentos"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <List>
          {procedures.map((procedimento, index) => (
            <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={selectedProcedures.includes(procedimento)}
                onChange={() => handleSelectProcedure(procedimento)}
              />
              <Typography>{procedimento.nome || 'Nome não disponível'}</Typography>
            </ListItem>
          ))}
        </List>

        <Box display="flex" justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={() => onSave(selectedProcedures)} // Passa a lista de procedimentos selecionados
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProcedimentoSelector;
