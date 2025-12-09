// src/pages/DashboardEquipamentos/overlayTabelas/ListaEquipamentosCompleta.js
import React, { useState, useEffect } from "react";
import { Paper, IconButton } from "@mui/material";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import OverlayFiltroEquipamento from "./OverlayFiltroEquipamento";
import EquipamentoExcluirOverlay from "../../components/equiapamentosListaIcons/EquipamentoExcluirOverlay";
import EquipamentoEditOverlay from "../../components/equiapamentosListaIcons/EquipamentoditOverlay";
import EquipamentoDetailOverlay from "../../components/equiapamentosListaIcons/EquipamentoDetailOverlay";
const ListaEquipamentosCompleta = ({ equipamentos, onClose, onSave }) => {
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEquipamentos, setFilteredEquipamentos] = useState(equipamentos);

  const [showFiltroOverlay, setShowFiltroOverlay] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      axios
        .get("http://localhost:8080/equipamento")
        .then((res) => setFilteredEquipamentos(res.data))
        .catch((err) => console.error(err));
    } else {
      axios
        .get(
          `http://localhost:8080/equipamento/buscarEquipamento?nome=${encodeURIComponent(
            searchTerm
          )}`
        )
        .then((res) => setFilteredEquipamentos(res.data))
        .catch((err) => console.error(err));
    }
  }, [searchTerm]);

  const handleConfirmDelete = async () => {
    const response = await fetch(
      `http://localhost:8080/equipamento/${selectedEquipamento.id}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      console.log("Equipamento excluído com sucesso");
    } else {
      console.error("Erro ao excluir equipamento");
    }

    setOpenDelete(false);
    setSelectedEquipamento(null);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Botão para fechar */}
        <button
          onClick={() => {
            onClose();
            window.location.reload();
          }}
          style={{
            alignSelf: "flex-end",
            background: "transparent",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            color: "#444",
            marginBottom: "10px",
          }}
        >
          ✕
        </button>

        {/* Barra de busca + botões */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button onClick={() => {}} style={buttonStyle("#4CAF50")}>
            Buscar
          </button>
          <button
            onClick={() => setShowFiltroOverlay(true)}
            style={buttonStyle("#13529b")}
          >
            Filtrar
          </button>
        </div>

        {/* Tabela */}
        <Paper
          elevation={4}
          sx={{
            overflowX: "auto",
            borderRadius: "12px",
            width: "100%",
          }}
        >
          <table style={{ width: "100%" }}>
            <thead style={{ backgroundColor: "#4CAF50" }}>
              <tr>
                <th style={thStyle}>Nome</th>
                <th style={thStyle}>Categoria</th>
                <th style={thStyle}>Fabricante</th>
                <th style={thStyle}>Data Cadastro</th>
                <th style={thStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipamentos.map((eq) => (
                <tr
                  key={eq.id}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fff")
                  }
                >
                  <td style={tdStyle}>{eq.nomeEquipamento}</td>
                  <td style={tdStyle}>{eq.categoriaNome}</td>
                  <td style={tdStyle}>{eq.fabricante}</td>
                  <td style={tdStyle}>{eq.dataCadastro}</td>
                  <td style={tdStyle}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          setSelectedEquipamento(eq);
                          setOpenDetail(true);
                        }}
                      >
                        <FaEye style={{ color: "#666" }} />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          setSelectedEquipamento(eq);
                          setOpenEdit(true);
                        }}
                      >
                        <FaEdit style={{ color: "#4CAF50" }} />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          setSelectedEquipamento(eq);
                          setOpenDelete(true);
                        }}
                      >
                        <FaTrashAlt style={{ color: "#e74c3c" }} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </div>

      {/* Overlays */}
      {selectedEquipamento && openDetail && (
        <EquipamentoDetailOverlay
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          equipamento={selectedEquipamento}
        />
      )}

      {selectedEquipamento && openEdit && (
        <EquipamentoEditOverlay
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          equipamento={selectedEquipamento}
          onSave={onSave}
        />
      )}

      {selectedEquipamento && openDelete && (
        <EquipamentoExcluirOverlay
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onDelete={handleConfirmDelete}
          equipamento={selectedEquipamento}
        />
      )}

      {showFiltroOverlay && (
        <OverlayFiltroEquipamento
          open={showFiltroOverlay}
          onClose={() => setShowFiltroOverlay(false)}
        />
      )}
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "20px",
  maxWidth: "90%",
  maxHeight: "90%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
};

const thStyle = {
  color: "#fff",
  padding: "12px 24px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "12px 24px",
};

const buttonStyle = (color) => ({
  backgroundColor: color,
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
});

export default ListaEquipamentosCompleta;
