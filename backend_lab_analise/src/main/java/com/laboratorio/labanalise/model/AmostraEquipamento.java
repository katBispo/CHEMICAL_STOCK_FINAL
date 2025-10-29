package com.laboratorio.labanalise.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laboratorio.labanalise.model.pk.AmostraProcedimentoPK;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import com.laboratorio.labanalise.model.*;


@Entity
@Table(name = "AMOSTRA_EQUIPAMENTO")
public class AmostraEquipamento implements Serializable {
    @EmbeddedId
    private AmostraEquipamentoId id;

    @ManyToOne
    @MapsId("amostraId")
    @JoinColumn(name = "ID_AMOSTRA")
    private Amostra amostra;

    @ManyToOne
    @MapsId("equipamentoId")
    @JoinColumn(name = "ID_EQUIPAMENTO")
    private Equipamento equipamento;

    public AmostraEquipamento() {}
    
    public AmostraEquipamento(Amostra amostra, Equipamento equipamento) {
        this.amostra = amostra;
        this.equipamento = equipamento;
        this.id = new AmostraEquipamentoId(amostra.getId(), equipamento.getId());
    }
}
