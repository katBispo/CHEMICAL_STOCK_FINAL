package com.laboratorio.labanalise.DTO;
import com.laboratorio.labanalise.model.enums.*;

import java.time.LocalDate;

public class UsuarioCreateDTO {
    private String nome;
    private String cpf;
    private String email;
    private String crq;
    private LocalDate dataAdmissao;
    private Cargo cargo;
    private String senha;

    // Getters e Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCrq() { return crq; }
    public void setCrq(String crq) { this.crq = crq; }

    public LocalDate getDataAdmissao() { return dataAdmissao; }
    public void setDataAdmissao(LocalDate dataAdmissao) { this.dataAdmissao = dataAdmissao; }

    public Cargo getCargo() { return cargo; }
    public void setCargo(Cargo cargo) { this.cargo = cargo; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}