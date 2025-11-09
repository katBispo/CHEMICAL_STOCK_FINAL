import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Box, Typography, Paper } from "@mui/material";

const GraficoStatusAnalises = () => {
  // 🔹 Dados simulados (mock)
  const data = [
    { status: "Atrasadas", quantidade: 12 },
    { status: "Em andamento", quantidade: 28 },
    { status: "Concluídas", quantidade: 40 },
  ];

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: "#fff",
        boxShadow: 3,
        height: 400,
        width:450,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, textAlign: "center" }}>
        Status das Análises
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />

            {/* 🔹 Barras com cores distintas para cada status */}
            <Bar dataKey="quantidade" name="Quantidade" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default GraficoStatusAnalises;
