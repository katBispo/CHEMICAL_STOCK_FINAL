package com.laboratorio.labanalise.model;

import java.time.LocalDateTime;

import com.laboratorio.labanalise.model.enums.TipoMovimentacao;

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
@Table(name = "movimentacao_reagente")
public class MovimentacaoReagente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime dataMovimentacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoMovimentacao tipoMovimentacao;

    @Column(nullable = false)
    private Double quantidadeAlterada;

    private String motivo;

    @ManyToOne
    @JoinColumn(name = "reagente_id", nullable = false)
    private Reagente reagente;

    @ManyToOne
    @JoinColumn(name = "frasco_id")
    private FrascoReagente frasco;

    // =========================
    // CONSTRUTORES
    // =========================
    public MovimentacaoReagente() {
    }

    // =========================
    // GETTERS / SETTERS
    // =========================
    public Long getId() {
        return id;
    }

    public Reagente getReagente() {
        return reagente;
    }

    public void setReagente(Reagente reagente) {
        this.reagente = reagente;
    }

    public FrascoReagente getFrasco() {
        return frasco;
    }

    public void setFrasco(FrascoReagente frasco) {
        this.frasco = frasco;
    }

    public TipoMovimentacao getTipoMovimentacao() {
        return tipoMovimentacao;
    }

    public void setTipoMovimentacao(TipoMovimentacao tipoMovimentacao) {
        this.tipoMovimentacao = tipoMovimentacao;
    }

    public Double getQuantidadeAlterada() {
        return quantidadeAlterada;
    }

    public void setQuantidadeAlterada(Double quantidadeAlterada) {
        this.quantidadeAlterada = quantidadeAlterada;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public LocalDateTime getDataMovimentacao() {
        return dataMovimentacao;
    }

    public void setDataMovimentacao(LocalDateTime dataMovimentacao) {
        this.dataMovimentacao = dataMovimentacao;
    }
}
