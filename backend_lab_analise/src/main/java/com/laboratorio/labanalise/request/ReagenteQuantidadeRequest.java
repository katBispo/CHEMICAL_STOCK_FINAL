package com.laboratorio.labanalise.request;

public class ReagenteQuantidadeRequest {
    private Long idReagente;
    private Double quantidade;

    public Long getIdReagente() {
        return idReagente;
    }
    public void setIdReagente(Long idReagente) {
        this.idReagente = idReagente;
    }
    public Double getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }
    public ReagenteQuantidadeRequest(Long idReagente, Double quantidade) {
        this.idReagente = idReagente;
        this.quantidade = quantidade;
    }

}
