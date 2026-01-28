package com.laboratorio.labanalise.model;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.model.enums.UnidadeReagente;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "REAGENTE")
@EntityListeners(AuditingEntityListener.class)
public class Reagente implements Serializable {

    private static final long serialVersionUID = 1L;

    // =========================
    // IDENTIFICAÇÃO
    // =========================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String nome;

    @Column(nullable = false)
    private String marca;

    @Column(nullable = false)
    private String lote;

    // =========================
    // CONTROLE
    // =========================
    @Column(nullable = false)
    private boolean controlado;

    @Column
    private String numeroControlado;

    // =========================
    // VALIDADE / CLASSIFICAÇÃO
    // =========================
    @Column(nullable = false)
    private LocalDate dataValidade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoReagente tipo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UnidadeReagente unidadeReagente;

    // =========================
    // CONFIGURAÇÃO DE FRASCOS
    // =========================
    @Column(nullable = false)
    private Integer quantidadeDeFrascos;

    @Column(nullable = false)
    private Double quantidadePorFrasco;

    // =========================
    // AUDITORIA
    // =========================
    @CreatedBy
    @Column(length = 50, updatable = false)
    private String cadastradoPor;

    @LastModifiedBy
    @Column(length = 50)
    private String atualizadoPor;

    @CreatedDate
    @Column(updatable = false)
    private Instant criadoEm;

    @LastModifiedDate
    private Instant atualizadoEm;

    // =========================
    // CONSTRUTORES
    // =========================
    public Reagente() {
    }

    // =========================
    // GETTERS E SETTERS
    // =========================
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

    

    // =========================
    // EQUALS / HASHCODE
    // =========================
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Reagente)) return false;
        Reagente reagente = (Reagente) o;
        return Objects.equals(id, reagente.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
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
