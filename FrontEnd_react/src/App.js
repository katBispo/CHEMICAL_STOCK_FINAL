// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AnaliseLista from './pages/lista/AnaliseLista';
import ContratoLista from './pages/lista/ContratoLista';
import ProcedimentoLista from './pages/lista/ProcedimentoLista';
import ClienteLista from './pages/lista/ClienteLista';
import MatrizLista from './pages/lista/MatrizLista';
import AnalitoLista from './pages/lista/AnalitoLista';
import AmostraLista from './pages/lista/AmostraLista';


import AnaliseCadastro from './pages/cadastro/AnaliseCadastro';
import ContratoCadastro from './pages/cadastro/ContratoCadastro';
import ProcedimentoCadastro from './pages/cadastro/ProcedimentoCadastro';
import MatrizCadastro from './pages/cadastro/MatrizCadastro'
import AnalitoCadastro from './pages/cadastro/AnalitoCadastro';
import ClienteCadastro from './pages/cadastro/ClienteCadastro';
import ContAnaliseCadastro from './pages/cadastro/ContAnaliseCadastro';
import AmostraCadastro from './pages/cadastro/AmostraCadastro';
import ReagenteCadastro from './pages/cadastro/ReagenteCadastro';
import AnalitoExistenteCadastro from './pages/cadastro/AnalitoExistenteCadastro';


import SelectAnaliseDaAmostra from './pages/components/SelectAnaliseDaAmostra';

import Perfil from './pages/Perfil';

import { Link } from 'react-router-dom';
import { MdArtTrack } from 'react-icons/md';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analiseLista" element={<AnaliseLista />} />
        <Route path="/contratoLista" element={<ContratoLista />} />
        <Route path="/procedimentoLista" element={<ProcedimentoLista />} />
        <Route path="/clientesLista" element={<ClienteLista />} />
        <Route path="/matrizLista" element={<MatrizLista />} />
        <Route path="/analitoLista" element={<AnalitoLista />} />
        <Route path="/amostraLista" element={<AmostraLista />} />


        <Route path="/analiseCadastro" element={<AnaliseCadastro />} />
        <Route path="/contratoCadastro" element={<ContratoCadastro />} />
        <Route path="/procedimentoCadastro" element={<ProcedimentoCadastro />} />
        <Route path="/clienteCadastro" element={<ClienteCadastro />} />
        <Route path="/matrizCadastro" element={<MatrizCadastro />} />
        <Route path="/analitoCadastro" element={<AnalitoCadastro />} />
        <Route path="/clienteCadastro" element={<ClienteCadastro />} />
        <Route path="/contrato-cadastrar-analises" element={<ContAnaliseCadastro />} />
        <Route path="/amostraCadastro" element={<AmostraCadastro />} />
        <Route path="/ReagenteCadastro" element={<ReagenteCadastro />} />
        <Route path="/analitoExistenteCadastro" element={<AnalitoExistenteCadastro />} />

        <Route path="/analiseAmostra" element={<SelectAnaliseDaAmostra />} />




        <Route path="/perfil" element={<Perfil/>} />



      </Routes>
    </Router>
  );
}

export default App;
