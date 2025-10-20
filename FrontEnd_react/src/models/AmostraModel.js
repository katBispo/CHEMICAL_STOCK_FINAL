// src/models/AmostraModel.js
export default class Amostra {
  constructor(
    nome,
    dataColeta,
    prazoFinalizacao,
    enderecoColeta,
    descricao,
    dataCadastro,
    coordenadaColeta,
    analiseId,
    proceduresIds,
    status,
    analitosSelecionados
  ) {
    this.nome = nome;
    this.dataColeta = dataColeta;
    this.prazoFinalizacao = prazoFinalizacao;
    this.enderecoColeta = enderecoColeta;
    this.descricao = descricao;
    this.dataCadastro = dataCadastro;
    this.coordenadaColeta = coordenadaColeta;
    this.analiseId = analiseId;
    this.proceduresIds = proceduresIds;
    this.status = status;
    this.analitosSelecionados = analitosSelecionados;
  }
}
