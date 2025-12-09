import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Paper, Typography, Box } from "@mui/material";

const mockData = [
  { name: "Calibração", value: 12 },
  { name: "Ensaios", value: 30 },
  { name: "Manutenção", value: 8 },
  { name: "Limpeza", value: 15 }
];

const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#F44336"];

export default function DistribuicaoProcedimento() {
  return (
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Distribuição por Procedimento
      </Typography>

      <Box display="flex" justifyContent="center">
        <PieChart width={300} height={250}>
          <Pie
            data={mockData}
            cx={150}
            cy={100}
            innerRadius={50}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {mockData.map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Box>
    </Paper>
  );
}
