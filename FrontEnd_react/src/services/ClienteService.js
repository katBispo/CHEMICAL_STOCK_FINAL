import { apiGet, apiDelete, apiPost, apiPut } from "./api";

export async function getClientes() {
  return apiGet("/cliente");
}

export async function deleteCliente(id) {
  return apiDelete(`/cliente/${id}`);
}

export async function salvarCliente(cliente) {
  return apiPost("/cliente", cliente);
}

export async function atualizarCliente(id, cliente) {
  return apiPut(`/cliente/${id}`, cliente);
}
