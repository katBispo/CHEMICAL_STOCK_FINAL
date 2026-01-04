package com.laboratorio.labanalise.DTO;

import java.util.List;

public class AnalitoListDTO {

    private Long id;
    private String classificacao;
    private String tipoAnalito;
    private List<String> subtipos;

    public AnalitoListDTO() {}

    public AnalitoListDTO(Long id, String classificacao, String tipoAnalito, List<String> subtipos) {
        this.id = id;
        this.classificacao = classificacao;
        this.tipoAnalito = tipoAnalito;
        this.subtipos = subtipos;
    }

    public Long getId() {
        return id;
    }

    public String getClassificacao() {
        return classificacao;
    }

    public String getTipoAnalito() {
        return tipoAnalito;
    }

    public List<String> getSubtipos() {
        return subtipos;
    }
}
