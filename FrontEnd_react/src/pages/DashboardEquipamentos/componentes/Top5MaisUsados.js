import React from "react";
import { Paper, Typography, Box, LinearProgress } from "@mui/material";

const mockTop5 = [
  { nome: "Centrífuga", usos: 40 },
  { nome: "Balança", usos: 35 },
  { nome: "PHmetro", usos: 22 },
  { nome: "Microscópio", usos: 16 },
  { nome: "Banho Maria", usos: 10 }
];

export default function Top5MaisUsados() {
  return (
    <Paper sx={{ p: 3, mt: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Top 5 Equipamentos Mais Usados
      </Typography>

      {mockTop5.map((item, index) => (
        <Box key={index} mb={2}>
          <Typography fontWeight="bold">{item.nome}</Typography>
          <LinearProgress
            variant="determinate"
            value={(item.usos / mockTop5[0].usos) * 100}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#E0E0E0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2196F3",
              },
            }}
          />
        </Box>
      ))}
    </Paper>
  );
}
