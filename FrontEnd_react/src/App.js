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

import AnaliseCadastro from './pages/cadastro/AnaliseCadastro';
import ContratoCadastro from './pages/cadastro/ContratoCadastro';
import CONTAnaliseCadastro from './pages/cadastro/cont-AnaliseCadastro';
import ProcedimentoCadastro from './pages/cadastro/ProcedimentoCadastro';
import MatrizCadastro from './pages/cadastro/MatrizCadastro'
import AnalitoCadastro from './pages/cadastro/AnalitoCadastro';
import ClienteCadastro from './pages/cadastro/ClienteCadastro';


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


        <Route path="/analiseCadastro" element={<AnaliseCadastro />} />
        <Route path="/contratoCadastro" element={<ContratoCadastro />} />
        <Route path="/cont-analiseCadastro" element={<CONTAnaliseCadastro />} />
        <Route path="/procedimentoCadastro" element={<ProcedimentoCadastro />} />
        <Route path="/clienteCadastro" element={<ClienteCadastro />} />
        <Route path="/matrizCadastro" element={<MatrizCadastro />} />
        <Route path="/analitoCadastro" element={<AnalitoCadastro />} />
        <Route path="/clienteCadastro" element={<ClienteCadastro />} />



      </Routes>
    </Router>
  );
}

export default App;
