import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Modal,
  Divider,
} from "@mui/material";

import IndicadoresCardsStyles from "../../../styles/indicadoresCardsEstilo";

const KpiCard = ({ title, value, icon, color, subtitle, modalContent }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <Card sx={IndicadoresCardsStyles.card(color)}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                {title}
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                {value}
              </Typography>

              {subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>

            <Box sx={IndicadoresCardsStyles.iconWrapper(color)}>
              {icon}
            </Box>
          </Box>

          {/* BOTÃO VER MAIS */}
          <Button
            variant="outlined"
            size="small"
            sx={IndicadoresCardsStyles.verMaisButton(color)}
            onClick={() => setOpen(true)}
          >
            Ver mais
          </Button>
        </CardContent>
      </Card>

      {/* MODAL / OVERLAY */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={IndicadoresCardsStyles.modal}
      >
        <Box sx={IndicadoresCardsStyles.modalBox}>
          {/* HEADER */}
          <Box sx={IndicadoresCardsStyles.modalHeader}>
            <Box sx={IndicadoresCardsStyles.modalIcon(color)}>
              {icon}
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total: {value}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* CONTEÚDO DINÂMICO */}
          {modalContent ? (
            modalContent
          ) : (
            <Typography sx={IndicadoresCardsStyles.emptyState}>
              Nenhuma informação adicional disponível.
            </Typography>
          )}

          <Box sx={IndicadoresCardsStyles.closeButton}>
            <Button onClick={() => setOpen(false)} variant="contained">
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default KpiCard;
