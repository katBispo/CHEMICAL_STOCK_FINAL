package com.laboratorio.labanalise.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.laboratorio.labanalise.model.enums.TipoReagente;

@Entity
@Table(name = "REAGENTE")
public class Reagente implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String nome;

    @Column(nullable = false)
    private String marca;

    @Column(nullable = false)
    private String lote;

    @Column(nullable = false)
    private boolean controlado;

    @Column(nullable = true)
    private String numeroControlado; // Novo campo opcional para número controlado

    @Column(nullable = false)
    private LocalDate dataValidade;

    @OneToMany(mappedBy = "reagente")
    private List<ReagenteUsado> reagenteUsados = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoReagente tipo;

    // Construtores
    public Reagente(String nome) {
        this.nome = nome;
    }

    public Reagente() {
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

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public boolean isControlado() {
        return controlado;
    }

    public void setControlado(boolean controlado) {
        this.controlado = controlado;
    }

    public String getNumeroControlado() {
        return numeroControlado;
    }

    public void setNumeroControlado(String numeroControlado) {
        this.numeroControlado = numeroControlado;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public TipoReagente getTipo() {
        return tipo;
    }

    public void setTipo(TipoReagente tipo) {
        this.tipo = tipo;
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
