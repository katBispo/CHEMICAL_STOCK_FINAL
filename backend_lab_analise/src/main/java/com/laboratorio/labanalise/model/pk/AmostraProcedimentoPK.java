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
    private static final long serialVersionUID = 1L;
    @ManyToOne
    @JoinColumn(
            name = "id_procedimento"
    )
    private Procedimento procedimento;
    @ManyToOne
    @JoinColumn(
            name = "id_amostra"
    )
    private Amostra amostra;

    public AmostraProcedimentoPK() {
    }

    public Procedimento getProcedimento() {
        return this.procedimento;
    }

    public void setProcedimento(Procedimento procedimento) {
        this.procedimento = procedimento;
    }

    public Amostra getAmostra() {
        return this.amostra;
    }

    public void setAmostra(Amostra amostra) {
        this.amostra = amostra;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (o != null && this.getClass() == o.getClass()) {
            AmostraProcedimentoPK that = (AmostraProcedimentoPK)o;
            return Objects.equals(this.procedimento, that.procedimento) && Objects.equals(this.amostra, that.amostra);
        } else {
            return false;
        }
    }

    public int hashCode() {
        return Objects.hash(new Object[]{this.procedimento, this.amostra});
    }
}