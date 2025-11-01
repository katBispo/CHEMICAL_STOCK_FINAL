// src/services/ProcedimentoService.js
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export async function getProcedimentos() {
  return apiGet("/procedimento");
}

export async function getProcedimentoById(id) {
  return apiGet(`/procedimento/${id}`);
}

export async function salvarProcedimento(procedimentoPayload) {
  return apiPost("/procedimento", procedimentoPayload);
}

export async function atualizarProcedimento(id, procedimentoPayload) {
  return apiPut(`/procedimento/${id}`, procedimentoPayload);
}

export async function deleteProcedimento(id) {
  return apiDelete(`/procedimento/${id}`);
}

export async function getProcedimentosMaisUsados() {
  return apiGet("/procedimento/mais-usados");
}

export async function getProcedimentosUsoTotal() {
  return apiGet("/procedimento/uso-total");
}
