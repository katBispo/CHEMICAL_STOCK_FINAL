package com.laboratorio.labanalise.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.laboratorio.labanalise.model.enums.StatusAmostra;

@Entity
@Table(name = "AMOSTRA")
public class Amostra implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Adicionado para geração de IDs automáticos
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String enderecoColeta;

    @Column(nullable = false)
    private LocalDate dataColeta;

    private String coordenadaColeta;

    @Column(nullable = false)
    private LocalDate prazoFinalizacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusAmostra status;

    @Column(length = 500)
    private String descricao;

    @ManyToMany(mappedBy = "amostras")
    private List<Analito> analitos = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "PROCEDIMENTO_AMOSTRA",
        joinColumns = @JoinColumn(name = "id_amostra"),
        inverseJoinColumns = @JoinColumn(name = "id_procedimento")
    )
    private List<Procedimento> procedimentos = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "ID_ANALISE", nullable = false)
    private Analise analise;

    // Construtor com todos os parâmetros
    public Amostra(String nome, String enderecoColeta, LocalDate dataColeta, String coordenadaColeta,
                   LocalDate prazoFinalizacao, StatusAmostra status, String descricao) {
        this.nome = nome;
        this.enderecoColeta = enderecoColeta;
        this.dataColeta = dataColeta;
        this.coordenadaColeta = coordenadaColeta;
        this.prazoFinalizacao = prazoFinalizacao;
        this.status = status;
        this.descricao = descricao;
    }

    // Construtor padrão
    public Amostra() {
        this.status = StatusAmostra.EM_ANDAMENTO; // Status padrão
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

    public String getEnderecoColeta() {
        return enderecoColeta;
    }

    public void setEnderecoColeta(String enderecoColeta) {
        this.enderecoColeta = enderecoColeta;
    }

    public LocalDate getDataColeta() {
        return dataColeta;
    }

    public void setDataColeta(LocalDate dataColeta) {
        this.dataColeta = dataColeta;
    }

    public String getCoordenadaColeta() {
        return coordenadaColeta;
    }

    public void setCoordenadaColeta(String coordenadaColeta) {
        this.coordenadaColeta = coordenadaColeta;
    }

    public LocalDate getPrazoFinalizacao() {
        return prazoFinalizacao;
    }

    public void setPrazoFinalizacao(LocalDate prazoFinalizacao) {
        this.prazoFinalizacao = prazoFinalizacao;
    }

    public StatusAmostra getStatus() {
        return status;
    }

    public void setStatus(StatusAmostra status) {
        this.status = status;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public List<Procedimento> getProcedimentos() {
        return procedimentos;
    }

    public void setProcedimentos(List<Procedimento> procedimentos) {
        this.procedimentos = procedimentos;
    }

    public Analise getAnalise() {
        return analise;
    }

    public void setAnalise(Analise analise) {
        this.analise = analise;
    }

    public List<Analito> getAnalitos() {
        return analitos;
    }

    public void setAnalitos(List<Analito> analitos) {
        this.analitos = analitos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Amostra amostra = (Amostra) o;
        return Objects.equals(id, amostra.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
