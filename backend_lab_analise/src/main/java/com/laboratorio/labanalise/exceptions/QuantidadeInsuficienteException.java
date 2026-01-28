package com.laboratorio.labanalise.exceptions;

public class QuantidadeInsuficienteException extends RuntimeException {

    private final Double disponivel;

    public QuantidadeInsuficienteException(Double disponivel) {
        this.disponivel = disponivel;
    }

    public Double getDisponivel() {
        return disponivel;
    }
}
