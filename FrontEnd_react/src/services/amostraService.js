// src/services/AmostraService.js
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export async function getAmostras() {
  return apiGet("/amostra");
}

export async function getAmostraById(id) {
  return apiGet(`/amostra/${id}`);
}

export async function salvarAmostra(amostra) {
  return apiPost("/amostra", amostra);
}

export async function atualizarAmostra(id, amostra) {
  return apiPut(`/amostra/${id}`, amostra);
}

export async function deleteAmostra(id) {
  return apiDelete(`/amostra/${id}`);
}

export async function getAmostrasComAnalises() {
  return apiGet("/amostra/com-analises");
}
export async function encerrarAmostra(id) {
  return apiPut(`/amostra/${id}/encerrar`);
}
export async function getStatusAmostras() {
  return apiGet('/amostras/status/contagem'); 
}