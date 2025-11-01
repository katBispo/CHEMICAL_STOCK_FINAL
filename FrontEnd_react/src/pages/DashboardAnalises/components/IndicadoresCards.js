import React, { useState, useEffect } from 'react';
import { getAnalisesAtivas, getAmostrasEmAndamento, getAmostrasProximasPrazo, getAmostrasAtrasadas, getAnalisesSemAmostras } from '../../services/api';

const IndicadoresCards = () => {
  const [data, setData] = useState({
    analisesAtivas: 0,
    amostrasEmAndamento: 0,
    amostrasProximas: 0,
    amostrasAtrasadas: 0,
    analisesSemAmostras: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ativas, andamento, proximas, atrasadas, semAmostras] = await Promise.all([
          getAnalisesAtivas(),
          getAmostrasEmAndamento(),
          getAmostrasProximasPrazo(),
          getAmostrasAtrasadas(),
          getAnalisesSemAmostras(),
        ]);
        setData({
          analisesAtivas: ativas.data.count,
          amostrasEmAndamento: andamento.data.count,
          amostrasProximas: proximas.data.count,
          amostrasAtrasadas: atrasadas.data.count,
          analisesSemAmostras: semAmostras.data.count,
        });
      } catch (error) {
        console.error('Erro ao carregar indicadores:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-2"><div className="card text-white bg-primary"><div className="card-body">Análises Ativas: {data.analisesAtivas}</div></div></div>
      <div className="col-md-2"><div className="card text-white bg-warning"><div className="card-body">Amostras em Andamento: {data.amostrasEmAndamento}</div></div></div>
      <div className="col-md-2"><div className="card text-white bg-orange"><div className="card-body">Próximas ao Prazo: {data.amostrasProximas}</div></div></div> {/* Use cor laranja */}
      <div className="col-md-2"><div className="card text-white bg-danger"><div className="card-body">Amostras Atrasadas: {data.amostrasAtrasadas}</div></div></div>
      <div className="col-md-2"><div className="card text-white bg-dark"><div className="card-body">Análises sem Amostras: {data.analisesSemAmostras}</div></div></div>
    </div>
  );
};

export default IndicadoresCards;