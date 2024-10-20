package com.laboratorio.labanalise.model;


import com.laboratorio.labanalise.model.enums.StatusAnalise;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private LocalDateTime dataCadastro;
    private String descricaoGeral;
    private StatusAnalise statusAnalise;
    private Integer quantidadeAmostras;
    private LocalDate prazoFinalizacao;

    @ManyToOne
    @JoinColumn(name = "ID_MATRIZ", nullable = false)
    private Matriz matriz;
    @OneToMany(mappedBy = "analise")
    List<Amostra> amostras = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "ID_CONTRATO",nullable = false)
    private Contrato contrato;

    public Analise() {
    }

    public Analise(String nome, LocalDateTime dataCadastro, String descricaoGeral, StatusAnalise statusAnalise, Integer quantidadeAmostras, LocalDate prazoFinalizacao) {
        this.nome = nome;
        this.dataCadastro = dataCadastro;
        this.descricaoGeral = descricaoGeral;
        this.statusAnalise = statusAnalise;
        this.quantidadeAmostras = quantidadeAmostras;
        this.prazoFinalizacao = prazoFinalizacao;
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

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Analise analise = (Analise) o;
        return Objects.equals(id, analise.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}