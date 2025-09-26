import { apiGet, apiDelete, apiPost } from "./api";

export async function getAmostras() {
  return apiGet("/amostra");
}

export async function deleteAmostra(id) {
  return apiDelete(`/amostra/${id}`);
}

export async function salvarAmostra(amostra) {
  return apiPost("/amostra", amostra);
}
