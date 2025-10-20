// services/MatrizService.js
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export async function getMatrizes() {
  return apiGet("/matriz");
}

export async function getMatrizById(id) {
  return apiGet(`/matriz/${id}`);
}

export async function salvarMatriz(matriz) {
  return apiPost("/matriz", matriz);
}

export async function atualizarMatriz(id, matriz) {
  return apiPut(`/matriz/${id}`, matriz);
}

export async function deleteMatriz(id) {
  return apiDelete(`/matriz/${id}`);
}
