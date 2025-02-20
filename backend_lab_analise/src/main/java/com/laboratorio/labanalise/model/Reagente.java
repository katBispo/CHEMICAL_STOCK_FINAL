package com.laboratorio.labanalise.model;

import com.laboratorio.labanalise.model.enums.TipoMovimentacao;
import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.model.enums.UnidadeReagente;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Entity
@Table(name = "REAGENTE")
@EntityListeners(AuditingEntityListener.class)
public class Reagente implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String nome;

    @Column(nullable = false)
    private String marca;

    @Column(nullable = false)
    private String lote;

    @Column(nullable = false)
    private boolean controlado;

    @Column(nullable = true)
    private String numeroControlado;

    @Column(nullable = false)
    private LocalDate dataValidade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoReagente tipo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UnidadeReagente unidadeReagente;

    // Quantidade de frascos (ex: 10 frascos de 500mL)
    @Column(nullable = false)
    private Integer quantidadeDeFrascos;

    // Quantidade de conteúdo por frasco (ex: 500mL por frasco)
    @Column(nullable = false)
    private Double quantidadePorFrasco;

    // Relacionamento com movimentações (histórico de estoque)
    @OneToMany(mappedBy = "reagente", cascade = CascadeType.PERSIST, orphanRemoval = true)
    // @JsonIgnore
    private List<MovimentacaoReagente> movimentacoes;

    @CreatedBy
    @Column(length = 50, updatable = false)
    private String cadastradoPor;

    @LastModifiedBy
    @Column(length = 50, updatable = false)
    private String atualizadoPor;

    @LastModifiedDate
    private Instant criadoEm = Instant.now();
    @LastModifiedDate
    private Instant atualizadoEm = Instant.now();
    @Column
    private Double quantidadeTotal;
    @Column
    private Double quantidadeAtual;

    public Reagente() {
    }

    public void setQuantidadeTotal(Double quantidadeTotal) {
        this.quantidadeTotal = quantidadeTotal;
    }

    // Método para calcular o estoque atual com base nas movimentações
    public Double getQuantidadeTotal() {
        /*return movimentacoes.stream()
                .mapToDouble(MovimentacaoReagente::getQuantidadeFinal)
                .reduce((first, second) -> second) // Pega o último registro
                .orElse(0.0);*/
        Double entrada = obterEntradas();

        Double saida = obtertTotalDeSaidas();
        entrada = Optional.ofNullable(entrada).orElse(0.0);
        saida = Optional.ofNullable(saida).orElse(0.0);

        return entrada - saida;
    }

    @PrePersist
    public void prePersist() {
        if (this.quantidadeTotal == null) {
            this.quantidadeTotal = getQuantidadeAtual(); // Define a quantidade inicial como a quantidade atual dos frascos
        }
    }



    private Double obterEntradas() {
        Double entrada = Optional.ofNullable(movimentacoes)
                .orElse(Collections.emptyList())
                .stream()
                .filter(movimentacaoReagente -> movimentacaoReagente.getTipoMovimentacao().equals(TipoMovimentacao.ENTRADA))
                .mapToDouble(movimentacao -> movimentacao.getQuantidadeAlterada())
                .sum();
        return entrada;
    }

    private Double obtertTotalDeSaidas() {
        Double saida = Optional.ofNullable(movimentacoes)
                .orElse(Collections.emptyList())
                .stream()
                .filter(movimentacaoReagente -> movimentacaoReagente.getTipoMovimentacao().equals(TipoMovimentacao.SAIDA))
                .mapToDouble(movimentacao -> movimentacao.getQuantidadeAlterada())
                .sum();
        return saida;
    }

    public Double getQuantidadeAtual() {
        Double quantidade = this.quantidadeDeFrascos * this.quantidadePorFrasco;
        return quantidade;
    }

    public void setQuantidadeAtual(Double quantidadeAtual) {
        this.quantidadeTotal = quantidadeAtual;
    }

    public void reduzirQuantidade(Double quantidade) {
        if(quantidade<this.quantidadeTotal)
            this.quantidadeTotal = this.quantidadeTotal - quantidade;
        else
            throw new IllegalArgumentException("Estoque possui menos que a quantidade!");
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public boolean isControlado() {
        return controlado;
    }

    public void setControlado(boolean controlado) {
        this.controlado = controlado;
    }

    public String getNumeroControlado() {
        return numeroControlado;
    }

    public void setNumeroControlado(String numeroControlado) {
        this.numeroControlado = numeroControlado;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public TipoReagente getTipo() {
        return tipo;
    }

    public void setTipo(TipoReagente tipo) {
        this.tipo = tipo;
    }

    public UnidadeReagente getUnidadeReagente() {
        return unidadeReagente;
    }

    public void setUnidadeReagente(UnidadeReagente unidadeReagente) {
        this.unidadeReagente = unidadeReagente;
    }

    public Integer getQuantidadeDeFrascos() {
        return quantidadeDeFrascos;
    }

    public void setQuantidadeDeFrascos(Integer qtdFrascos) {
        this.quantidadeDeFrascos = qtdFrascos;
    }

    public Double getQuantidadePorFrasco() {
        return quantidadePorFrasco;
    }

    public void setQuantidadePorFrasco(Double volumePorFrasco) {
        this.quantidadePorFrasco = volumePorFrasco;
    }

    public List<MovimentacaoReagente> getMovimentacoes() {
        return movimentacoes;
    }

    public void setMovimentacoes(List<MovimentacaoReagente> movimentacoes) {
        this.movimentacoes = movimentacoes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Reagente reagente = (Reagente) o;
        return Objects.equals(id, reagente.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}