package com.laboratorio.labanalise.DTO;


import java.time.LocalDate;

import com.laboratorio.labanalise.model.enums.TipoMovimentacao;

public class MovimentacaoReagenteResponseDTO {

    private Long id;
    private Long reagenteId;
    private String nomeReagente;

    private TipoMovimentacao tipoMovimentacao;
    private Double quantidadeAlterada;
    private LocalDate dataMovimentacao;
    private String motivo;

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

    public TipoMovimentacao getTipoMovimentacao() {
        return tipoMovimentacao;
    }

    public void setTipoMovimentacao(TipoMovimentacao tipoMovimentacao) {
        this.tipoMovimentacao = tipoMovimentacao;
    }

    public Double getQuantidadeAlterada() {
        return quantidadeAlterada;
    }

    public void setQuantidadeAlterada(Double quantidadeAlterada) {
        this.quantidadeAlterada = quantidadeAlterada;
    }


    public LocalDate getDataMovimentacao() {
        return dataMovimentacao;
    }

    public void setDataMovimentacao(LocalDate dataMovimentacao) {
        this.dataMovimentacao = dataMovimentacao;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }





}
