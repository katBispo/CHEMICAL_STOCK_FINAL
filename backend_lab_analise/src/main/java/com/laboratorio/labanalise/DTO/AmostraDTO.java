
package com.laboratorio.labanalise.DTO;

import java.time.LocalDate;
import java.util.List;

public class AmostraDTO {
    private Long id;
    private String nome;
    private String enderecoColeta;
    private LocalDate dataColeta;
    private String coordenadaColeta;
    private LocalDate prazoFinalizacao;
    private String status; // Pode usar o nome do enum como string
    private String descricao;
    private Long analiseId; // ID da análise associada
    private List<Long> analitos; // IDs dos analitos
    private List<Long> procedimentos; // IDs dos procedimentos associados

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

    public String getEnderecoColeta() {
        return enderecoColeta;
    }

    public void setEnderecoColeta(String enderecoColeta) {
        this.enderecoColeta = enderecoColeta;
    }

    public LocalDate getDataColeta() {
        return dataColeta;
    }

    public void setDataColeta(LocalDate dataColeta) {
        this.dataColeta = dataColeta;
    }

    public String getCoordenadaColeta() {
        return coordenadaColeta;
    }

    public void setCoordenadaColeta(String coordenadaColeta) {
        this.coordenadaColeta = coordenadaColeta;
    }

    public LocalDate getPrazoFinalizacao() {
        return prazoFinalizacao;
    }

    public void setPrazoFinalizacao(LocalDate prazoFinalizacao) {
        this.prazoFinalizacao = prazoFinalizacao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getAnaliseId() {
        return analiseId;
    }

    public void setAnaliseId(Long analiseId) {
        this.analiseId = analiseId;
    }

    public List<Long> getAnalitos() {
        return analitos;
    }

    public void setAnalitos(List<Long> analitos) {
        this.analitos = analitos;
    }

    public List<Long> getProcedimentos() {
        return procedimentos;
    }

    public void setProcedimentos(List<Long> procedimentos) {
        this.procedimentos = procedimentos;
    }
}
