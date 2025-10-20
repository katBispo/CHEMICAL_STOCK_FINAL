package com.laboratorio.labanalise.DTO;

import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.model.Analise;


import java.time.LocalDate;

public class AmostraComAnaliseDTO {
    private Long id;
    private String nome;
    private LocalDate prazoFinalizacao;
    private String enderecoColeta;
    private String status;
    private Long analiseId;
    private String nomeAnalise;

    // Construtor
    public AmostraComAnaliseDTO(Long id, String nome, LocalDate prazoFinalizacao,
                                String enderecoColeta, String status,
                                Long analiseId, String nomeAnalise) {
        this.id = id;
        this.nome = nome;
        this.prazoFinalizacao = prazoFinalizacao;
        this.enderecoColeta = enderecoColeta;
        this.status = status;
        this.analiseId = analiseId;
        this.nomeAnalise = nomeAnalise;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public LocalDate getPrazoFinalizacao() { return prazoFinalizacao; }
    public void setPrazoFinalizacao(LocalDate prazoFinalizacao) { this.prazoFinalizacao = prazoFinalizacao; }
    public String getEnderecoColeta() { return enderecoColeta; }
    public void setEnderecoColeta(String enderecoColeta) { this.enderecoColeta = enderecoColeta; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Long getAnaliseId() { return analiseId; }
    public void setAnaliseId(Long analiseId) { this.analiseId = analiseId; }
    public String getNomeAnalise() { return nomeAnalise; }
    public void setNomeAnalise(String nomeAnalise) { this.nomeAnalise = nomeAnalise; }
}