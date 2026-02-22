import { apiGet, apiPost, apiPut, apiDelete } from "./api.js";

const BASE_ENDPOINT = "/frascos";

export async function getTotalFrascos() {
  return apiGet(`${BASE_ENDPOINT}/total`);
}