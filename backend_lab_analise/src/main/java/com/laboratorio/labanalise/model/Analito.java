package com.laboratorio.labanalise.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "ANALITO")
public class Analito implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String classificacao;
    private String tipoAnalito;
    private List<String> subtipoAnalito;


    // Alterei o nome para 'subtipos' para ser mais intuitivo
    @ElementCollection
    @CollectionTable(name = "analito_subtipos", joinColumns = @JoinColumn(name = "id_analito")) // Nome da tabela e coluna devem ser minúsculos
    @Column(name = "subtipo")
    private List<String> subtipos = new ArrayList<>(); // Nome alterado para 'subtipos'

    @OneToMany(mappedBy = "analito", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AmostraAnalito> amostraAnalitos = new HashSet<>();

    public Analito() {}

    public Analito(Long id, String classificacao) {
        this.id = id;
        this.classificacao = classificacao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassificacao() {
        return classificacao;
    }

    public void setClassificacao(String classificacao) {
        this.classificacao = classificacao;
    }

    public String getTipoAnalito() {
        return tipoAnalito;
    }

    public void setTipoAnalito(String tipoAnalito) {
        this.tipoAnalito = tipoAnalito;
    }

    public List<String> getSubtipos() {
        return subtipos;
    }

    public void setSubtipos(List<String> subtipos) {
        this.subtipos = subtipos;
    }

    // Método para adicionar tipo e subtipos ao Analito
    public void adicionarTipo(String tipo, List<String> subtipos) {
        this.tipoAnalito = tipo;
        this.subtipos.addAll(subtipos); // Adiciona a lista de subtipos ao existente
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Analito analito = (Analito) o;
        return Objects.equals(id, analito.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public Set<AmostraAnalito> getAmostraAnalitos() {
        return amostraAnalitos;
    }

    public void setAmostraAnalitos(Set<AmostraAnalito> amostraAnalitos) {
        this.amostraAnalitos = amostraAnalitos;
    }

    public List<String> getSubtipoAnalito() {
        return subtipoAnalito;
    }

    public void setSubtipoAnalito(List<String> subtipoAnalito) {
        this.subtipoAnalito = subtipoAnalito;
    }
}
