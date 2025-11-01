package com.laboratorio.labanalise.DTO;

import com.laboratorio.labanalise.model.enums.*;
import com.laboratorio.labanalise.model.Equipamento;

import java.util.List;
import java.util.stream.Collectors;

public class EquipamentoDTO {
    private Long id;
    private String nome;
    private String fabricante;
    private String modelo;
    private String numeroSerie;
    private String descricao;
    private StatusEquipamento status;
    private List<Long> procedimentosIds;

    public EquipamentoDTO() {}

    public EquipamentoDTO(Equipamento equipamento) {
        this.id = equipamento.getId();
        this.nome = equipamento.getNome();
        this.fabricante = equipamento.getFabricante();
        this.modelo = equipamento.getModelo();
        this.numeroSerie = equipamento.getNumeroSerie();
        this.descricao = equipamento.getDescricao();
        this.status = equipamento.getStatus();
        if (equipamento.getProcedimentos() != null) {
            this.procedimentosIds = equipamento.getProcedimentos()
                    .stream()
                    .map(p -> p.getId())
                    .collect(Collectors.toList());
        }
    }

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

    public List<Long> getProcedimentosIds() { return procedimentosIds; }
    public void setProcedimentosIds(List<Long> procedimentosIds) { this.procedimentosIds = procedimentosIds; }
}
