import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Modal,
  Divider,
  Chip,
} from "@mui/material";

import IndicadoresCardsStyles from "../../../styles/indicadoresCardsEstilo";

const KpiCard = ({ title, value, icon, color, subtitle, modalContent }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        sx={{
          height: "100%",
          borderLeft: `6px solid ${color}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" justifyContent="space-between">
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

            <Box sx={{ color }}>{icon}</Box>
          </Box>
        </CardContent>

        {/* BOTÃO VER MAIS */}
        {modalContent && (
          <Box px={2} pb={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setOpen(true)}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderColor: color,
                color: color,
                "&:hover": {
                  borderColor: color,
                  bgcolor: color + "11",
                },
              }}
            >
              Ver mais
            </Button>
          </Box>
        )}
      </Card>

      {/* OVERLAY */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 3,
            p: 3,
            width: { xs: "95%", md: 1000 },
            maxHeight: "85vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* HEADER DO OVERLAY */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>

            <Chip
              label={`${value} itens`}
              sx={{
                bgcolor: color + "22",
                color: color,
                fontWeight: 600,
              }}
            />
          </Box>

          {/* CONTEÚDO (LISTA DIRETA) */}
          <Box flexGrow={1} overflow="auto">
            {modalContent}
          </Box>

          {/* AÇÕES */}
          <Box textAlign="right" mt={2}>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default KpiCard;
