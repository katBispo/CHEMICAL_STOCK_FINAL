import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";

import Home from "./pages/Home";
import LoginPage from "./pages/Login/LoginPage";
import AprovarUsuarios from "./pages/Login/AprovarUsuarios";

import AnaliseLista from "./pages/lista/AnaliseLista";
import ContratoLista from "./pages/lista/ContratoLista";
import ProcedimentoLista from "./pages/lista/ProcedimentoLista";
import ClienteLista from "./pages/lista/ClienteLista";
import MatrizLista from "./pages/lista/MatrizLista";
import AnalitoLista from "./pages/lista/AnalitoLista";
import AmostraLista from "./pages/lista/AmostraLista";

import AnaliseCadastro from "./pages/cadastro/AnaliseCadastro";
import ContratoCadastro from "./pages/cadastro/ContratoCadastro";
import ProcedimentoCadastro from "./pages/cadastro/ProcedimentoCadastro";
import MatrizCadastro from "./pages/cadastro/MatrizCadastro";
import AnalitoCadastro from "./pages/cadastro/AnalitoCadastro";
import ClienteCadastro from "./pages/cadastro/ClienteCadastro";
import ContAnaliseCadastro from "./pages/cadastro/ContAnaliseCadastro";
import AmostraCadastro from "./pages/cadastro/AmostraCadastro";
import ReagenteCadastro from "./pages/cadastro/ReagenteCadastro";
import AnalitoExistenteCadastro from "./pages/cadastro/AnalitoExistenteCadastro";
import CadastrarProcesso from "./pages/cadastro/CadastrarProcesso";

import Estoque from "./pages/estoque/Estoque";

import SelectAnaliseDaAmostra from "./pages/components/SelectAnaliseDaAmostra";
import ReposicaoReagentOverlay from "./pages/components/ReposicaoReagentOverlay";
import ListaReagenteCompleta from "./pages/estoque/tabelas/overlayTabelas/ListaReagentesCompleta";

import Perfil from "./pages/Perfil";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/aprovar-usuario/:id" element={<AprovarUsuarios />} />

        {/* Rotas protegidas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/analiseLista"
          element={
            <PrivateRoute>
              <AnaliseLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/contratoLista"
          element={
            <PrivateRoute>
              <ContratoLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/procedimentoLista"
          element={
            <PrivateRoute>
              <ProcedimentoLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/clientesLista"
          element={
            <PrivateRoute>
              <ClienteLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/matrizLista"
          element={
            <PrivateRoute>
              <MatrizLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/analitoLista"
          element={
            <PrivateRoute>
              <AnalitoLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/amostraLista"
          element={
            <PrivateRoute>
              <AmostraLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/analiseCadastro"
          element={
            <PrivateRoute>
              <AnaliseCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/contratoCadastro"
          element={
            <PrivateRoute>
              <ContratoCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/procedimentoCadastro"
          element={
            <PrivateRoute>
              <ProcedimentoCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/clienteCadastro"
          element={
            <PrivateRoute>
              <ClienteCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/matrizCadastro"
          element={
            <PrivateRoute>
              <MatrizCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/analitoCadastro"
          element={
            <PrivateRoute>
              <AnalitoCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/contrato-cadastrar-analises"
          element={
            <PrivateRoute>
              <ContAnaliseCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/amostraCadastro"
          element={
            <PrivateRoute>
              <AmostraCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/ReagenteCadastro"
          element={
            <PrivateRoute>
              <ReagenteCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/analitoExistenteCadastro"
          element={
            <PrivateRoute>
              <AnalitoExistenteCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/cadastrarProcesso"
          element={
            <PrivateRoute>
              <CadastrarProcesso />
            </PrivateRoute>
          }
        />

        <Route
          path="/analiseAmostra"
          element={
            <PrivateRoute>
              <SelectAnaliseDaAmostra />
            </PrivateRoute>
          }
        />

        <Route
          path="/reposicaoReagente"
          element={
            <PrivateRoute>
              <ReposicaoReagentOverlay />
            </PrivateRoute>
          }
        />

        <Route
          path="/listaReagentesCompleta"
          element={
            <PrivateRoute>
              <ListaReagenteCompleta />
            </PrivateRoute>
          }
        />

        <Route
          path="/estoque"
          element={
            <PrivateRoute>
              <Estoque />
            </PrivateRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
