import { apiGet, apiPost, apiPut, apiDelete } from "./api";

const BASE_ENDPOINT = "/residuos";

// ================== CRUD ==================

export async function getResiduos() {
  return apiGet(BASE_ENDPOINT);
}

export async function getResiduoById(id) {
  return apiGet(`${BASE_ENDPOINT}/${id}`);
}

export async function criarResiduo(residuo) {
  const payload = {
    ...residuo,
    status: residuo.status ?? "EM_ESTOQUE",
  };

  return apiPost(BASE_ENDPOINT, payload);
}

export async function atualizarResiduo(id, residuo) {
  return apiPut(`${BASE_ENDPOINT}/${id}`, residuo);
}

export async function deletarResiduo(id) {
  return apiDelete(`${BASE_ENDPOINT}/${id}`);
}
