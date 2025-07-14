package com.laboratorio.labanalise.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laboratorio.labanalise.model.pk.AmostraProcedimentoPK;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;
@Entity
@Table(name = "procedimento_amostra")
public class AmostraProcedimento implements Serializable {

    @EmbeddedId
    private AmostraProcedimentoPK id = new AmostraProcedimentoPK();

    @ManyToOne
    @MapsId("amostra") // refere-se a id.amostra (Long)
    @JoinColumn(name = "amostra_id")
    private Amostra amostra;

    @ManyToOne
    @MapsId("procedimento") // refere-se a id.procedimento (Long)
    @JoinColumn(name = "procedimento_id")
    private Procedimento procedimento;

    public AmostraProcedimento() {
    }

    public AmostraProcedimento(Amostra amostra, Procedimento procedimento) {
    this.amostra = amostra;
    this.procedimento = procedimento;
    this.id = new AmostraProcedimentoPK(amostra.getId(), procedimento.getId()); 
}


    @JsonIgnore
    public Amostra getAmostra() {
        return amostra;
    }

   public void setAmostra(Amostra amostra) {
    this.amostra = amostra;
    this.id.setAmostra(amostra.getId()); 
}
    @JsonIgnore
    public Procedimento getProcedimento() {
        return procedimento;
    }

   public void setProcedimento(Procedimento procedimento) {
    this.procedimento = procedimento;
    this.id.setProcedimento(procedimento.getId()); 
}

    public AmostraProcedimentoPK getId() {
        return id;
    }

    public void setId(AmostraProcedimentoPK id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AmostraProcedimento)) return false;
        AmostraProcedimento that = (AmostraProcedimento) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
