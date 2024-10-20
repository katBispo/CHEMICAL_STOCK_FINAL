import React from 'react';
import { FaFlask, FaVial, FaTag, FaFileAlt } from 'react-icons/fa'; // Importar ícones
import './Home.css'; // Arquivo CSS para o design

function Home() {
  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="logo.svg" alt="Chemical Stock Logo" className="logo" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#inventory">Inventory</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1 className="title">Chemical Stock Dashboard</h1>
        </header>

        <div className="button-grid">
          <button className="dashboard-button">
            <FaFlask className="icon" />
            <span>Listar Análises</span>
          </button>
          <button className="dashboard-button">
            <FaVial className="icon" />
            <span>Cadastrar Amostra</span>
          </button>
          <button className="dashboard-button">
            <FaTag className="icon" />
            <span>Gerar Etiqueta</span>
          </button>
          <button className="dashboard-button">
            <FaFileAlt className="icon" />
            <span>Gerar Relatório</span>
          </button>
          <button className="dashboard-button">
            <FaFileAlt className="icon" />
            <span>Gerar Relatório</span>
          </button>
        </div>

        {/* Adicionando os dois quadrados abaixo dos botões */}
        <div className="square-container">
          <div className="square">Quadrado 1</div>
          <div className="square">Quadrado 2</div>
        </div>
      </main>
    </div>
  );
}

export default Home;
