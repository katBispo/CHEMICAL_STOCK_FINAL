package com.laboratorio.labanalise.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LogAcao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String usuario;
    private String acao;
    private String classe;
    private LocalDateTime dataHora;

    // construtores, getters e setters
    public LogAcao() {}

    public LogAcao(String usuario, String acao, String classe, LocalDateTime dataHora) {
        this.usuario = usuario;
        this.acao = acao;
        this.classe = classe;
        this.dataHora = dataHora;
    }

    // Getters e setters
    public Long getId() { return id; }
    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
    public String getAcao() { return acao; }
    public void setAcao(String acao) { this.acao = acao; }
    public String getClasse() { return classe; }
    public void setClasse(String classe) { this.classe = classe; }
    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }
}
