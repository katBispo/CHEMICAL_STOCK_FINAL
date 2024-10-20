package com.laboratorio.labanalise.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "CONTRATO")
public class Contrato implements Serializable {
    private static final long serialVersionUID = 1L;

   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String numeroContrato;

    private String nomeContrato;
    
    private LocalDate dataContrato;
    
    private LocalDate dataEntrega;
    
    private Integer quantidadeAnalises;

    // Novo campo 'observacao'
    private String observacao;

    @OneToMany(mappedBy = "contrato")
    private List<Analise> analises;

    @ManyToOne
    @JoinColumn(name = "ID_CLIENTE")
    private Cliente cliente;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroContrato() {
        return numeroContrato;
    }

    public void setNumeroContrato(String numeroContrato) {
        this.numeroContrato = numeroContrato;
    }

    public String getNomeContrato() {
        return nomeContrato;
    }

    public void setNomeContrato(String nomeContrato) {
        this.nomeContrato = nomeContrato;
    }

    public LocalDate getDataContrato() {
        return dataContrato;
    }

    public void setDataContrato(LocalDate dataContrato) {
        this.dataContrato = dataContrato;
    }

    public LocalDate getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(LocalDate dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    public Integer getQuantidadeAnalises() {
        return quantidadeAnalises;
    }

    public void setQuantidadeAnalises(Integer quantidadeAnalises) {
        this.quantidadeAnalises = quantidadeAnalises;
    }

    // Getters e Setters para o campo 'observacao'
    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Contrato contrato = (Contrato) o;
        return Objects.equals(id, contrato.id) && Objects.equals(numeroContrato, contrato.numeroContrato);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, numeroContrato);
    }
}
