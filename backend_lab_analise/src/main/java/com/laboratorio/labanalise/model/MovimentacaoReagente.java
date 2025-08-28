package com.laboratorio.labanalise.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laboratorio.labanalise.model.enums.TipoMovimentacao;
import jakarta.persistence.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;


@Entity
@Table(name = "MOVIMENTACAO_REAGENTE")
@EntityListeners(AuditingEntityListener.class)
public class MovimentacaoReagente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reagente_id", nullable = false)
    @JsonIgnore
    private Reagente reagente;

    @Column(nullable = false)
    private LocalDate dataMovimentacao = LocalDate.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoMovimentacao tipoMovimentacao; // ENTRADA ou SAÍDA

    @Column(nullable = false)
    private Double quantidadeAlterada; // Ex: +500g ou -200mL

    @Column(nullable = false)
    private Double quantidadeFinal; // Quanto ficou no estoque após essa movimentação

    @Column(nullable = true)
    private String motivo; 

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
