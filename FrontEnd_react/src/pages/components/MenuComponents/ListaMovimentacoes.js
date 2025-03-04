import React from "react";
import { Box, Typography, Card, CardContent, Chip, Divider } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const movimentacoes = [
  { data: "05/03", tipo: "Entrada", reagente: "Ácido Clorídrico", quantidade: 20 },
  { data: "04/03", tipo: "Saída", reagente: "Hidróxido de Sódio", quantidade: 5 },
  { data: "03/03", tipo: "Entrada", reagente: "Sulfato de Cobre", quantidade: 10 },
  { data: "02/03", tipo: "Saída", reagente: "Ácido Sulfúrico", quantidade: 7 },
];

const ListaMovimentacoes = () => {
  return (
    <Card sx={{ minWidth: 300, maxWidth: 400, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Últimas Movimentações de Estoque
      </Typography>
      {movimentacoes.map((mov, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Card sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {mov.reagente}
              </Typography>
              <Typography variant="caption" sx={{ color: "gray" }}>
                {mov.data}
              </Typography>
            </Box>
            <Chip
              label={`${mov.tipo} (+${mov.quantidade})`}
              color={mov.tipo === "Entrada" ? "success" : "error"}
              size="small"
              sx={{
                backgroundColor: mov.tipo === "Entrada" ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)",
                color: mov.tipo === "Entrada" ? "#4CAF50" : "#F44336",
                fontWeight: "bold",
              }}
            />
          </Card>
          {index !== movimentacoes.length - 1 && <Divider sx={{ mt: 1 }} />} {/* Divider para separar as movimentações */}
        </Box>
      ))}
    </Card>
  );
};

export default ListaMovimentacoes;
