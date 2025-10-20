export default class Reagente {
    constructor(nome, marca, lote, dataValidade, controlado, numeroControlado, tipo, unidadeReagente, quantidadeDeFrascos, quantidadePorFrasco) {
        this.nome = nome;
        this.marca = marca;
        this.lote = lote;
        this.dataValidade = dataValidade;
        this.controlado = controlado;
        this.numeroControlado = numeroControlado;
        this.tipo = tipo;
        this.unidadeReagente = unidadeReagente;
        this.quantidadeDeFrascos = quantidadeDeFrascos;
        this.quantidadePorFrasco = quantidadePorFrasco;
    }
}
