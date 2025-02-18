import axios from 'axios';

// Cria uma instância do axios com a URL base do seu backend
const api = axios.create({
  baseURL: 'http://localhost:8080', // URL do seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
