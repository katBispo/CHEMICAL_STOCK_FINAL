// src/services/ProcedimentoService.js
import{ apiGet, apiPost, apiPut, apiDelete } from "./api";

export const getProcedimentos = async () => {
  return apiGet("/procedimento/select");
};

export const getAnalitos = async () => {
  const response = await apiGet("/analitos");
  return response.data; 
};
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
export async function executarProcedimento(procedimentoId) {
  return apiPost("/procedimento/executar", {
    procedimentoId,
  });
}
