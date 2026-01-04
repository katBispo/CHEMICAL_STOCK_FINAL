package com.laboratorio.labanalise.model.pk;

import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.model.Analito;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Column;

@Embeddable
public class AmostraAnalitoPK implements Serializable {

    @Column(name = "amostra_id")
    private Long amostraId;

    @Column(name = "analito_id")
    private Long analitoId;

    @Column(name = "subtipo")
    private String subtipo;

    public AmostraAnalitoPK() {
    }

    public AmostraAnalitoPK(Long amostraId, Long analitoId, String subtipo) {
        this.amostraId = amostraId;
        this.analitoId = analitoId;
        this.subtipo = subtipo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AmostraAnalitoPK)) {
            return false;
        }
        AmostraAnalitoPK that = (AmostraAnalitoPK) o;
        return Objects.equals(amostraId, that.amostraId)
                && Objects.equals(analitoId, that.analitoId)
                && Objects.equals(subtipo, that.subtipo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(amostraId, analitoId, subtipo);
    }
    // getters & setters

    public Long getAmostraId() {
        return amostraId;
    }

    public void setAmostraId(Long amostraId) {
        this.amostraId = amostraId;
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
}
