package com.laboratorio.labanalise.model.pk;

import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.model.Procedimento;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.io.Serializable;
import java.util.Objects;
@Embeddable
public class AmostraProcedimentoPK implements Serializable {

    private Long amostra;
    private Long procedimento;

    public AmostraProcedimentoPK() {}

    public AmostraProcedimentoPK(Long amostra, Long procedimento) {
        this.amostra = amostra;
        this.procedimento = procedimento;
    }

    public Long getAmostra() {
        return amostra;
    }

    public void setAmostra(Long amostra) {
        this.amostra = amostra;
    }

    public Long getProcedimento() {
        return procedimento;
    }

    public void setProcedimento(Long procedimento) {
        this.procedimento = procedimento;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AmostraProcedimentoPK)) return false;
        AmostraProcedimentoPK that = (AmostraProcedimentoPK) o;
        return Objects.equals(amostra, that.amostra) &&
               Objects.equals(procedimento, that.procedimento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(amostra, procedimento);
    }
}
