import React, { useState } from "react";
import "../../css/login.css"
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function LoginRegister() {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div className={`container ${isSignIn ? "sign-in-js" : "sign-up-js"}`}>
      {/* First Content - Sign Up */}
      <div className="content first-content">
        <div className="first-column">
          <h2 className="title title-primary">Olá, Novamente!</h2>
          <p className="description description-primary">
            Para continuar logado com a gente
          </p>
          <p className="description description-primary">
            por favor entre com seu email cadastrado
          </p>
          <button
            id="signin"
            className="btn btn-primary"
            onClick={() => setIsSignIn(true)}
          >
            Entrar
          </button>
        </div>
        <div className="second-column">
          <h2 className="title title-second">Criar Conta</h2>


          <form className="form">
            <label className="label-input">
              <i className="far fa-user icon-modify"></i>
              <input type="text" placeholder="Nome" />
            </label>

            <label className="label-input">
              <i className="far fa-envelope icon-modify"></i>
              <input type="email" placeholder="Email" />
            </label>

            <label className="label-input">
              <i className="fas fa-lock icon-modify"></i>
              <input type="Senha" placeholder="Senha" />
            </label>

            <button className="btn btn-second">Cadastrar</button>
          </form>
        </div>
      </div>

      {/* Second Content - Sign In */}
      <div className="content second-content">
        <div className="first-column">
          <h2 className="title title-primary">Olá, primeira vez?</h2>
          <p className="description description-primary">
            Insira seus dados pessoais          </p>
          <p className="description description-primary">
            e comece sua jornada conosco
          </p>
          <button
            id="signup"
            className="btn btn-primary"
            onClick={() => setIsSignIn(false)}
          >
            cadastrar
          </button>
        </div>
        <div className="second-column">
          <h2 className="title title-second">Bem vindo de volta!</h2>

          <p className="description description-second">
            Entre com seu email cadastrado:
          </p>
          <form className="form">
            <label className="label-input">
              <i className="far fa-envelope icon-modify"></i>
              <input type="email" placeholder="Email" />
            </label>

            <label className="label-input">
              <i className="fas fa-lock icon-modify"></i>
              <input type="password" placeholder="Password" />
            </label>

            <a className="password" href="#">
              esqueceu sua senha?
            </a>
            <button className="btn btn-second">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
