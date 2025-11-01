package com.laboratorio.labanalise.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import com.laboratorio.labanalise.model.enums.*;


@Entity
@Table(name = "equipamentos")
public class Equipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;                 // Nome do equipamento
    private String fabricante;           // Fabricante
    private String modelo;               // Modelo
    private String numeroSerie;          // Número de série
    private String descricao;            // Descrição adicional

    @Enumerated(EnumType.STRING)
    private StatusEquipamento status;    // Status: ATIVO, INATIVO, MANUTENCAO

    // Relacionamento muitos-para-muitos com Procedimento
    @ManyToMany(mappedBy = "equipamentos")
    private Set<Procedimento> procedimentos = new HashSet<>();

    // Construtor padrão
    public Equipamento() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getFabricante() { return fabricante; }
    public void setFabricante(String fabricante) { this.fabricante = fabricante; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public String getNumeroSerie() { return numeroSerie; }
    public void setNumeroSerie(String numeroSerie) { this.numeroSerie = numeroSerie; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public StatusEquipamento getStatus() { return status; }
    public void setStatus(StatusEquipamento status) { this.status = status; }

    public Set<Procedimento> getProcedimentos() { return procedimentos; }
    public void setProcedimentos(Set<Procedimento> procedimentos) { this.procedimentos = procedimentos; }
}
