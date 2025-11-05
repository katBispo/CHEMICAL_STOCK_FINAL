// src/styles/tabelaEstilo.js
export const tabelaEstilo = {
  container: {
    marginTop: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },

  cabecalho: {
    backgroundColor: '#4CAF50',
  },

  celulaCabecalho: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    textAlign: 'center',
  },

  linha: {
    backgroundColor: '#fff',
    transition: 'background-color 0.3s',
  },

  celula: {
    fontSize: '14px',
    textAlign: 'center',
  },

  linhaHover: {
    backgroundColor: '#f1f1f1',
  },

  statusBox: {
    padding: '5px',
    borderRadius: '15px',
    textAlign: 'center',
    fontSize: '14px',
    width: '150px',
    margin: '0 auto',
    color: '#fff',
    fontWeight: 'bold',
  },

  botoesAcoes: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
};
