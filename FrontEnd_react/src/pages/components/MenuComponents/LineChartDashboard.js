import React, { useState, useEffect } from "react";
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

// Dados completos para 12 meses
const dadosMock = {
  amostrasAtrasadas: [
    { mes: "Jan", quantidade: 15 },
    { mes: "Fev", quantidade: 10 },
    { mes: "Mar", quantidade: 25 },
    { mes: "Abr", quantidade: 30 },
    { mes: "Mai", quantidade: 5 },
    { mes: "Jun", quantidade: 8 },
    { mes: "Jul", quantidade: 12 },
    { mes: "Ago", quantidade: 6 },
    { mes: "Set", quantidade: 4 },
    { mes: "Out", quantidade: 7 },
    { mes: "Nov", quantidade: 10 },
    { mes: "Dez", quantidade: 9 },
  ],
  reagentesVencidos: [
    { mes: "Jan", quantidade: 5 },
    { mes: "Fev", quantidade: 8 },
    { mes: "Mar", quantidade: 12 },
    { mes: "Abr", quantidade: 2 },
    { mes: "Mai", quantidade: 6 },
    { mes: "Jun", quantidade: 4 },
    { mes: "Jul", quantidade: 7 },
    { mes: "Ago", quantidade: 3 },
    { mes: "Set", quantidade: 1 },
    { mes: "Out", quantidade: 5 },
    { mes: "Nov", quantidade: 9 },
    { mes: "Dez", quantidade: 2 },
  ],
  reagentesCadastrados: [
    { mes: "Jan", quantidade: 20 },
    { mes: "Fev", quantidade: 22 },
    { mes: "Mar", quantidade: 18 },
    { mes: "Abr", quantidade: 25 },
    { mes: "Mai", quantidade: 10 },
    { mes: "Jun", quantidade: 15 },
    { mes: "Jul", quantidade: 19 },
    { mes: "Ago", quantidade: 13 },
    { mes: "Set", quantidade: 16 },
    { mes: "Out", quantidade: 21 },
    { mes: "Nov", quantidade: 14 },
    { mes: "Dez", quantidade: 11 },
  ],
};

const LineChartDashboard = () => {
  const [data, setData] = useState([]);
  const [tipo, setTipo] = useState("amostrasAtrasadas");

  useEffect(() => {
    setData(dadosMock[tipo]);
  }, [tipo]);

  const handleButtonClick = (type) => {
    setTipo(type);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <div className="flex flex-wrap justify-center gap-6">
        {/* Amostras Atrasadas */}
        <button
          onClick={() => handleButtonClick("amostrasAtrasadas")}
          className="group flex items-center gap-4 bg-white text-gray-800 border border-gray-200 px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:bg-green-50 hover:border-green-400"
        >
          <div className="bg-green-500 text-white rounded-full p-3 group-hover:scale-110 transform transition duration-300">
            📊
          </div>
          <span className="font-semibold text-lg">Amostras Atrasadas</span>
        </button>

        {/* Reagentes Vencidos */}
        <button
          onClick={() => handleButtonClick("reagentesVencidos")}
          className="group flex items-center gap-4 bg-white text-gray-800 border border-gray-200 px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:bg-green-50 hover:border-green-400"
        >
          <div className="bg-green-500 text-white rounded-full p-3 group-hover:scale-110 transform transition duration-300">
            ⏰
          </div>
          <span className="font-semibold text-lg">Reagentes Vencidos</span>
        </button>

        {/* Reagentes Cadastrados */}
        <button
          onClick={() => handleButtonClick("reagentesCadastrados")}
          className="group flex items-center gap-4 bg-white text-gray-800 border border-gray-200 px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:bg-green-50 hover:border-green-400"
        >
          <div className="bg-green-500 text-white rounded-full p-3 group-hover:scale-110 transform transition duration-300">
            🧪
          </div>
          <span className="font-semibold text-lg">Reagentes Cadastrados</span>
        </button>
      </div>




      {/* Gráfico */}
      <div className="bg-white shadow-lg rounded-xl p-4">
        <ResponsiveContainer width={700} height={400}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" interval={0} />
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
