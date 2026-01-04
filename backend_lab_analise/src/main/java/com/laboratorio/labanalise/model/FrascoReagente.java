package com.laboratorio.labanalise.model;

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
import jakarta.persistence.Transient;


@Entity
@Table(name = "frasco_reagente")
public class FrascoReagente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double capacidadeMaxima;

    @Column(nullable = false)
    private Double quantidadeAtual;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusFrasco status;

    @Column(nullable = false)
    private LocalDate dataValidade;

    @ManyToOne
    @JoinColumn(name = "reagente_id", nullable = false)
    private Reagente reagente;

    // NÃO VAI PARA O BANCO
    @Transient
    private Double quantidadeMovimentada;


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

    public Double getQuantidadeMovimentada() {
        return quantidadeMovimentada;
    }

    public void setQuantidadeMovimentada(Double quantidadeMovimentada) {
        this.quantidadeMovimentada = quantidadeMovimentada;
    }


}
