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

    private Long amostraId;

    private Long analitoId;

    public AmostraAnalitoPK() {}

    public AmostraAnalitoPK(Long amostraId, Long analitoId) {
        this.amostraId = amostraId;
        this.analitoId = analitoId;
    }

    // getters e setters

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

    // equals e hashCode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AmostraAnalitoPK)) return false;
        AmostraAnalitoPK that = (AmostraAnalitoPK) o;
        return Objects.equals(amostraId, that.amostraId) &&
               Objects.equals(analitoId, that.analitoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(amostraId, analitoId);
    }
}
