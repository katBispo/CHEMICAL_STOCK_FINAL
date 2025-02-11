package com.laboratorio.labanalise.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laboratorio.labanalise.model.pk.AmostraProcedimentoPK;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.io.Serializable;

@Entity
@Table(
        name = "procedimento_amostra"
)
public class AmostraProcedimento implements Serializable {
    @EmbeddedId
    private AmostraProcedimentoPK id = new AmostraProcedimentoPK();

    public AmostraProcedimento(Amostra amostra, Procedimento procedimento) {
        this.id.setAmostra(amostra);
        this.id.setProcedimento(procedimento);
    }

    public AmostraProcedimento() {
    }

    @JsonIgnore
    public Amostra getAmostra() {
        return this.id.getAmostra();
    }

    public void setAmostra(Amostra amostra) {
        this.id.setAmostra(amostra);
    }
    @JsonIgnore
    public Procedimento getProcedimento() {
        return this.id.getProcedimento();
    }

    public void setProcedimento(Procedimento procedimento) {
        this.id.setProcedimento(procedimento);
    }
}
