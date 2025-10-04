// src/models/Cliente.js
class Cliente {
    constructor(nome, email, cnpj, telefone, dataCadastro = new Date().toISOString()) {
        this.nome = nome;
        this.email = email;
        this.cnpj = cnpj;
        this.telefone = telefone;
        this.dataCadastro = dataCadastro;
    }
}

export default Cliente;
