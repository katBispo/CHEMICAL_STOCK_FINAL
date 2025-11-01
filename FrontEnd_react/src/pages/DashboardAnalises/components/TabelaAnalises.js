import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { getAnalises} from '../../../services/AnaliseService';

const TabelaAnalises = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnalises();
        setData(response.data);  // Ex: [{ analise: 'Água do Rio X', cliente: 'Prefeitura', numAmostras: 5, amostrasCadastradas: 3, status: 'Parcial', prazo: '02/11/2025' }]
      } catch (error) {
        console.error('Erro ao carregar tabela:', error);
      }
    };
    fetchData();
  }, []);

  const columns = React.useMemo(() => [
    { Header: 'Análise', accessor: 'analise' },
    { Header: 'Cliente', accessor: 'cliente' },
    { Header: 'Nº Amostras', accessor: 'numAmostras' },
    { Header: 'Amostras Cadastradas', accessor: 'amostrasCadastradas' },
    { Header: 'Status Geral', accessor: 'status' },
    { Header: 'Prazo Final', accessor: 'prazo' },
    { Header: 'Ações', accessor: 'acoes', Cell: () => <button className="btn btn-sm btn-info">🔍 Ver detalhes</button> },
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="card mt-4">
      <div className="card-header">Acompanhamento Detalhado</div>
      <div className="card-body">
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => <th {...column.getHeaderProps()}>{column.render('Header')}</th>)}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaAnalises;