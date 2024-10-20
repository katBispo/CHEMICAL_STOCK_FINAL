package com.laboratorio.labanalise.model;


import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "MATRIZ")
public class Matriz implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String nomeMatriz;
    @OneToMany(mappedBy = "matriz")
    private List<Analise> analises = new ArrayList<>();

    public Matriz(String nomeMatriz) {
        this.nomeMatriz = nomeMatriz;
    }

    public Matriz() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeMatriz() {
        return nomeMatriz;
    }

    public void setNomeMatriz(String nomeMatriz) {
        this.nomeMatriz = nomeMatriz;
    }

    public List<Analise> getAnalises() {
        return analises;
    }

    public void setAnalises(List<Analise> analises) {
        this.analises = analises;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Matriz matriz = (Matriz) o;
        return Objects.equals(id, matriz.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
