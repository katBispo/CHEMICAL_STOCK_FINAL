import React from 'react';
import IndicadoresCards from './components/IndicadoresCards';
import GraficoStatusAmostras from './components/GraficoStatusAmostras';
import GraficoProcedimentos from './components/GraficoProcedimentos';
import GraficoEquipamentos from './components/GraficoEquipamentos';
import TabelaAnalises from './components/TabelaAnalises';
//import AlertasPanel from './components/AlertasPanel';

const DashboardAnalises = () => {
  return (
    <div className="container mt-4">
      <h1>Painel de Monitoramento de Análises</h1>
      
      {/* Seção de Indicadores */}
{/* <IndicadoresCards /> */}
      
      {/* Seção de Gráficos */}
      <div className="row mt-4">
        <div className="col-md-4">
          <GraficoStatusAmostras />
        </div>
        <div className="col-md-4">
          <GraficoProcedimentos />
        </div>
        <div className="col-md-4">
          <GraficoEquipamentos />
        </div>
      </div>
      
      {/* Seção de Tabela */}
      <TabelaAnalises />
      
      {/* Seção de Alertas (lateral ou topo) */}
     {/* <AlertasPanel />*/}
    </div>
  );
};

export default DashboardAnalises;