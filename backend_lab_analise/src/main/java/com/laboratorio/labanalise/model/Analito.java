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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String classificacao;

    private String tipoAnalito;

    @ElementCollection
    @CollectionTable(
            name = "analito_subtipos",
            joinColumns = @JoinColumn(name = "id_analito")
    )
    @Column(name = "subtipo")
    private List<String> subtipos = new ArrayList<>();

    @OneToMany(mappedBy = "analito", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AmostraAnalito> amostraAnalitos = new HashSet<>();

    // ✅ MÉTODO QUE ESTAVA FALTANDO
    public void adicionarTipo(String tipoAnalito, List<String> subtipos) {
        this.tipoAnalito = tipoAnalito;

        if (subtipos != null) {
            this.subtipos.clear();       
            this.subtipos.addAll(subtipos);
        }
    }

    // getters e setters
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

    public Set<AmostraAnalito> getAmostraAnalitos() {
        return amostraAnalitos;
    }

    public void setAmostraAnalitos(Set<AmostraAnalito> amostraAnalitos) {
        this.amostraAnalitos = amostraAnalitos;
    }

}
