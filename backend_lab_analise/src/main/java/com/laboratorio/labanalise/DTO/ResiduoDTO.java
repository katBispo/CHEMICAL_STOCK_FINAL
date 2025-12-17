package com.laboratorio.labanalise.DTO;

import java.time.LocalDate;

import com.laboratorio.labanalise.model.Residuo;

public class ResiduoDTO {

    private Long id;
    private String nome;
    private String tipo;
    private String estadoFisico;
    private double quantidade;
    private String unidadeMedida;
    private LocalDate dataGeracao;
    private LocalDate dataDescarte;
    private String observacao;
    private String status; // EM_ESTOQUE, TRATADO, DESCARTADO

    // 🔹 Construtor padrão
    public ResiduoDTO() {
    }

    // 🔹 Construtor completo
    public ResiduoDTO(Long id, String nome, String tipo, String estadoFisico,
                      double quantidade, String unidadeMedida,
                      LocalDate dataGeracao, LocalDate dataDescarte,
                      String observacao, String status) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.estadoFisico = estadoFisico;
        this.quantidade = quantidade;
        this.unidadeMedida = unidadeMedida;
        this.dataGeracao = dataGeracao;
        this.dataDescarte = dataDescarte;
        this.observacao = observacao;
        this.status = status;
    }

    // 🔹 Construtor a partir da Entity
    public ResiduoDTO(Residuo residuo) {
        this.id = residuo.getId();
        this.nome = residuo.getNome();
        this.tipo = residuo.getTipo();
        this.estadoFisico = residuo.getEstadoFisico();
        this.quantidade = residuo.getQuantidade();
        this.unidadeMedida = residuo.getUnidadeMedida();
        this.dataGeracao = residuo.getDataGeracao();
        this.dataDescarte = residuo.getDataDescarte();
        this.observacao = residuo.getObservacao();
        this.status = residuo.getStatus().name(); 
    }

    // 🔹 Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getEstadoFisico() {
        return estadoFisico;
    }

    public void setEstadoFisico(String estadoFisico) {
        this.estadoFisico = estadoFisico;
    }

    public double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(double quantidade) {
        this.quantidade = quantidade;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public LocalDate getDataGeracao() {
        return dataGeracao;
    }

    public void setDataGeracao(LocalDate dataGeracao) {
        this.dataGeracao = dataGeracao;
    }

    public LocalDate getDataDescarte() {
        return dataDescarte;
    }

    public void setDataDescarte(LocalDate dataDescarte) {
        this.dataDescarte = dataDescarte;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
