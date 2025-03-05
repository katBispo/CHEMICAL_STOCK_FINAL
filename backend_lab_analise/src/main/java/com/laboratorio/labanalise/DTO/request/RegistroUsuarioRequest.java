package com.laboratorio.labanalise.DTO.request;

import com.laboratorio.labanalise.model.enums.Role;

public class RegistroUsuarioRequest {
    private String email;
    private String senha;
    private String nome;
    private Role role;
    private String CRQ;
    private String CPF;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getCRQ() {
        return CRQ;
    }

    public void setCRQ(String CRQ) {
        this.CRQ = CRQ;
    }

    public String getCPF() {
        return CPF;
    }

    public void setCPF(String CPF) {
        this.CPF = CPF;
    }
}
