package com.laboratorio.labanalise.DTO;

import java.util.List;

public class ProcedureDTO {
    private List<String> classificacoes;
    private List<String> tipos;
    private List<String> subtipos;

    // Getters e Setters
    public List<String> getClassificacoes() {
        return classificacoes;
    }

    public void setClassificacoes(List<String> classificacoes) {
        this.classificacoes = classificacoes;
    }

    public List<String> getTipos() {
        return tipos;
    }

    public void setTipos(List<String> tipos) {
        this.tipos = tipos;
    }

    public List<String> getSubtipos() {
        return subtipos;
    }

    public void setSubtipos(List<String> subtipos) {
        this.subtipos = subtipos;
    }
}
