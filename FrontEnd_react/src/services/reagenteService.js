import api from './api';

// Função para listar todos os reagentes
export const listarReagentes = async () => {
  try {
    const response = await api.get('/reagente');
    console.log('Dados de reagentes recebidos no serviço:', response.data); // Verifique a resposta aqui
    
    return response.data; // Retorna a lista de reagentes
  } catch (error) {
    console.error('Erro ao listar reagentes:', error);
    throw error;
  }
};

// Função para cadastrar um novo reagente
export const cadastrarReagente = async (reagente) => {
  try {
    const response = await api.post('/reagente', reagente);
    return response.data; // Retorna o reagente criado
  } catch (error) {
    console.error('Erro ao cadastrar reagente:', error);
    throw error;
  }
};

// Função para atualizar um reagente
export const atualizarReagente = async (id, reagente) => {
  try {
    await api.put(`/reagente/${id}`, reagente);
  } catch (error) {
    console.error('Erro ao atualizar reagente:', error);
    throw error;
  }
};

// Função para deletar um reagente
export const deletarReagente = async (id) => {
  try {
    await api.delete(`/reagente/${id}`);
  } catch (error) {
    console.error('Erro ao deletar reagente:', error);
    throw error;
  }
};

// Função para obter os tipos de reagentes
export const obterTiposReagente = async () => {
  try {
    const response = await api.get('/reagente/tipos');
    return response.data; // Retorna os tipos de reagentes
  } catch (error) {
    console.error('Erro ao obter tipos de reagente:', error);
    throw error;
  }
};

// Função para listar as unidades de medida dos reagentes
export const listarUnidadesReagente = async () => {
  try {
    const response = await api.get('/reagente/unidades');
    return response.data; // Retorna as unidades de reagentes
  } catch (error) {
    console.error('Erro ao listar unidades de reagente:', error);
    throw error;
  }
};
