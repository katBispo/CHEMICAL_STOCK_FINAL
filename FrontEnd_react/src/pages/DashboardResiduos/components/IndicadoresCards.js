// src/components/IndicadoresCards.jsx
import React, { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fade,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Importando os estilos
import IndicadoresCardsEstilo from '../../../styles/indicadoresCardsEstilo'

const IndicadoresCards = ({ indicadores }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // === DADOS MOCKADOS ===
  const detalhesMock = {
    "Análises em andamento": [
      { id: "A001", amostra: "Água Potável", técnico: "João Silva", início: "05/11 09:30" },
      { id: "A002", amostra: "Solo Agrícola", técnico: "Maria", início: "05/11 10:15" },
    ],
    "Aguardando resultado": [
      { id: "B001", amostra: "pH Solo", lab: "Lab Química", enviado: "04/11 14:20" },
    ],
    "Finalizadas": [
      { id: "C001", amostra: "Água Subterrânea", concluído: "05/11 08:00", resultado: "Aprovado" },
    ],
    "Com atraso": [
      { id: "D001", amostra: "Esgoto Industrial", prazo: "04/11 17:00", atraso: "12h" },
    ],
  };

  const handleOpenModal = (card) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCard(null);
  };

  const getColumns = () => {
    if (!selectedCard) return [];
    const data = detalhesMock[selectedCard.titulo] || [];
    return data.length > 0 ? Object.keys(data[0]).filter(k => k !== "id") : [];
  };

  // Usando os estilos importados
  const styles = IndicadoresCardsEstilo;

  return (
    <>
      {/* === CARDS === */}
      <Grid container spacing={3} sx={styles.container}>
        {indicadores.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Fade in timeout={300 + index * 150}>
              <Paper elevation={4} sx={styles.card(card.cor)}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      {card.titulo}
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" color={card.cor} mt={1}>
                      {card.valor}
                    </Typography>
                  </Box>
                  <Box sx={styles.iconWrapper(card.cor)}>
                    {card.icon}
                  </Box>
                </Box>

                {/* BOTÃO VER MAIS */}
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleOpenModal(card)}
                  sx={styles.verMaisButton(card.cor)}
                >
                  Ver mais
                </Button>
              </Paper>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* === MODAL === */}
      <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition sx={styles.modal}>
        <Box sx={styles.modalBox}>
          {selectedCard && (
            <>
              <Box sx={styles.modalHeader}>
                <Box sx={styles.modalIcon(selectedCard.cor)}>
                  {selectedCard.icon}
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {selectedCard.titulo}
                  </Typography>
                  <Typography variant="h3" color={selectedCard.cor} fontWeight="bold">
                    {selectedCard.valor}
                  </Typography>
                </Box>
              </Box>

              {detalhesMock[selectedCard.titulo]?.length > 0 ? (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>ID</strong></TableCell>
                        {getColumns().map(col => (
                          <TableCell key={col}>
                            <strong>
                              {col.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </strong>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detalhesMock[selectedCard.titulo].map(row => (
                        <TableRow key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          {getColumns().map(col => (
                            <TableCell key={col}>
                              {row[col] === "Aprovado" ? (
                                <Typography color="success.main" fontWeight="bold">{row[col]}</Typography>
                              ) : row[col] === "Reprovado" ? (
                                <Typography color="error.main" fontWeight="bold">{row[col]}</Typography>
                              ) : (
                                row[col]
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography sx={styles.emptyState}>
                  Nenhuma análise detalhada disponível.
                </Typography>
              )}

              <Box sx={styles.closeButton}>
                <Button variant="contained" onClick={handleCloseModal}>
                  Fechar
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default IndicadoresCards;