import React, { useState } from "react";
import "../../css/login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import CadastroUsuario from "./CadastroUsuario";

export default function LoginRegister() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      const data = await res.json();
      console.log("Resposta do backend:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("nome", data.nome);
      // se o backend retornar o exp (timestamp ou segundos UNIX)
      if (data.exp) {
        localStorage.setItem("tokenExp", data.exp);
      }
      if (data.role) {
        localStorage.setItem("role", data.role);
      }

      navigate("/home");
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${isSignIn ? "sign-in-js" : "sign-up-js"}`}>
      {/* Login */}
      {isSignIn && (
        <div className="content second-content">
          <div className="first-column">
            <h2 className="title title-primary">Olá, primeira vez?</h2>
            <p className="description description-primary">
              Insira seus dados pessoais
            </p>
            <button
              id="signup"
              className="btn btn-primary"
              onClick={() => setIsSignIn(false)}
            >
              Cadastrar
            </button>
          </div>
          <div className="second-column">
            <h2 className="title title-second">Bem vindo de volta!</h2>
            <p className="description description-second">
              Entre com seu email cadastrado:
            </p>
            <form className="form" onSubmit={handleLogin}>
              <label className="label-input">
                <i className="far fa-envelope icon-modify"></i>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="label-input">
                <i className="fas fa-lock icon-modify"></i>
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                className="btn btn-second"
                type="submit"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cadastro */}
      {!isSignIn && (
        <div className="content first-content">
          <div className="first-column">
            <h2 className="title title-primary">Olá, Novamente!</h2>
            <p className="description description-primary">
              Para começar, preencha os dados:
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setIsSignIn(true)}
            >
              Voltar ao Login
            </button>
          </div>
          <div className="second-column">
            <h2 className="title title-second">Criar Conta</h2>
            <CadastroUsuario onCadastroSucesso={() => setIsSignIn(true)} />
          </div>
        </div>
      )}
    </div>
  );
}
