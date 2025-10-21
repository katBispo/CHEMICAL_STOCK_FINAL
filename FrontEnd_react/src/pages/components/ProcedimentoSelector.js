import React, { useState, useEffect } from "react"; 
import { Autocomplete, TextField, Button } from "@mui/material"; 
import { getProcedimentos } from "../../services/ProcedimentoService.js"; // service correto

function ProcedimentoSelector({ onSave, onClose }) {
  const [procedures, setProcedures] = useState([]); // Lista de procedimentos carregados
  const [selectedProcedures, setSelectedProcedures] = useState([]); // Lista de procedimentos selecionados

  // Busca os procedimentos do backend usando o service
  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const data = await getProcedimentos(); // service retorna os dados já processados
        console.log("Procedimentos carregados:", data);
        setProcedures(data);
      } catch (error) {
        console.error("Erro ao buscar procedimentos:", error);
      }
    };

    fetchProcedures();
  }, []);

  // Atualiza a lista de procedimentos selecionados
  const handleSelect = (event, value) => {
    console.log("Selecionado:", value);
    setSelectedProcedures(value);
  };

  // Remove um procedimento da lista de selecionados
  const handleRemove = (id) => {
    setSelectedProcedures((prev) => prev.filter((proc) => proc.id !== id));
  };

  // Salva os procedimentos e fecha o modal
  const handleSave = () => {
    console.log("Procedimentos salvos:", selectedProcedures);
    onSave(selectedProcedures);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.content}>
        <h2>Selecionar Procedimentos</h2>

        {/* Campo de busca com seleção múltipla */}
        <Autocomplete
          multiple
          options={procedures}
          getOptionLabel={(option) => option.nomeProcedimento || "Sem nome"}
          onChange={handleSelect}
          value={selectedProcedures} 
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pesquisar Procedimentos"
              margin="normal"
              style={{ width: "80%", marginBottom: "10px" }}
            />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />

        {/* Lista de procedimentos selecionados */}
        <h3>Procedimentos Selecionados</h3>
        <ul style={styles.list}>
          {selectedProcedures.map((proc) => (
            <li key={proc.id} style={styles.listItem}>
              {proc.nomeProcedimento}
              <button
                onClick={() => handleRemove(proc.id)}
                style={styles.removeButton}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>

        {/* Botões de ação */}
        <Button variant="contained" onClick={handleSave} sx={{ margin: 1 }}>
          Salvar
        </Button>
        <Button variant="outlined" onClick={onClose} sx={{ margin: 1 }}>
          Fechar
        </Button>
      </div>
    </div>
  );
}

// Estilos do componente
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "50%",
    textAlign: "center",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
    borderBottom: "1px solid #ddd",
  },
  removeButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default ProcedimentoSelector;
