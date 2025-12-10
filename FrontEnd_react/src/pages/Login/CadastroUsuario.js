import React, { useState } from "react";
import "../../css/login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { criarUsuario } from "../../services/usuarioService";

export default function CadastroUsuario({ onCadastroSucesso }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [crq, setCrq] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [cargo, setCargo] = useState("PESQUISADOR");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleCadastro = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await criarUsuario({ nome, cpf, email, crq, dataAdmissao, cargo, senha });
      alert("Cadastro realizado! Aguarde aprovação do administrador.");
      onCadastroSucesso();
    } catch (err) {
      setError(err.message || "Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form cadastro-form" onSubmit={handleCadastro}>

      <div className="form-row">
        <label className="label-input">
          <i className="far fa-user icon-modify"></i>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </label>

        <label className="label-input">
          <i className="fas fa-id-card icon-modify"></i>
          <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        </label>
      </div>

      <div className="form-row">
        <label className="label-input">
          <i className="far fa-envelope icon-modify"></i>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label className="label-input">
          <i className="fas fa-certificate icon-modify"></i>
          <input type="text" placeholder="CRQ" value={crq} onChange={(e) => setCrq(e.target.value)} />
        </label>
      </div>

      <div className="form-row">
        <label className="label-input">
          <i className="fas fa-calendar icon-modify"></i>
          <input type="date" value={dataAdmissao} onChange={(e) => setDataAdmissao(e.target.value)} required />
        </label>

        <label className="label-input">
          <i className="fas fa-briefcase icon-modify"></i>
          <select value={cargo} onChange={(e) => setCargo(e.target.value)} required>
            <option value="PESQUISADOR">PESQUISADOR</option>
            <option value="TECNICO">TECNICO</option>
            <option value="COORDENADOR">COORDENADOR</option>
          </select>
        </label>
      </div>

      <label className="label-input">
        <i className="fas fa-lock icon-modify"></i>
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button className="btn btn-second" type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>

  );
}
