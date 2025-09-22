import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const AprovarUsuario = () => {
  const { id } = useParams();

  useEffect(() => {
    // Quando a página abre, chama o backend para aprovar
axios.put(`http://localhost:8080/usuarios/aprovar/${id}`)
      .then(response => {
        alert("Usuário aprovado com sucesso!");
      })
      .catch(error => {
        alert("Erro ao aprovar usuário.");
      });
  }, [id]);

  return (
    <div className="container">
      <h2>Aprovação de Usuário</h2>
      <p>Processando aprovação do usuário ID: {id}...</p>
    </div>
  );
};

export default AprovarUsuario;
