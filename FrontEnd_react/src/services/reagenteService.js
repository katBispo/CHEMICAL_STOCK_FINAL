// src/services/ReagenteService.js
import { apiGet, apiPost, apiPut, apiDelete } from "./api.js";

const BASE_ENDPOINT = "/reagente";

// 🔹 Salvar novo reagente
export async function salvarReagente(reagente) {
  return apiPost(BASE_ENDPOINT, reagente);
}

// 🔹 Atualizar reagente existente
export async function atualizarReagente(id, reagente) {
  return apiPut(`${BASE_ENDPOINT}/${id}`, reagente);
}

// 🔹 Deletar reagente por ID
export async function deletarReagente(id) {
  return apiDelete(`${BASE_ENDPOINT}/${id}`);
}

// 🔹 Buscar todos os reagentes
export async function getReagentes() {
  return apiGet(BASE_ENDPOINT);
}

// 🔹 Buscar tipos de reagente (enum)
export async function getTiposReagentes() {
  return apiGet(`${BASE_ENDPOINT}/tipos`);
}

// 🔹 Buscar unidades de medida (enum)
export async function getUnidadesReagentes() {
  return apiGet(`${BASE_ENDPOINT}/unidades`);
}

// 🔹 Buscar reagentes vencidos
export async function getReagentesVencidos() {
  return apiGet(`${BASE_ENDPOINT}/vencidos`);
}

// 🔹 Contar quantidade de reagentes vencidos
export async function getQuantidadeReagentesVencidos() {
  return apiGet(`${BASE_ENDPOINT}/vencidos/quantidade`);
}

// 🔹 Contar reagentes por tipo (para gráfico ou dashboard)
export async function getQuantidadePorTipo() {
  return apiGet(`${BASE_ENDPOINT}/quantidade-por-tipo`);
}

// 🔹 Buscar dados do gráfico de validade
export async function getGraficoValidade() {
  return apiGet(`${BASE_ENDPOINT}/grafico-validade`);
}

// 🔹 Buscar quantidade de reagentes controlados
export async function getQuantidadeControlados() {
  return apiGet(`${BASE_ENDPOINT}/quantidade-controlados`);
}

// 🔹 Buscar reagente pelo nome (autocomplete ou pesquisa)
export async function buscarReagentePorNome(nome) {
  return apiGet(`${BASE_ENDPOINT}/buscarReagente?nome=${encodeURIComponent(nome)}`);
}

// 🔹 Buscar reagentes filtrados (nome, tipo, data)
export async function buscarReagentesFiltrados(filtros) {
  const params = new URLSearchParams();

  if (filtros.nome) params.append("nome", filtros.nome);
  if (filtros.tipo) params.append("tipo", filtros.tipo);
  if (filtros.dataInicio) params.append("dataInicio", filtros.dataInicio);
  if (filtros.dataFim) params.append("dataFim", filtros.dataFim);

  return apiGet(`${BASE_ENDPOINT}/filtroReagente?${params.toString()}`);
}
