// src/models/ProcedimentoModel.js
export default class Procedimento {
  constructor(nomeProcedimento, descricaoProcedimento, dataCadastro, reagentesQuantidades = []) {
    this.nomeProcedimento = nomeProcedimento;
    this.descricaoProcedimento = descricaoProcedimento;
    this.dataCadastro = dataCadastro;
    this.reagentesQuantidades = reagentesQuantidades;
  }
}
