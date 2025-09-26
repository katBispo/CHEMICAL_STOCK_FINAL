import { apiPost } from "./api";

export async function cadastrarUsuario(usuario) {
  return apiPost("/usuarios", usuario);
}
