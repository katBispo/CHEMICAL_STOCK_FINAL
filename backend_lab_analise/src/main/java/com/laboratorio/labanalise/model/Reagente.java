package com.laboratorio.labanalise.model;


import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "REAGENTE")
public class Reagente implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    @Column(length = 50,nullable = false)
    private String nome;
    @Column(nullable = false)
    private String marca;
    @Column(nullable = false)
    private String lote;
    @Column(nullable = false)
    private boolean controlado;
    @OneToMany(mappedBy = "reagente")
    private List<ReagenteUsado> reagenteUsados = new ArrayList<>();

    public Reagente(String nome) {
        this.nome = nome;
    }
    public Reagente() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public boolean isControlado() {
        return controlado;
    }

    public void setControlado(boolean controlado) {
        this.controlado = controlado;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reagente reagente = (Reagente) o;
        return Objects.equals(id, reagente.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
