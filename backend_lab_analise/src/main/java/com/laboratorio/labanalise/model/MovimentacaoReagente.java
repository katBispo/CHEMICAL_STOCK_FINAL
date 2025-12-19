package com.laboratorio.labanalise.model;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.laboratorio.labanalise.model.enums.TipoMovimentacao;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "MOVIMENTACAO_REAGENTE")
@EntityListeners(AuditingEntityListener.class)
public class MovimentacaoReagente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reagente_id", nullable = false)
    private Reagente reagente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "frasco_id")
    private FrascoReagente frasco;

    @Column(nullable = false)
    private LocalDate dataMovimentacao = LocalDate.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoMovimentacao tipoMovimentacao;

    @Column(nullable = false)
    private Double quantidadeAlterada;

    @Column(nullable = false)
    private Double quantidadeFinal;

    @Column
    private String motivo;

    // getters e setters
    public FrascoReagente getFrasco() {
        return frasco;
    }

    public void setFrasco(FrascoReagente frasco) {
        this.frasco = frasco;
    }

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

    public LocalDate getDataMovimentacao() {
        return dataMovimentacao;
    }

    public void setDataMovimentacao(LocalDate dataMovimentacao) {
        this.dataMovimentacao = dataMovimentacao;
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

    public Double getQuantidadeFinal() {
        return quantidadeFinal;
    }

    public void setQuantidadeFinal(Double quantidadeFinal) {
        this.quantidadeFinal = quantidadeFinal;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }




}
