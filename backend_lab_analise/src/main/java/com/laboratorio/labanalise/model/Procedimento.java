package com.laboratorio.labanalise.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "PROCEDIMENTO")
public class Procedimento implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomeProcedimento;

    private String descricaoProcedimento;

    @Lob
    private byte[] pdfData; // Campo para armazenar o PDF

    @ManyToMany
    @JoinTable(name = "PROCEDIMENTO_AMOSTRA", joinColumns = @JoinColumn(name = "id_procedimento"), inverseJoinColumns = @JoinColumn(name = "id_amostra"))
    private List<Amostra> amostras = new ArrayList<>();

    // Nova variável para armazenar a data de cadastro
    @Column(name = "data_cadastro", nullable = false)
    private LocalDate dataCadastro;

    // Getters e Setters

    public Procedimento() {
        this.dataCadastro = LocalDate.now(); // Definindo a data de cadastro como a data atual
    }

    public Procedimento(String nomeProcedimento, String descricaoProcedimento) {
        this.nomeProcedimento = nomeProcedimento;
        this.descricaoProcedimento = descricaoProcedimento;
        this.dataCadastro = LocalDate.now(); // Definindo a data de cadastro como a data atual
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeProcedimento() {
        return nomeProcedimento;
    }

    public void setNomeProcedimento(String nomeProcedimento) {
        this.nomeProcedimento = nomeProcedimento;
    }

    public String getDescricaoProcedimento() {
        return descricaoProcedimento;
    }

    public void setDescricaoProcedimento(String descricaoProcedimento) {
        this.descricaoProcedimento = descricaoProcedimento;
    }

    public byte[] getPdfData() {
        return pdfData;
    }

    public void setPdfData(byte[] pdfData) {
        this.pdfData = pdfData;
    }

    public List<Amostra> getAmostras() {
        return amostras;
    }

    public void setAmostras(List<Amostra> amostras) {
        this.amostras = amostras;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Procedimento that = (Procedimento) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
