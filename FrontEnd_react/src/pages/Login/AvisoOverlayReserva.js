import React from "react";
import "../../css/overlayReserva.css";

export default function AvisoOverlay({ onConfirm }) {
  return (
    <div className="overlay-container">
      <div className="overlay-box">
        <h2>Aviso Importante</h2>

        <p>
          Este formulário é destinado para pessoas que desejam solicitar acesso
          ao laboratório. Todas as informações devem ser preenchidas de forma
          verdadeira.
        </p>
        <p>
          Após o envio, sua solicitação será analisada por um administrador do
          laboratório, que poderá aprová-la ou não.
        </p>

        <button className="overlay-btn" onClick={onConfirm}>
          Entendi e desejo continuar
        </button>
      </div>
    </div>
  );
}
