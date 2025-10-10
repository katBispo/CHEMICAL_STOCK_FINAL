import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export async function getContratos() {
  return apiGet("/contrato");
}

export async function getContratoById(id) {
  return apiGet(`/contrato/${id}`);
}

export async function salvarContrato(contrato) {
  return apiPost("/contrato", contrato);
}

export async function atualizarContrato(id, contrato) {
  return apiPut(`/contrato/${id}`, contrato);
}

export async function deleteContrato(id) {
  return apiDelete(`/contrato/${id}`);
}
