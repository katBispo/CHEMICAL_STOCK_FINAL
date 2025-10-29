package com.laboratorio.labanalise.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laboratorio.labanalise.model.pk.AmostraProcedimentoPK;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class AmostraEquipamentoId implements Serializable {

    private Long amostraId;
    private Long equipamentoId;

    public AmostraEquipamentoId() {
    }

    public AmostraEquipamentoId(Long amostraId, Long equipamentoId) {
        this.amostraId = amostraId;
        this.equipamentoId = equipamentoId;
    }

    // Getters e Setters
    public Long getAmostraId() {
        return amostraId;
    }

    public void setAmostraId(Long amostraId) {
        this.amostraId = amostraId;
    }

    public Long getEquipamentoId() {
        return equipamentoId;
    }

    public void setEquipamentoId(Long equipamentoId) {
        this.equipamentoId = equipamentoId;
    }

    // equals e hashCode corretos
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        AmostraEquipamentoId that = (AmostraEquipamentoId) o;
        return Objects.equals(amostraId, that.amostraId) &&
                Objects.equals(equipamentoId, that.equipamentoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(amostraId, equipamentoId);
    }
}
