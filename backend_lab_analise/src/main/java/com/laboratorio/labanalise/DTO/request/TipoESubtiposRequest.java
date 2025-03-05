package com.laboratorio.labanalise.DTO.request;
import java.util.List;


public class TipoESubtiposRequest {
    private String tipoAnalito;
    private List<String> subtipoAnalito;

    public String getTipoAnalito() {
        return tipoAnalito;
    }
    public void setTipoAnalito(String tipoAnalito) {
        this.tipoAnalito = tipoAnalito;
    }
    public List<String> getSubtipoAnalito() {
        return subtipoAnalito;
    }
    public void setSubtipoAnalito(List<String> subtipoAnalito) {
        this.subtipoAnalito = subtipoAnalito;
    }
    
    
}
