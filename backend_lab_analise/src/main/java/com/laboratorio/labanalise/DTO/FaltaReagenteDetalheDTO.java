package com.laboratorio.labanalise.DTO;

public class FaltaReagenteDetalheDTO {

    private String reagente;
    private String procedimento;
    private Double quantidadeNecessaria;
    private Double quantidadeDisponivel;

    public FaltaReagenteDetalheDTO(
            String reagente,
            String procedimento,
            Double quantidadeNecessaria,
            Double quantidadeDisponivel
    ) {
        this.reagente = reagente;
        this.procedimento = procedimento;
        this.quantidadeNecessaria = quantidadeNecessaria;
        this.quantidadeDisponivel = quantidadeDisponivel;
    }

    public String getReagente() {
        return reagente;
    }

    public String getProcedimento() {
        return procedimento;
    }

    public Double getQuantidadeNecessaria() {
        return quantidadeNecessaria;
    }

    public Double getQuantidadeDisponivel() {
        return quantidadeDisponivel;
    }
}
