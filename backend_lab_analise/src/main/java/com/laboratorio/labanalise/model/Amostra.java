package com.laboratorio.labanalise.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "AMOSTRA")
public class Amostra implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private Long id;
    @Column(nullable = false)
    private String nome;
    private String enderecoColeta;
    private LocalDateTime dataColeta;
    private String coordenadaColeta;

    @ManyToMany(mappedBy = "amostras")
    private List<Analito> analitos = new ArrayList<>();
    @OneToMany(mappedBy = "amostra")
    private List<Procedimento> procedimentos = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "ID_ANALISE",nullable = false)
    private Analise analise;


    public Amostra(String nome, String enderecoColeta, LocalDateTime dataColeta, String coordenadaColeta) {
        this.nome = nome;
        this.enderecoColeta = enderecoColeta;
        this.dataColeta = dataColeta;
        this.coordenadaColeta = coordenadaColeta;
    }

    public Amostra(){

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

    public String getEnderecoColeta() {
        return enderecoColeta;
    }

    public void setEnderecoColeta(String enderecoColeta) {
        this.enderecoColeta = enderecoColeta;
    }

    public LocalDateTime getDataColeta() {
        return dataColeta;
    }

    public void setDataColeta(LocalDateTime dataColeta) {
        this.dataColeta = dataColeta;
    }

    public String getCoordenadaColeta() {
        return coordenadaColeta;
    }

    public void setCoordenadaColeta(String coordenadaColeta) {
        this.coordenadaColeta = coordenadaColeta;
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
        return Objects.hashCode(id);
    }
}
