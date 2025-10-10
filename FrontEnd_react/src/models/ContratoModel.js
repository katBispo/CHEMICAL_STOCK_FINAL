export default class Contrato {
  constructor(numeroContrato, nomeContrato, dataContrato, dataEntrega, quantidadeAnalises, observacao, cliente) {
    this.numeroContrato = numeroContrato;
    this.nomeContrato = nomeContrato;
    this.dataContrato = dataContrato;
    this.dataEntrega = dataEntrega;
    this.quantidadeAnalises = quantidadeAnalises;
    this.observacao = observacao;
    this.statusContrato = "ATIVO";
    this.cliente = cliente ? { id: cliente.id } : null; 
  }
}
