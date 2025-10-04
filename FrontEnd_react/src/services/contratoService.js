// services/ContratoService.js
const API_URL = "http://localhost:8080/contrato";

export const ContratoService = {
  async getAll() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erro ao buscar contratos");
      return await response.json();
    } catch (error) {
      console.error("Erro no ContratoService.getAll:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("Erro ao buscar contrato por ID");
      return await response.json();
    } catch (error) {
      console.error("Erro no ContratoService.getById:", error);
      throw error;
    }
  },

  async create(data) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Erro ao cadastrar contrato");
      return await response.json();
    } catch (error) {
      console.error("Erro no ContratoService.create:", error);
      throw error;
    }
  },

  async update(id, data) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Erro ao atualizar contrato");
      return await response.json();
    } catch (error) {
      console.error("Erro no ContratoService.update:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir contrato");
      return true;
    } catch (error) {
      console.error("Erro no ContratoService.delete:", error);
      throw error;
    }
  },
};
