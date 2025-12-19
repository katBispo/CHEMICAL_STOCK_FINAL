package com.laboratorio.labanalise.DTO;

import java.time.LocalDate;

import com.laboratorio.labanalise.model.enums.StatusFrasco;


public class FrascoReagenteDTO {

    private Long id;
    private Long reagenteId;
    private String nomeReagente;

    private Double capacidadeMaxima;
    private Double quantidadeAtual;
    private StatusFrasco status;
    private LocalDate dataValidade;

    public FrascoReagenteDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getReagenteId() {
        return reagenteId;
    }

    public void setReagenteId(Long reagenteId) {
        this.reagenteId = reagenteId;
    }

    public String getNomeReagente() {
        return nomeReagente;
    }

    public void setNomeReagente(String nomeReagente) {
        this.nomeReagente = nomeReagente;
    }

    public Double getCapacidadeMaxima() {
        return capacidadeMaxima;
    }

    public void setCapacidadeMaxima(Double capacidadeMaxima) {
        this.capacidadeMaxima = capacidadeMaxima;
    }

    public Double getQuantidadeAtual() {
        return quantidadeAtual;
    }

    public void setQuantidadeAtual(Double quantidadeAtual) {
        this.quantidadeAtual = quantidadeAtual;
    }

    public StatusFrasco getStatus() {
        return status;
    }

    public void setStatus(StatusFrasco status) {
        this.status = status;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }




}
