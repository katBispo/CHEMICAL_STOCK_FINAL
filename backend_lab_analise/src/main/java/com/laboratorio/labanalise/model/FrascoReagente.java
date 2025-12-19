package com.laboratorio.labanalise.model;

import java.io.Serializable;
import java.time.LocalDate;

import com.laboratorio.labanalise.model.enums.StatusFrasco;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "FRASCO_REAGENTE")
public class FrascoReagente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "reagente_id")
    private Reagente reagente;

    @Column(nullable = false)
    private Double capacidadeMaxima;   // ex: 1000 ml

    @Column(nullable = false)
    private Double quantidadeAtual;    // ex: 450 ml

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusFrasco status;

    @Column(nullable = false)
    private LocalDate dataValidade;

    public FrascoReagente() {}

    // getters e setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Reagente getReagente() {
        return reagente;
    }

    public void setReagente(Reagente reagente) {
        this.reagente = reagente;
    }

    public Double getCapacidadeMaxima() {
        return capacidadeMaxima;
    }

    public void setCapacidadeMaxima(Double capacidadeMaxima) {
        this.capacidadeMaxima = capacidadeMaxima;
    }

    public Double getQuantidadeAtual() {
        return quantidadeAtual;
    }

    public void setQuantidadeAtual(Double quantidadeAtual) {
        this.quantidadeAtual = quantidadeAtual;
    }

    public StatusFrasco getStatus() {
        return status;
    }

    public void setStatus(StatusFrasco status) {
        this.status = status;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }


}
