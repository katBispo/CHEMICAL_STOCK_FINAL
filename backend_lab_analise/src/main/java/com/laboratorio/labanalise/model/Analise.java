package com.laboratorio.labanalise.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.laboratorio.labanalise.model.enums.StatusAnalise;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "ANALISE")
public class Analise implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private LocalDate dataCadastro;

    private LocalDate dataInicio;

    private String descricaoGeral;

    @Enumerated(EnumType.STRING)
    private StatusAnalise statusAnalise;

    private Integer quantidadeAmostras;

    private LocalDate prazoFinalizacao;

    @ManyToOne
    @JoinColumn(name = "ID_MATRIZ", nullable = false)
    private Matriz matriz;

    @OneToMany(mappedBy = "analise", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Amostra> amostras = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_CONTRATO", nullable = false)
    private Contrato contrato;

    public Analise() {
    }

    public Analise(String nome, LocalDate dataCadastro, LocalDate dataInicio, String descricaoGeral,
            StatusAnalise statusAnalise,
            Integer quantidadeAmostras, LocalDate prazoFinalizacao, Matriz matriz, Contrato contrato) {
        this.nome = nome;
        this.dataCadastro = dataCadastro;
        this.dataInicio = dataInicio;
        this.descricaoGeral = descricaoGeral;
        this.statusAnalise = statusAnalise;
        this.quantidadeAmostras = quantidadeAmostras;
        this.prazoFinalizacao = prazoFinalizacao;
        this.matriz = matriz;
        this.contrato = contrato;
    }

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

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public String getDescricaoGeral() {
        return descricaoGeral;
    }

    public void setDescricaoGeral(String descricaoGeral) {
        this.descricaoGeral = descricaoGeral;
    }

    public StatusAnalise getStatusAnalise() {
        return statusAnalise;
    }

    public void setStatusAnalise(StatusAnalise statusAnalise) {
        this.statusAnalise = statusAnalise;
    }

    public Integer getQuantidadeAmostras() {
        return quantidadeAmostras;
    }

    public void setQuantidadeAmostras(Integer quantidadeAmostras) {
        this.quantidadeAmostras = quantidadeAmostras;
    }

    public LocalDate getPrazoFinalizacao() {
        return prazoFinalizacao;
    }

    public void setPrazoFinalizacao(LocalDate prazoFinalizacao) {
        this.prazoFinalizacao = prazoFinalizacao;
    }

    public Matriz getMatriz() {
        return matriz;
    }

    public void setMatriz(Matriz matriz) {
        this.matriz = matriz;
    }

    public Contrato getContrato() {
        return contrato;
    }

    public void setContrato(Contrato contrato) {
        this.contrato = contrato;
    }

    public List<Amostra> getAmostras() {
        return amostras;
    }

    public void setAmostras(List<Amostra> amostras) {
        this.amostras = amostras;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Analise analise = (Analise) o;
        return Objects.equals(id, analise.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
