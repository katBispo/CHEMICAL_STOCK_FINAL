//ainda preciso fazer o serviço completo de alertasimport React from 'react';

const AlertasPanel = () => {
  // Dados mockados
  const alertas = [
    { id: 1, mensagem: 'Amostra #101 está atrasada', tipo: 'danger' },
    { id: 2, mensagem: 'Procedimento #23 concluído', tipo: 'success' },
    { id: 3, mensagem: 'Equipamento #5 em manutenção', tipo: 'warning' },
    { id: 4, mensagem: 'Nova análise cadastrada: Análise de pH', tipo: 'info' },
  ];

  return (
    <div className="card mb-4">
      <div className="card-header font-bold text-lg">
        Alertas Recentes
      </div>
      <div className="card-body">
        {alertas.map(alerta => (
          <div 
            key={alerta.id} 
            className={`alert alert-${alerta.tipo} mb-2`} 
            role="alert"
          >
            {alerta.mensagem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertasPanel;
