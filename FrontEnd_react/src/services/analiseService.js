import { apiGet, apiDelete, apiPost, apiPut } from "./api";

export async function getAnalises() {
  return apiGet("/analise");
}

export async function deleteAnalise(id) {
  return apiDelete(`/analise/${id}`);
}

export async function salvarAnalise(analise) {
  return apiPost("/analise", analise);
}

export async function atualizarAnalise(id, analise) {
  return apiPut(`/analise/${id}`, analise);
}
