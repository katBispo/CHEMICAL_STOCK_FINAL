package com.laboratorio.labanalise.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

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
    private byte[] pdfData;
    @Column(nullable = false)
    private Integer totalExecucoes = 0;

    @OneToMany(mappedBy = "id.procedimento")
    private Set<AmostraProcedimento> amostraProcedimentos = new HashSet();

    @Column(name = "data_cadastro", nullable = false)
    private LocalDate dataCadastro;

    @ManyToMany
    @JoinTable(name = "procedimento_equipamento", joinColumns = @JoinColumn(name = "procedimento_id"), inverseJoinColumns = @JoinColumn(name = "equipamento_id"))
    private Set<Equipamento> equipamentos = new HashSet<>();

    @OneToMany(mappedBy = "procedimento")
    private Set<ReagenteUsadoProcedimento> reagentesUsados = new HashSet<>();

    public Procedimento() {
        this.dataCadastro = LocalDate.now();
    }

    public Procedimento(String nomeProcedimento, String descricaoProcedimento) {
        this.nomeProcedimento = nomeProcedimento;
        this.descricaoProcedimento = descricaoProcedimento;
        this.dataCadastro = LocalDate.now();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeProcedimento() {
        return this.nomeProcedimento;
    }

    public void setNomeProcedimento(String nomeProcedimento) {
        this.nomeProcedimento = nomeProcedimento;
    }

    public String getDescricaoProcedimento() {
        return this.descricaoProcedimento;
    }

    public void setDescricaoProcedimento(String descricaoProcedimento) {
        this.descricaoProcedimento = descricaoProcedimento;
    }

    public byte[] getPdfData() {
        return this.pdfData;
    }

    public void setPdfData(byte[] pdfData) {
        this.pdfData = pdfData;
    }

    public LocalDate getDataCadastro() {
        return this.dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (o != null && this.getClass() == o.getClass()) {
            Procedimento that = (Procedimento) o;
            return Objects.equals(this.id, that.id);
        } else {
            return false;
        }
    }

    public void incrementarUso() {
        if (this.totalExecucoes == null) {
            this.totalExecucoes = 0;
        }
        this.totalExecucoes++;
    }

    public int hashCode() {
        return Objects.hash(new Object[]{this.id});
    }

    public Integer getTotalExecucoes() {
        return totalExecucoes;
    }

    public void setTotalExecucoes(Integer totalExecucoes) {
        this.totalExecucoes = totalExecucoes;
    }

    public Set<AmostraProcedimento> getAmostraProcedimentos() {
        return amostraProcedimentos;
    }

    public void setAmostraProcedimentos(Set<AmostraProcedimento> amostraProcedimentos) {
        this.amostraProcedimentos = amostraProcedimentos;
    }

    public Set<Equipamento> getEquipamentos() {
        return equipamentos;
    }

    public void setEquipamentos(Set<Equipamento> equipamentos) {
        this.equipamentos = equipamentos;
    }

    public Set<ReagenteUsadoProcedimento> getReagentesUsados() {
        return reagentesUsados;
    }

    public void setReagentesUsados(Set<ReagenteUsadoProcedimento> reagentesUsados) {
        this.reagentesUsados = reagentesUsados;
    }
}
