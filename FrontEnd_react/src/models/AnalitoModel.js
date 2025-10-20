// models/AnalitoModel.js
export default class Analito {
  constructor(classificacao, tipoAnalito, subtipoAnalito = []) {
    this.classificacao = classificacao;
    this.tipoAnalito = tipoAnalito;
    this.subtipoAnalito = subtipoAnalito;
  }
}
