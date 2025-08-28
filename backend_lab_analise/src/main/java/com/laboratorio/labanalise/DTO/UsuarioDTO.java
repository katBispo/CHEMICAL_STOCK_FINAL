package com.laboratorio.labanalise.DTO;
import com.laboratorio.labanalise.model.enums.*;

import java.time.LocalDate;

public class UsuarioDTO {
    private Long id;
    private String nome;
    private String cpf;
    private String email;
    private String crq;
    private LocalDate dataAdmissao;
    private Cargo cargo;

    public UsuarioDTO(Long id, String nome, String cpf, String email, String crq, LocalDate dataAdmissao, Cargo cargo) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.crq = crq;
        this.dataAdmissao = dataAdmissao;
        this.cargo = cargo;
    }

    // Getters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getCpf() { return cpf; }
    public String getEmail() { return email; }
    public String getCrq() { return crq; }
    public LocalDate getDataAdmissao() { return dataAdmissao; }
    public Cargo getCargo() { return cargo; }
}