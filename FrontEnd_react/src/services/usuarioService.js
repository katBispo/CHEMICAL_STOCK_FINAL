import { apiGet, apiPost, apiPut, apiDelete } from "./api";

const BASE_ENDPOINT = "/usuarios";

export async function getUsuarios() {
  return apiGet(BASE_ENDPOINT);
}

export async function getUsuarioById(id) {
  return apiGet(`${BASE_ENDPOINT}/${id}`);
}

export async function criarUsuario(usuario) {
  return apiPost(BASE_ENDPOINT, usuario);
}

export async function atualizarUsuario(id, usuario) {
  return apiPut(`${BASE_ENDPOINT}/${id}`, usuario);
}

export async function deletarUsuario(id) {
  return apiDelete(`${BASE_ENDPOINT}/${id}`);
}

export async function aprovarUsuario(id) {
  return apiPut(`${BASE_ENDPOINT}/aprovar/${id}`);
}

export async function negarUsuario(id) {
  return apiPut(`${BASE_ENDPOINT}/negar/${id}`);
}

export async function getUsuariosPendentes() {
  return apiGet(`${BASE_ENDPOINT}/pendentes`);
}

export async function getUsuarioLogado() {
  return apiGet(`${BASE_ENDPOINT}/me`);
}
