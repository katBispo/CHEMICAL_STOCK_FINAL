import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

function ProcedimentoSelector({ onSave, onClose }) {
  const [procedures, setProcedures] = useState([]); // Armazena os procedimentos carregados do backend
  const [selectedProcedures, setSelectedProcedures] = useState([]);

  // Função para buscar os procedimentos do backend
  const fetchProcedures = async () => {
    try {
      const response = await fetch('http://localhost:8080/procedimento');
      if (response.ok) {
        const data = await response.json();
        setProcedures(data); // Preenche o estado com os dados recebidos
      } else {
        console.error('Erro ao buscar procedimentos');
      }
    } catch (error) {
      console.error('Erro ao conectar ao backend:', error);
    }
  };

  useEffect(() => {
    fetchProcedures(); // Chama a função para buscar os procedimentos ao carregar o componente
  }, []); // A dependência vazia garante que a requisição seja feita uma vez ao montar o componente

  // Função para adicionar um procedimento à lista de selecionados
  const handleSelect = (event, value) => {
    if (value && !selectedProcedures.some((proc) => proc.id === value.id)) {
      setSelectedProcedures([...selectedProcedures, value]);
    }
  };

  // Função para remover um procedimento da lista de selecionados
  const handleRemove = (id) => {
    setSelectedProcedures(
      selectedProcedures.filter((procedure) => procedure.id !== id)
    );
  };

  const handleSave = () => {
    onSave(selectedProcedures); // Envia os procedimentos selecionados para a tela de cadastro de amostra
    onClose(); // Fecha o modal
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.content}>
        <h2>Selecionar Procedimentos</h2>

        {/* Campo de busca utilizando o Autocomplete */}
        <Autocomplete
          options={procedures} // Procedimentos carregados do backend
          getOptionLabel={(option) => option.nomeProcedimento || ""} // Ajuste para a propriedade correta
          onChange={handleSelect} // Atualiza o procedimento selecionado
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pesquisar Procedimentos"
              margin="normal"
              style={{ width: '80%', marginBottom: '10px' }}
            />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id} // Compara corretamente pelo ID
        />

        {/* Procedimentos selecionados */}
        <h3>Procedimentos Selecionados</h3>
        <ul style={styles.list}>
          {selectedProcedures.map((proc) => (
            <li key={proc.id} style={styles.listItem}>
              {proc.nomeProcedimento} {/* Corrigido para a propriedade correta */}
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
        <button onClick={handleSave} style={styles.button}>
          Salvar
        </button>
        <button onClick={onClose} style={styles.button}>
          Fechar
        </button>
      </div>
    </div>
  );
}

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
    zIndex: 1000,
  },
  content: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
  },
  button: {
    padding: "10px 15px",
    margin: "5px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
  },
  addButton: {
    padding: "5px 10px",
    marginLeft: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  removeButton: {
    padding: "5px 10px",
    marginLeft: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "#fff",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    textAlign: "left",
  },
  listItem: {
    marginBottom: "10px",
  },
};

export default ProcedimentoSelector;
