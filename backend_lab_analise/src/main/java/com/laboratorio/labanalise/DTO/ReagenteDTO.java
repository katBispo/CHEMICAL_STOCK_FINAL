package com.laboratorio.labanalise.DTO;

import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.model.enums.UnidadeReagente;

import java.time.Instant;
import java.time.LocalDate;

public class ReagenteDTO {

    private Long id;
    private String nome;
    private String marca;
    private String lote;
    private boolean controlado;
    private String numeroControlado;
    private LocalDate dataValidade;
    private TipoReagente tipo;
    private UnidadeReagente unidadeReagente;
    private Integer quantidadeDeFrascos;
    private Double quantidadePorFrasco;
    private Double quantidadeTotal;
    private Double quantidadeAtual;
    private String cadastradoPor;
    private String atualizadoPor;
    private Instant criadoEm;
    private Instant atualizadoEm;

    public ReagenteDTO() {
    }

    // Getters e Setters

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

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public boolean isControlado() {
        return controlado;
    }

    public void setControlado(boolean controlado) {
        this.controlado = controlado;
    }

    public String getNumeroControlado() {
        return numeroControlado;
    }

    public void setNumeroControlado(String numeroControlado) {
        this.numeroControlado = numeroControlado;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public TipoReagente getTipo() {
        return tipo;
    }

    public void setTipo(TipoReagente tipo) {
        this.tipo = tipo;
    }

    public UnidadeReagente getUnidadeReagente() {
        return unidadeReagente;
    }

    public void setUnidadeReagente(UnidadeReagente unidadeReagente) {
        this.unidadeReagente = unidadeReagente;
    }

    public Integer getQuantidadeDeFrascos() {
        return quantidadeDeFrascos;
    }

    public void setQuantidadeDeFrascos(Integer quantidadeDeFrascos) {
        this.quantidadeDeFrascos = quantidadeDeFrascos;
    }

    public Double getQuantidadePorFrasco() {
        return quantidadePorFrasco;
    }

    public void setQuantidadePorFrasco(Double quantidadePorFrasco) {
        this.quantidadePorFrasco = quantidadePorFrasco;
    }

    public Double getQuantidadeTotal() {
        return quantidadeTotal;
    }

    public void setQuantidadeTotal(Double quantidadeTotal) {
        this.quantidadeTotal = quantidadeTotal;
    }

    public Double getQuantidadeAtual() {
        return quantidadeAtual;
    }

    public void setQuantidadeAtual(Double quantidadeAtual) {
        this.quantidadeAtual = quantidadeAtual;
    }

    public String getCadastradoPor() {
        return cadastradoPor;
    }

    public void setCadastradoPor(String cadastradoPor) {
        this.cadastradoPor = cadastradoPor;
    }

    public String getAtualizadoPor() {
        return atualizadoPor;
    }

    public void setAtualizadoPor(String atualizadoPor) {
        this.atualizadoPor = atualizadoPor;
    }

    public Instant getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(Instant criadoEm) {
        this.criadoEm = criadoEm;
    }

    public Instant getAtualizadoEm() {
        return atualizadoEm;
    }

    public void setAtualizadoEm(Instant atualizadoEm) {
        this.atualizadoEm = atualizadoEm;
    }
}
