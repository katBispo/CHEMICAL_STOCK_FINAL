package com.laboratorio.labanalise.DTO;

public class AnalitoSubtipoDTO {

    private Long analitoId;
    private String subtipo;
    private String classificacao;

    public AnalitoSubtipoDTO() {
    }

    public AnalitoSubtipoDTO(Long analitoId, String classificacao, String subtipo) {
        this.analitoId = analitoId;
        this.classificacao = classificacao;
        this.subtipo = subtipo;
    }

    public Long getAnalitoId() {
        return analitoId;
    }

    public void setAnalitoId(Long analitoId) {
        this.analitoId = analitoId;
    }

    public String getSubtipo() {
        return subtipo;
    }

    public void setSubtipo(String subtipo) {
        this.subtipo = subtipo;
    }

    public String getClassificacao() {
        return classificacao;
    }

    public void setClassificacao(String classificacao) {
        this.classificacao = classificacao;
    }

}
