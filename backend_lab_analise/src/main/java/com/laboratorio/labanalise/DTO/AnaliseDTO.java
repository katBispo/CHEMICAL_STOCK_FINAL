package com.laboratorio.labanalise.DTO;

import java.time.LocalDate;
import java.util.List;


import com.laboratorio.labanalise.model.enums.StatusAnalise;

public class AnaliseDTO {
    private Long id;
    private String nome;
    private LocalDate dataCadastro;
    private LocalDate dataInicio;
    private String descricaoGeral;
    private StatusAnalise statusAnalise;
    private Integer quantidadeAmostras;
    private LocalDate prazoFinalizacao;
    private Long matrizId; // Apenas o ID, sem serializar a entidade completa
    private Long contratoId; // Apenas o ID
    private List<Long> amostraIds;








    
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
    public LocalDate getDataCadastro() {
        return dataCadastro;
    }
    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
    public LocalDate getDataInicio() {
        return dataInicio;
    }
    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }
    public String getDescricaoGeral() {
        return descricaoGeral;
    }
    public void setDescricaoGeral(String descricaoGeral) {
        this.descricaoGeral = descricaoGeral;
    }
    public StatusAnalise getStatusAnalise() {
        return statusAnalise;
    }
    public void setStatusAnalise(StatusAnalise statusAnalise) {
        this.statusAnalise = statusAnalise;
    }
    public Integer getQuantidadeAmostras() {
        return quantidadeAmostras;
    }
    public void setQuantidadeAmostras(Integer quantidadeAmostras) {
        this.quantidadeAmostras = quantidadeAmostras;
    }
    public LocalDate getPrazoFinalizacao() {
        return prazoFinalizacao;
    }
    public void setPrazoFinalizacao(LocalDate prazoFinalizacao) {
        this.prazoFinalizacao = prazoFinalizacao;
    }
    public Long getMatrizId() {
        return matrizId;
    }
    public void setMatrizId(Long matrizId) {
        this.matrizId = matrizId;
    }
    public Long getContratoId() {
        return contratoId;
    }
    public void setContratoId(Long contratoId) {
        this.contratoId = contratoId;
    }
    public List<Long> getAmostraIds() {
        return amostraIds;
    }
    public void setAmostraIds(List<Long> amostraIds) {
        this.amostraIds = amostraIds;
    }

    
}
