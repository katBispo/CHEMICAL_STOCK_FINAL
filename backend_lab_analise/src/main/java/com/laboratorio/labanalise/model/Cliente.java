package com.laboratorio.labanalise.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate; // Importa LocalDate
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "CLIENTE")
public class Cliente implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    
    @Column(length = 50, unique = true)
    private String email;
    
    @Column(length = 30, unique = true)
    private String CNPJ;
    
    private String telefone;

    @Column(name = "data_cadastro") // Nome da coluna no banco de dados
    private LocalDate dataCadastro; // Adiciona o campo dataCadastro

    @OneToMany(mappedBy = "cliente")
    private List<Contrato> contratos = new ArrayList<>();

    public Cliente(String nome, String email, String CNPJ, String telefone, LocalDate dataCadastro) {
        this.nome = nome;
        this.email = email;
        this.CNPJ = CNPJ;
        this.telefone = telefone;
        this.dataCadastro = dataCadastro; // Inicializa o campo dataCadastro
    }

    public Cliente() {
    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCNPJ() {
        return CNPJ;
    }

    public void setCNPJ(String CNPJ) {
        this.CNPJ = CNPJ;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public LocalDate getDataCadastro() { // Adiciona o getter para dataCadastro
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) { // Adiciona o setter para dataCadastro
        this.dataCadastro = dataCadastro;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cliente cliente = (Cliente) o;
        return Objects.equals(id, cliente.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
