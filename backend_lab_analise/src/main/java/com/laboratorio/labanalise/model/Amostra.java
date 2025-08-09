package com.laboratorio.labanalise.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laboratorio.labanalise.model.enums.StatusAmostra;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "AMOSTRA")
public class Amostra implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Column(nullable = false, updatable = false)
    private LocalDate dataCadastro;

    @Transient
    private List<Analito> analitosAuxiliares;

    @OneToMany(mappedBy = "id.amostra")
    private Set<AmostraProcedimento> amostraProcedimentos = new HashSet<>();

    @OneToMany(mappedBy = "amostra", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AmostraAnalito> amostraAnalitos = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "ID_ANALISE", nullable = false// setar como false dps
    )
    @JsonBackReference
    private Analise analise;

    public Amostra(String nome, String enderecoColeta, LocalDate dataColeta, String coordenadaColeta,
            LocalDate prazoFinalizacao, StatusAmostra status, String descricao) {
        this.nome = nome;
        this.enderecoColeta = enderecoColeta;
        this.dataColeta = dataColeta;
        this.coordenadaColeta = coordenadaColeta;
        this.prazoFinalizacao = prazoFinalizacao;
        this.status = status;
        this.descricao = descricao;
        this.dataCadastro = LocalDate.now();
    }
///testetstetst
    public Amostra() {
        this.dataCadastro = LocalDate.now();
        this.status = StatusAmostra.EM_ANDAMENTO;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataCadastro() {
        return this.dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEnderecoColeta() {
        return this.enderecoColeta;
    }

    public void setEnderecoColeta(String enderecoColeta) {
        this.enderecoColeta = enderecoColeta;
    }

    public LocalDate getDataColeta() {
        return this.dataColeta;
    }

    public void setDataColeta(LocalDate dataColeta) {
        this.dataColeta = dataColeta;
    }

    public String getCoordenadaColeta() {
        return this.coordenadaColeta;
    }

    public void setCoordenadaColeta(String coordenadaColeta) {
        this.coordenadaColeta = coordenadaColeta;
    }

    public LocalDate getPrazoFinalizacao() {
        return this.prazoFinalizacao;
    }

    public void setPrazoFinalizacao(LocalDate prazoFinalizacao) {
        this.prazoFinalizacao = prazoFinalizacao;
    }

    public StatusAmostra getStatus() {
        return this.status;
    }

    public void setStatus(StatusAmostra status) {
        this.status = status;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Analise getAnalise() {
        return this.analise;
    }

    public void setAnalise(Analise analise) {
        this.analise = analise;
    }

    @JsonIgnore
    public List<Analito> getAnalitos() {
        return amostraAnalitos.stream()
                .map(AmostraAnalito::getAnalito)
                .collect(Collectors.toList());
    }

    public Set<AmostraAnalito> getAmostraAnalitos() {
        return amostraAnalitos;
    }

    public void setAmostraAnalitos(Set<AmostraAnalito> amostraAnalitos) {
        this.amostraAnalitos = amostraAnalitos;
    }

    public void setAnalitos(List<Analito> analitos) {
        this.amostraAnalitos.clear(); // limpa os anteriores

        for (Analito analito : analitos) {
            AmostraAnalito aa = new AmostraAnalito();
            aa.setAmostra(this);
            aa.setAnalito(analito);
            this.amostraAnalitos.add(aa);
        }
    }

    public List<Analito> getAnalitosAuxiliares() {
        return analitosAuxiliares;
    }

    public void setAnalitosAuxiliares(List<Analito> analitosAuxiliares) {
        this.analitosAuxiliares = analitosAuxiliares;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (o != null && this.getClass() == o.getClass()) {
            Amostra amostra = (Amostra) o;
            return Objects.equals(this.id, amostra.id);
        } else {
            return false;
        }
    }

    public int hashCode() {
        return Objects.hash(this.id);
    }

    public Set<AmostraProcedimento> getAmostraProcedimentos() {
        return amostraProcedimentos;
    }

    public void setAmostraProcedimentos(Set<AmostraProcedimento> amostraProcedimentos) {
        this.amostraProcedimentos = amostraProcedimentos;
    }

    public StatusAmostra verificarStatusAtual() {
        if (this.status != StatusAmostra.CONCLUIDA && prazoFinalizacao != null) {
            if (prazoFinalizacao.isBefore(LocalDate.now())) {
                return StatusAmostra.ATRASADA;
            }
        }
        return this.status;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public void setProcedimentos(List<Procedimento> procedimentos) {
        this.amostraProcedimentos.clear(); // limpa os existentes

        for (Procedimento procedimento : procedimentos) {
            AmostraProcedimento ap = new AmostraProcedimento();
            ap.setAmostra(this);
            ap.setProcedimento(procedimento);
            this.amostraProcedimentos.add(ap);
        }
    }

    @JsonIgnore
    public List<Procedimento> getProcedimentos() {
        return amostraProcedimentos.stream()
                .map(AmostraProcedimento::getProcedimento)
                .collect(Collectors.toList());
    }

}
