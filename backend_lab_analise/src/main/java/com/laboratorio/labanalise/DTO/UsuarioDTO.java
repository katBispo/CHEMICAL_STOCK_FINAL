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
    private StatusUsuario status; // NOVO CAMPO

    public UsuarioDTO(Long id, String nome, String cpf, String email, String crq, LocalDate dataAdmissao, Cargo cargo, StatusUsuario status) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.crq = crq;
        this.dataAdmissao = dataAdmissao;
        this.cargo = cargo;
        this.status = status;
    }

    // Getters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getCpf() { return cpf; }
    public String getEmail() { return email; }
    public String getCrq() { return crq; }
    public LocalDate getDataAdmissao() { return dataAdmissao; }
    public Cargo getCargo() { return cargo; }
    public StatusUsuario getStatus() { return status; } // GETTER NOVO
}
