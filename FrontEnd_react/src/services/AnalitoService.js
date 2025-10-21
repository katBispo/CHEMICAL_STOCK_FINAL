// services/AnalitoService.js
import { apiGet, apiPost, apiPut, apiDelete } from "./api.js";

export async function getAnalitos() {
  return apiGet("/analito");
}

export async function getAnalitoById(id) {
  return apiGet(`/analito/${id}`);
}

export async function salvarAnalito(analito) {
  return apiPost("/analito", analito);
}

export async function atualizarAnalito(id, analito) {
  return apiPut(`/analito/${id}`, analito);
}

export async function deleteAnalito(id) {
  return apiDelete(`/analito/${id}`);
}
