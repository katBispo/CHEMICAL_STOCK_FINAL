import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Dados de exemplo
const dadosMock = {
  amostrasAtrasadas: [
    { mes: "Jan", quantidade: 5 },
    { mes: "Fev", quantidade: 8 },
    { mes: "Mar", quantidade: 3 },
    { mes: "Abr", quantidade: 6 },
  ],
  reagentesVencidos: [
    { mes: "Jan", quantidade: 2 },
    { mes: "Fev", quantidade: 1 },
    { mes: "Mar", quantidade: 6 },
    { mes: "Abr", quantidade: 4 },
  ],
  reagentesCadastrados: [
    { mes: "Jan", quantidade: 10 },
    { mes: "Fev", quantidade: 14 },
    { mes: "Mar", quantidade: 9 },
    { mes: "Abr", quantidade: 12 },
  ],
};

const LineChartDashboard = () => {

  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState("amostrasAtrasadas");

  const handleButtonClick = (type) => {
    setTipo(type);
    setSelectedData(type);
  
    if (type === "amostrasAtrasadas") {
      setData([
        { mes: "Jan", quantidade: 15 },
        { mes: "Feb", quantidade: 10 },
        { mes: "Mar", quantidade: 25 },
        { mes: "Apr", quantidade: 30 },
        { mes: "May", quantidade: 5 },
      ]);
    } else if (type === "reagentesVencidos") {
      setData([
        { mes: "Jan", quantidade: 5 },
        { mes: "Feb", quantidade: 8 },
        { mes: "Mar", quantidade: 12 },
        { mes: "Apr", quantidade: 2 },
        { mes: "May", quantidade: 6 },
      ]);
    } else if (type === "reagentesCadastrados") {
      setData([
        { mes: "Jan", quantidade: 20 },
        { mes: "Feb", quantidade: 22 },
        { mes: "Mar", quantidade: 18 },
        { mes: "Apr", quantidade: 25 },
        { mes: "May", quantidade: 10 },
      ]);
    }
  };
  


  const [tipo, setTipo] = useState("amostrasAtrasadas");

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
    <button
      onClick={() => handleButtonClick("amostrasAtrasadas")}
      className="flex items-center gap-2 bg-green-500 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:bg-green-600 hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      📊 Amostras Atrasadas
    </button>
    <button
      onClick={() => handleButtonClick("reagentesVencidos")}
      className="flex items-center gap-2 bg-green-500 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:bg-green-600 hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      ⏰ Reagentes Vencidos
    </button>
    <button
      onClick={() => handleButtonClick("reagentesCadastrados")}
      className="flex items-center gap-2 bg-green-500 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:bg-green-600 hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      🧪 Reagentes Cadastrados
    </button>



      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dadosMock[tipo]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="quantidade"
              stroke={
                tipo === "amostrasAtrasadas"
                  ? "#3b82f6"
                  : tipo === "reagentesVencidos"
                  ? "#ef4444"
                  : "#22c55e"
              }
              activeDot={{ r: 8 }}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartDashboard;
