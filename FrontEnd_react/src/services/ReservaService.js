import { apiGet, apiPost, apiPut, apiDelete } from "./api";

// lista todas as reservas
export async function getReservas() {
  return apiGet("/reserva-equipamento");
}

// busca por id
export async function getReservaById(id) {
  return apiGet(`/reserva-equipamento/${id}`);
}

// cria nova reserva
export async function salvarReserva(reservaPayload) {
  return apiPost("/reserva-equipamento", reservaPayload);
}

// aprova reserva
export async function aprovarReserva(id) {
  return apiPut(`/reserva-equipamento/${id}/aprovar`);
}

// nega reserva
export async function negarReserva(id) {
  return apiPut(`/reserva-equipamento/${id}/negar`);
}

// exclui reserva
export async function deleteReserva(id) {
  return apiDelete(`/reserva-equipamento/${id}`);
}

// lista enum NaturezaProjeto
export async function getNaturezasProjeto() {
  return apiGet("/reserva-equipamento/naturezas-projeto");
}
