import React from 'react';

const TabelaAnalises = () => {
  const analises = [
    { id: 1, nome: 'Análise de pH', status: 'Concluída', data: '2025-10-15' },
    { id: 2, nome: 'Análise de Condutividade', status: 'Em andamento', data: '2025-10-20' },
    { id: 3, nome: 'Análise de Cloretos', status: 'Atrasada', data: '2025-10-30' },
  ];

  return (
    <div className="card mt-4">
      <div className="card-header">Tabela de Análises</div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {analises.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.nome}</td>
                <td>{a.status}</td>
                <td>{a.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaAnalises;
