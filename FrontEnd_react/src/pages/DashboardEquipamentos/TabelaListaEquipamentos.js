import React, { useState } from "react";
import { Paper, IconButton } from "@mui/material";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import ListaEquipamentosCompleta from "./overlayTabelas/ListaEquipamentosCompleta";

import EquipamentoExcluirOverlay from "../components/equiapamentosListaIcons/EquipamentoExcluirOverlay";
import EquipamentoDetailOverlay from "../components/equiapamentosListaIcons/EquipamentoDetailOverlay";
import EquipamentoEditOverlay from "../components/equiapamentosListaIcons/EquipamentoditOverlay";

const TabelaListaEquipamentos = ({ equipamentos, onSave }) => {
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showFullTable, setShowFullTable] = useState(false);

  const handleOpenDetail = (equipamento) => {
    setSelectedEquipamento(equipamento);
    setOpenDetail(true);
  };

  const handleOpenEdit = (equipamento) => {
    setSelectedEquipamento(equipamento);
    setOpenEdit(true);
  };

  const handleOpenDelete = (equipamento) => {
    setSelectedEquipamento(equipamento);
    setOpenDelete(true);
  };

  const handleDeleteEquipamento = async (id) => {
    const response = await fetch(`http://localhost:8080/equipamentos/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Equipamento excluído com sucesso");
    } else {
      console.error("Erro ao excluir equipamento");
    }

    setOpenDelete(false);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          position: "relative",
          overflowX: "auto",
          borderRadius: "10px",
          height: "270px",
          margin: "0 auto",
        }}
      >
        {/* Overlay inicial */}
        {showOverlay && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(8px)",
              borderRadius: "16px",
              padding: "30px 40px",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                fontWeight: "500",
                marginBottom: "16px",
              }}
            >
              Visualização rápida da lista de equipamentos
            </p>
            <button
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.0)",
                transition: "all 0.3s ease",
              }}
              onClick={() => {
                setShowOverlay(false);
                setShowFullTable(true);
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
            >
              Ver mais
            </button>
          </div>
        )}

        {/* Tabela resumida */}
        <table style={{ width: "100%" }}>
          <thead style={{ backgroundColor: "#4CAF50" }}>
            <tr>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Classificação</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Data Cadastro</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipamentos.map((e) => (
              <tr
                key={e.id}
                style={{ transition: "background-color 0.3s" }}
                onMouseEnter={(ev) =>
                  (ev.currentTarget.style.backgroundColor = "#f9f9f9")
                }
                onMouseLeave={(ev) =>
                  (ev.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <td style={tdStyle}>{e.nome || "—"}</td>
                <td style={tdStyle}>{e.classificacao || "—"}</td>
                <td style={tdStyle}>{e.status || "—"}</td>
                <td style={tdStyle}>{e.dataCadastro || "—"}</td>
                <td style={tdStyle}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <IconButton onClick={() => handleOpenDetail(e)}>
                      <FaEye style={{ color: "#666", fontSize: "18px" }} />
                    </IconButton>
                    <IconButton onClick={() => handleOpenEdit(e)}>
                      <FaEdit style={{ color: "#4CAF50", fontSize: "18px" }} />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDelete(e)}>
                      <FaTrashAlt
                        style={{ color: "#e74c3c", fontSize: "18px" }}
                      />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>

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
          onDelete={() => handleDeleteEquipamento(selectedEquipamento.id)}
          equipamento={selectedEquipamento}
        />
      )}

      {showFullTable && (
        <ListaEquipamentosCompleta
          equipamentos={equipamentos}
          onClose={() => setShowFullTable(false)}
          onSave={onSave}
        />
      )}
    </>
  );
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

export default TabelaListaEquipamentos;