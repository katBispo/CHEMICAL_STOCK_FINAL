import React from 'react';

const IndicadoresCards = () => {
  // dados mockados
  const data = {
    analisesAtivas: 8,
    amostrasEmAndamento: 14,
    amostrasProximas: 3,
    amostrasAtrasadas: 2,
    analisesSemAmostras: 5,
  };

  return (
    <div className="row">
      <div className="col-md-2">
        <div className="card text-white bg-primary">
          <div className="card-body">Análises Ativas: {data.analisesAtivas}</div>
        </div>
      </div>

      <div className="col-md-2">
        <div className="card text-white bg-warning">
          <div className="card-body">Amostras em Andamento: {data.amostrasEmAndamento}</div>
        </div>
      </div>

      <div className="col-md-2">
        <div className="card text-white bg-orange">
          <div className="card-body">Próximas ao Prazo: {data.amostrasProximas}</div>
        </div>
      </div>

      <div className="col-md-2">
        <div className="card text-white bg-danger">
          <div className="card-body">Amostras Atrasadas: {data.amostrasAtrasadas}</div>
        </div>
      </div>

      <div className="col-md-2">
        <div className="card text-white bg-dark">
          <div className="card-body">Análises sem Amostras: {data.analisesSemAmostras}</div>
        </div>
      </div>
    </div>
  );
};

export default IndicadoresCards;
