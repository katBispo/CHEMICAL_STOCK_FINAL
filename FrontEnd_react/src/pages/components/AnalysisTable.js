import React from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

const data = [
  {
    id: '#20462',
    name: 'Ácido Sulfúrico',
    startDate: '13/05/2022',
    endDate: '13/05/2022',
    contract: 'Contrato A',
    procedure: 'Procedimento B',
    matrix: 'Ácido',
  },
];

function AnalysisTable() {
  return (
    <div className="table-container">
      <div className="table-actions">
        <button className="add-button">+ Cadastrar Análise</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Data de Início</th>
            <th>Prazo Final</th>
            <th>Ctos. Associados</th>
            <th>Procs. Associados</th>
            <th>Matriz</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.startDate}</td>
              <td>{item.endDate}</td>
              <td>{item.contract}</td>
              <td>{item.procedure}</td>
              <td>{item.matrix}</td>
              <td>
                <button className="action-button">
                  <FaEye />
                </button>
                <button className="action-button">
                  <FaEdit />
                </button>
                <button className="action-button">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalysisTable;
