package com.laboratorio.labanalise.DTO;



import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class TipoAnalitoDto {
    private String tipoAnalito;
    private List<String> subtipos; // Supondo que você tenha uma lista de subtipos

    // Getters e Setters
    public String getTipoAnalito() {
        return tipoAnalito;
    }

    public void setTipoAnalito(String tipoAnalito) {
        this.tipoAnalito = tipoAnalito;
    }

    public List<String> getSubtipos() {
        return subtipos;
    }

    public void setSubtipos(List<String> subtipos) {
        this.subtipos = subtipos;
    }
}