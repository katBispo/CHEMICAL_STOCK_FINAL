import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AprovarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/usuarios/pendentes/${id}`)
      .then(response => {
        setUsuario(response.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Erro ao carregar dados do usuário.");
        setLoading(false);
      });
  }, [id]);

  const handleAprovar = () => {
    axios.put(`http://localhost:8080/usuarios/aprovar/${id}`)
      .then(() => {
        alert("Usuário aprovado com sucesso!");
        navigate("/loginPage"); // redireciona após aprovar
      })
      .catch(() => alert("Erro ao aprovar usuário."));
  };

  const handleNegar = () => {
    axios.put(`http://localhost:8080/usuarios/negar/${id}`)
      .then(() => {
        alert("Usuário negado com sucesso!");
        navigate("/loginPage"); // redireciona após negar
      })
      .catch(() => alert("Erro ao negar usuário."));
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Carregando...</p>;
  if (!usuario) return <p style={{ textAlign: "center", marginTop: "50px" }}>Usuário não encontrado</p>;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f6f8",
      fontFamily: "'Open Sans', sans-serif"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        minWidth: "350px",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Aprovação de Usuário</h2>
        
        <p><strong>Nome:</strong> {usuario.nome}</p>
        <p><strong>Email:</strong> {usuario.email}</p>

        <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "15px" }}>
          <button
            onClick={handleAprovar}
            style={{
              padding: "10px 25px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.2s"
            }}
            onMouseOver={e => e.target.style.backgroundColor = "#45a049"}
            onMouseOut={e => e.target.style.backgroundColor = "#4caf50"}
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
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.2s"
            }}
            onMouseOver={e => e.target.style.backgroundColor = "#e53935"}
            onMouseOut={e => e.target.style.backgroundColor = "#f44336"}
          >
            Negar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AprovarUsuario;
