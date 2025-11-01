// src/services/equipamento.js
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

const BASE_ENDPOINT = "/equipamentos";
const ESTATISTICAS_ENDPOINT = "/equipamentos/estatisticas";

// ================== CRUD ==================

export async function getEquipamentos() {
  return apiGet(BASE_ENDPOINT);
}

export async function getEquipamentoById(id) {
  return apiGet(`${BASE_ENDPOINT}/${id}`);
}

export async function criarEquipamento(equipamento) {
  return apiPost(BASE_ENDPOINT, equipamento);
}

export async function atualizarEquipamento(id, equipamento) {
  return apiPut(`${BASE_ENDPOINT}/${id}`, equipamento);
}

export async function deletarEquipamento(id) {
  return apiDelete(`${BASE_ENDPOINT}/${id}`);
}

// ================== ESTATÍSTICAS ==================

export async function getStatusEquipamentos() {
  return apiGet(`${ESTATISTICAS_ENDPOINT}/status`);
}

export async function getDistribuicaoPorProcedimento() {
  return apiGet(`${ESTATISTICAS_ENDPOINT}/procedimentos`);
}

export async function getContagemDeUso() {
  return apiGet(`${ESTATISTICAS_ENDPOINT}/usos`);
}

export async function getTop5MaisUsados() {
  return apiGet(`${ESTATISTICAS_ENDPOINT}/top5`);
}
