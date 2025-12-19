package com.laboratorio.labanalise.DTO;

public class SaidaReagenteDTO {

    private Double quantidade;
    private String motivo;

    public SaidaReagenteDTO() {
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}
