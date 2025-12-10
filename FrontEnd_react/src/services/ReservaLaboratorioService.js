import { apiGet, apiPost, apiPut, apiDelete } from "./api";

// lista todas as reservas
export async function getReservas() {
  return apiGet("/reserva-laboratorio");
}

// busca por id
export async function getReservaById(id) {
  return apiGet(`/reserva-laboratorio/${id}`);
}

// cria nova reserva
export async function salvarReserva(payload) {
  return apiPost("/reserva-laboratorio", payload);
}

// aprovar
export async function aprovarReserva(id) {
  return apiPut(`/reserva-laboratorio/${id}/aprovar`);
}

// negar
export async function negarReserva(id) {
  return apiPut(`/reserva-laboratorio/${id}/negar`);
}

// excluir
export async function deleteReserva(id) {
  return apiDelete(`/reserva-laboratorio/${id}`);
}

// enum
export async function getNaturezasProjeto() {
  return apiGet("/reserva-laboratorio/naturezas-projeto");
}
