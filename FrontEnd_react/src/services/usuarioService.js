import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export async function getUsuarios() {
  return apiGet("/usuarios");
}

export async function getUsuarioById(id) {
  return apiGet(`/usuarios/${id}`);
}

export async function criarUsuario(usuario) {
  return apiPost("/usuarios", usuario);
}

export async function atualizarUsuario(id, usuario) {
  return apiPut(`/usuarios/${id}`, usuario);
}

export async function deletarUsuario(id) {
  return apiDelete(`/usuarios/${id}`);
}

export async function aprovarUsuario(id) {
  return apiPut(`/usuarios/aprovar/${id}`);
}

export async function negarUsuario(id) {
  return apiPut(`/usuarios/negar/${id}`);
}

export async function getUsuariosPendentes() {
  return apiGet("/usuarios/pendentes");
}
