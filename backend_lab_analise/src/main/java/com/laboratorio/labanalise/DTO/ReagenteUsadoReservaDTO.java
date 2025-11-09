package com.laboratorio.labanalise.DTO;

import com.laboratorio.labanalise.model.ReagenteUsadoReserva;

public class ReagenteUsadoReservaDTO {
    private Long reagenteId;
    private String reagenteNome;
    private Double quantidade;

    public ReagenteUsadoReservaDTO(ReagenteUsadoReserva r) {
        this.reagenteId = r.getReagente().getId();
        this.reagenteNome = r.getReagente().getNome();
        this.quantidade = r.getQuantidade();
    }

    public Long getReagenteId() {
        return reagenteId;
    }

    public void setReagenteId(Long reagenteId) {
        this.reagenteId = reagenteId;
    }

    public String getReagenteNome() {
        return reagenteNome;
    }

    public void setReagenteNome(String reagenteNome) {
        this.reagenteNome = reagenteNome;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    
}
