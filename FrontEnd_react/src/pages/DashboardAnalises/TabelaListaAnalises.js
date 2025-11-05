// src/pages/DashboardAnalises/TabelaListaAnalises.js
import React, { useState } from "react";
import { Paper, IconButton } from "@mui/material";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import AnaliseDetailOverlay from "../../pages/components/analiseListaIcons/AnaliseDetailOverlay";
import AnaliseEditOverlay from "../../pages/components/analiseListaIcons/AnaliseEditOverlay";
import AnaliseExcluirOverlay from "../../pages/components/analiseListaIcons/AnaliseExcluirOverlay";
import ListaAnalisesCompleta from "./overlayTabelas/ListaAnalisesCompleta";

const TabelaListaAnalises = ({ analises, onSave }) => {
  const [selectedAnalise, setSelectedAnalise] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showFullTable, setShowFullTable] = useState(false);

  const handleOpenDetail = (analise) => {
    setSelectedAnalise(analise);
    setOpenDetail(true);
  };

  const handleOpenEdit = (analise) => {
    setSelectedAnalise(analise);
    setOpenEdit(true);
  };

  const handleOpenDelete = (analise) => {
    setSelectedAnalise(analise);
    setOpenDelete(true);
  };

  const handleDeleteAnalise = async (id) => {
    const response = await fetch(`http://localhost:8080/analise/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Análise excluída com sucesso");
    } else {
      console.error("Erro ao excluir análise");
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
          width: "600px",
          margin: "0 auto",
        }}
      >
        {/* Overlay de destaque inicial */}
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
              Visualização rápida da lista de análises
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
              onMouseEnter={(e) =>
                (e.target.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.target.style.transform = "scale(1.0)")
              }
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
              <th style={thStyle}>Matriz</th>
              <th style={thStyle}>Contrato</th>
              <th style={thStyle}>Data Cadastro</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {analises.map((a) => (
              <tr
                key={a.id}
                style={{ transition: "background-color 0.3s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9f9f9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <td style={tdStyle}>{a.nomeAnalise || "—"}</td>
                <td style={tdStyle}>{a.matrizNome || "—"}</td>
                <td style={tdStyle}>{a.contratoNome || "—"}</td>
                <td style={tdStyle}>{a.dataCadastro || "—"}</td>
                <td style={tdStyle}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <IconButton onClick={() => handleOpenDetail(a)}>
                      <FaEye style={{ color: "#666", fontSize: "18px" }} />
                    </IconButton>
                    <IconButton onClick={() => handleOpenEdit(a)}>
                      <FaEdit style={{ color: "#4CAF50", fontSize: "18px" }} />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDelete(a)}>
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

      {/* --- Overlays --- */}
      {selectedAnalise && openDetail && (
        <AnaliseDetailOverlay
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          analise={selectedAnalise}
        />
      )}
      {selectedAnalise && openEdit && (
        <AnaliseEditOverlay
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          analise={selectedAnalise}
          onSave={onSave}
        />
      )}
      {selectedAnalise && openDelete && (
        <AnaliseExcluirOverlay
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onDelete={() => handleDeleteAnalise(selectedAnalise.id)}
          analise={selectedAnalise}
        />
      )}

      {showFullTable && (
        <ListaAnalisesCompleta
          analises={analises}
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

export default TabelaListaAnalises;
