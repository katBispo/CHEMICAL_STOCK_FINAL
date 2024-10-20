package com.laboratorio.labanalise.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "ANALITO")
public class Analito implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @ManyToMany
    @JoinTable(
        name = "AMOSTRA_ANALITO",
        joinColumns = @JoinColumn(name = "ID_ANALITO"),
        inverseJoinColumns = @JoinColumn(name = "ID_AMOSTRA")
    )
    private List<Amostra> amostras = new ArrayList<>();

    public Analito(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public Analito(String nome) {
        this.nome = nome;
    }

    public Analito() {
    }

    // Getter and setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and setter for nome
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    // Getter and setter for amostras
    public List<Amostra> getAmostras() {
        return amostras;
    }

    public void setAmostras(List<Amostra> amostras) {
        this.amostras = amostras;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Analito analito = (Analito) o;
        return Objects.equals(id, analito.id) && Objects.equals(nome, analito.nome);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome);
    }
}
