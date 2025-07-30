package com.laboratorio.labanalise.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laboratorio.labanalise.model.pk.AmostraAnalitoPK;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import java.io.Serializable;


@Entity
@Table(name = "amostra_analito")
public class AmostraAnalito implements Serializable {

    @EmbeddedId
    private AmostraAnalitoPK id = new AmostraAnalitoPK();

    @ManyToOne
    @MapsId("amostraId")
    @JoinColumn(name = "amostra_id")
    private Amostra amostra;

    @ManyToOne
    @MapsId("analitoId") 
    @JoinColumn(name = "analito_id")
    private Analito analito;

    @Column(name = "SUBTIPO_ANALITO")
    private String subtipo;



    public AmostraAnalito() {
    }

    public AmostraAnalito(Amostra amostra, Analito analito) {
        this.amostra = amostra;
        this.analito = analito;
        this.id = new AmostraAnalitoPK(amostra.getId(), analito.getId());
    }

    public Amostra getAmostra() {
        return amostra;
    }

    public void setAmostra(Amostra amostra) {
        this.amostra = amostra;
        this.id.setAmostraId(amostra.getId());
    }

    public Analito getAnalito() {
        return analito;
    }

    public void setAnalito(Analito analito) {
        this.analito = analito;
        this.id.setAnalitoId(analito.getId());
    }

    public AmostraAnalitoPK getId() {
        return id;
    }

    public void setId(AmostraAnalitoPK id) {
        this.id = id;
    }


    public String getSubtipo() {
        return subtipo;
    }

    public void setSubtipo(String subtipo) {
        this.subtipo = subtipo;
    }
}
