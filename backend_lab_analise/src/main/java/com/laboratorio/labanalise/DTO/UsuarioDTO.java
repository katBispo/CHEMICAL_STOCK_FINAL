package com.laboratorio.labanalise.DTO;

import java.time.LocalDate;

import com.laboratorio.labanalise.model.enums.Cargo;
import com.laboratorio.labanalise.model.enums.StatusUsuario;
public class UsuarioDTO {

    private Long id;
    private String nome;
    private String cpf;
    private String email;
    private String crq;
    private LocalDate dataAdmissao;
    private Cargo cargo;
    private StatusUsuario status;
    private String fotoPerfil; 

    public UsuarioDTO(Long id, String nome, String cpf, String email, String crq,
                      LocalDate dataAdmissao, Cargo cargo, StatusUsuario status, String fotoPerfil) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.crq = crq;
        this.dataAdmissao = dataAdmissao;
        this.cargo = cargo;
        this.status = status;
        this.fotoPerfil = fotoPerfil;
    }

    // Getters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getCpf() { return cpf; }
    public String getEmail() { return email; }
    public String getCrq() { return crq; }
    public LocalDate getDataAdmissao() { return dataAdmissao; }
    public Cargo getCargo() { return cargo; }
    public StatusUsuario getStatus() { return status; }
    public String getFotoPerfil() { return fotoPerfil; }

    // Setter
    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCrq(String crq) {
        this.crq = crq;
    }

    public void setDataAdmissao(LocalDate dataAdmissao) {
        this.dataAdmissao = dataAdmissao;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public void setStatus(StatusUsuario status) {
        this.status = status;
    }




}