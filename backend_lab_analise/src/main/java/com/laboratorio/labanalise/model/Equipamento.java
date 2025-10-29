package com.laboratorio.labanalise.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "EQUIPAMENTO")
public class Equipamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String fabricante;

    private String modelo;

    private LocalDate dataAquisicao;

    private String descricao;

    // Relacionamento muitos-para-muitos com Amostra via tabela associativa
    @OneToMany(mappedBy = "equipamento", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AmostraEquipamento> amostraEquipamentos = new HashSet<>();

    public Equipamento() {}

    public Equipamento(String nome, String fabricante, String modelo, LocalDate dataAquisicao, String descricao) {
        this.nome = nome;
        this.fabricante = fabricante;
        this.modelo = modelo;
        this.dataAquisicao = dataAquisicao;
        this.descricao = descricao;
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

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public LocalDate getDataAquisicao() {
        return dataAquisicao;
    }

    public void setDataAquisicao(LocalDate dataAquisicao) {
        this.dataAquisicao = dataAquisicao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<AmostraEquipamento> getAmostraEquipamentos() {
        return amostraEquipamentos;
    }

    public void setAmostraEquipamentos(Set<AmostraEquipamento> amostraEquipamentos) {
        this.amostraEquipamentos = amostraEquipamentos;
    }
}
