import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getReservaById,
  aprovarReserva,
  negarReserva,
} from "../../services/ReservaLaboratorioService";

export default function AprovacaoReservaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReservaById(id)
      .then((data) => {
        setReserva(data);

        setLoading(false);
      })
      .catch(() => {
        alert("Erro ao carregar dados da reserva.");
        setLoading(false);
      });
  }, [id]);

  const handleAprovar = () => {
    aprovarReserva(id)
      .then(() => {
        alert("Reserva aprovada com sucesso!");
        navigate("/loginPage");
      })
      .catch(() => alert("Erro ao aprovar a reserva."));
  };

  const handleNegar = () => {
    negarReserva(id)
      .then(() => {
        alert("Reserva negada com sucesso!");
        navigate("/loginPage");
      })
      .catch(() => alert("Erro ao negar a reserva."));
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: 50 }}>Carregando...</p>;

  if (!reserva)
    return (
      <p style={{ textAlign: "center", marginTop: 50 }}>
        Reserva não encontrada
      </p>
    );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          minWidth: 380,
          textAlign: "center",
        }}
      >
        <h2>Aprovação de Reserva</h2>

        <p>
          <strong>Solicitante:</strong> {reserva.nomeSolicitante}
        </p>
        <p>
          <strong>Email:</strong> {reserva.emailSolicitante}
        </p>
        <p>
          <strong>Equipamento:</strong> {reserva.equipamento?.nome}
        </p>
        <p>
          <strong>Data Início:</strong> {reserva.dataInicio}
        </p>
        <p>
          <strong>Data Fim:</strong> {reserva.dataFim}
        </p>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <button
            onClick={handleAprovar}
            style={{
              padding: "10px 25px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Aprovar
          </button>

          <button
            onClick={handleNegar}
            style={{
              padding: "10px 25px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Negar
          </button>
        </div>
      </div>
    </div>
  );
}
