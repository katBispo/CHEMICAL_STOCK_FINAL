import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Paper, Typography, Box } from "@mui/material";

const mockData = [
  { nome: "Balança", usos: 32 },
  { nome: "Centrífuga", usos: 20 },
  { nome: "PHmetro", usos: 14 },
  { nome: "Estufa", usos: 10 }
];

export default function ContagemUsoEquipamentos() {
  return (
    <Paper sx={{ p: 3, mt: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Contagem de Uso dos Equipamentos
      </Typography>

      <Box sx={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={mockData}>
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="usos" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
