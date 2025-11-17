package com.laboratorio.labanalise.model;
import java.io.Serializable;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;



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
