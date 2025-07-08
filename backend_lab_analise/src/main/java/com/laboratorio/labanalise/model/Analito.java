package com.laboratorio.labanalise.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "ANALITO")
public class Analito implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String classificacao;
    private String tipoAnalito;

    @ElementCollection
    @CollectionTable(name = "ANALITO_SUBTIPOS", joinColumns = @JoinColumn(name = "ID_ANALITO"))
    @Column(name = "SUBTIPO")
    private List<String> subtipoAnalito = new ArrayList<>();


    @OneToMany(mappedBy = "analito", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AmostraAnalito> amostraAnalitos = new HashSet<>();

    public Analito() {
    }

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

    public List<String> getSubtipoAnalito() {
        return subtipoAnalito;
    }

    public void setSubtipoAnalito(List<String> subtipoAnalito) {
        this.subtipoAnalito = subtipoAnalito;
    }

   

    // Método para adicionar tipo e subtipos ao Analito
    public void adicionarTipo(String tipo, List<String> subtipos) {
        this.tipoAnalito = tipo;
        this.subtipoAnalito.addAll(subtipos); // Adiciona a lista de subtipos ao existente
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
}
