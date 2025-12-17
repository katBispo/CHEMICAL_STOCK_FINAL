package com.laboratorio.labanalise.model;

import java.io.Serializable;
import java.time.LocalDate;

import com.laboratorio.labanalise.model.enums.StatusResiduo;

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
@Table(name = "RESIDUO")
public class Residuo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String tipo; // Ex: "ácido", "base", "sal", "óxido", "outro"

    @Column(nullable = false)
    private double quantidade; // em gramas ou litros, dependendo do tipo

    @Column(nullable = false)
    private String unidadeMedida; // "g", "L", "mL", etc.

    @Column(nullable = false)
    private String estadoFisico; // "sólido", "líquido", "gasoso"

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusResiduo status;

    private LocalDate dataGeracao;

    private LocalDate dataDescarte;

    @Column(length = 500)
    private String observacao;

    // Exemplo: relacionamento com o usuário que gerou o resíduo
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // 🔹 Construtores
    public Residuo() {
    }

public Residuo(String nome, String tipo, double quantidade,
               String unidadeMedida, String estadoFisico,
               LocalDate dataGeracao) {
    this.nome = nome;
    this.tipo = tipo;
    this.quantidade = quantidade;
    this.unidadeMedida = unidadeMedida;
    this.estadoFisico = estadoFisico;
    this.dataGeracao = dataGeracao;
    this.status = StatusResiduo.EM_ESTOQUE;
}

    // 🔹 Getters e Setters
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

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(double quantidade) {
        this.quantidade = quantidade;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public String getEstadoFisico() {
        return estadoFisico;
    }

    public void setEstadoFisico(String estadoFisico) {
        this.estadoFisico = estadoFisico;
    }

    public LocalDate getDataGeracao() {
        return dataGeracao;
    }

    public void setDataGeracao(LocalDate dataGeracao) {
        this.dataGeracao = dataGeracao;
    }

    public LocalDate getDataDescarte() {
        return dataDescarte;
    }

    public void setDataDescarte(LocalDate dataDescarte) {
        this.dataDescarte = dataDescarte;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
public StatusResiduo getStatus() {
    return status;
}

public void setStatus(StatusResiduo status) {
    this.status = status;
}

}
