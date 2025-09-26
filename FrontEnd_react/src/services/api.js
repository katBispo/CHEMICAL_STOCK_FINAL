import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Funções utilitárias
export async function apiGet(endpoint) {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function apiPost(endpoint, body) {
  try {
    const response = await api.post(endpoint, body);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function apiPut(endpoint, body) {
  try {
    const response = await api.put(endpoint, body);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function apiDelete(endpoint) {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Tratamento centralizado de erros
function handleApiError(error) {
  if (error.response?.status === 401|| error.response?.status === 403) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExp");
    window.location.href = "/loginPage"; // força logout
    return;
  }
  throw error.response?.data?.message || error.message || "Erro inesperado";
}


export default api;
