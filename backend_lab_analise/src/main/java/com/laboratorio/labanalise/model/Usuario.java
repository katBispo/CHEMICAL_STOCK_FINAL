package com.laboratorio.labanalise.model;

import java.time.LocalDate;

import com.laboratorio.labanalise.model.enums.Cargo;
import com.laboratorio.labanalise.model.enums.Role;
import com.laboratorio.labanalise.model.enums.StatusUsuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "LONGTEXT")
    private String fotoPerfil;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true, length = 16)
    private String cpf;

    @Column(nullable = false, unique = true)
    private String email;

    private String crq;

    @Column(name = "data_admissao", nullable = false)
    private LocalDate dataAdmissao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Cargo cargo;

    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    private StatusUsuario status = StatusUsuario.PENDENTE; // default pendente

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCrq() {
        return crq;
    }

    public void setCrq(String crq) {
        this.crq = crq;
    }

    public LocalDate getDataAdmissao() {
        return dataAdmissao;
    }

    public void setDataAdmissao(LocalDate dataAdmissao) {
        this.dataAdmissao = dataAdmissao;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public StatusUsuario getStatus() {
        return status;
    }

    public void setStatus(StatusUsuario status) {
        this.status = status;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getFotoPerfil() {
        return fotoPerfil;
    }

    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }


    
}
