// src/models/AnaliseModel.js
export default class Analise {
  constructor({
    nome,
    descricaoGeral,
    quantidadeAmostras,
    dataCadastro,
    dataInicio,
    prazoFinalizacao,
    statusAnalise,
    contrato,
    matriz,
  }) {
    this.nome = nome;
    this.descricaoGeral = descricaoGeral;
    this.quantidadeAmostras = quantidadeAmostras;
    this.dataCadastro = dataCadastro;
    this.dataInicio = dataInicio;
    this.prazoFinalizacao = prazoFinalizacao;
    this.statusAnalise = statusAnalise;
    this.contrato = contrato; // { id: ... }
    this.matriz = matriz;     // { id: ... }
  }
}
