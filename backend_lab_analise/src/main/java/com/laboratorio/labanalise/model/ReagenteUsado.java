package com.laboratorio.labanalise.model;


import jakarta.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "REAGENTE_USADO")
public class ReagenteUsado implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private BigDecimal milimetros;
    private BigDecimal miligramas;
    private BigDecimal gramas;
    private BigDecimal microgramas;

    @ManyToOne
    @JoinColumn(name = "ID_REAGENTE",nullable = false)
    private Reagente reagente;

    @ManyToMany
    @JoinTable(name = "REGANTE_USADO_PROCEDIMENTO", joinColumns = @JoinColumn(name = "ID_REAGENTE_USADO"), inverseJoinColumns = @JoinColumn(name = "ID_PROCEDIMENTO"))
    private List<Procedimento> procedimentos = new ArrayList<>();


    public ReagenteUsado(BigDecimal milimetros, BigDecimal miligramas, BigDecimal gramas, BigDecimal microgramas) {
        this.milimetros = milimetros;
        this.miligramas = miligramas;
        this.gramas = gramas;
        this.microgramas = microgramas;
    }

    public ReagenteUsado() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getMilimetros() {
        return milimetros;
    }

    public void setMilimetros(BigDecimal milimetros) {
        this.milimetros = milimetros;
    }

    public BigDecimal getMiligramas() {
        return miligramas;
    }

    public void setMiligramas(BigDecimal miligramas) {
        this.miligramas = miligramas;
    }

    public BigDecimal getGramas() {
        return gramas;
    }

    public void setGramas(BigDecimal gramas) {
        this.gramas = gramas;
    }

    public BigDecimal getMicrogramas() {
        return microgramas;
    }

    public void setMicrogramas(BigDecimal microgramas) {
        this.microgramas = microgramas;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReagenteUsado that = (ReagenteUsado) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
