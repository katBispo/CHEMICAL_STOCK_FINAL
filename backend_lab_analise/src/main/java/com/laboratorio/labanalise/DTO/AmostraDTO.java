
package com.laboratorio.labanalise.DTO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.laboratorio.labanalise.model.Amostra;

public class AmostraDTO {
    private Long id;
    private String nome;
    private String enderecoColeta;
    private LocalDate dataColeta;
    private String coordenadaColeta;
    private LocalDate prazoFinalizacao;
    private String status;
    private String descricao;
    private Long analiseId;
    private List<Long> analitos;
    private List<Long> procedimentos;
    private LocalDate dataEncerramento;


    private LocalDate dataFinalizacaoReal;

    private List<Long> procedimentosIds;
    private List<AnalitoSubtipoDTO> analitosSelecionados = new ArrayList<>();
    private List<Long> proceduresIds;

    private String analiseNome;
    private List<String> procedimentosNomes;

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

    public String getEnderecoColeta() {
        return enderecoColeta;
    }

    public void setEnderecoColeta(String enderecoColeta) {
        this.enderecoColeta = enderecoColeta;
    }

    public LocalDate getDataColeta() {
        return dataColeta;
    }

    public void setDataColeta(LocalDate dataColeta) {
        this.dataColeta = dataColeta;
    }

    public String getCoordenadaColeta() {
        return coordenadaColeta;
    }

    public void setCoordenadaColeta(String coordenadaColeta) {
        this.coordenadaColeta = coordenadaColeta;
    }

    public LocalDate getPrazoFinalizacao() {
        return prazoFinalizacao;
    }

    public void setPrazoFinalizacao(LocalDate prazoFinalizacao) {
        this.prazoFinalizacao = prazoFinalizacao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getAnaliseId() {
        return analiseId;
    }

    public void setAnaliseId(Long analiseId) {
        this.analiseId = analiseId;
    }

    public List<Long> getAnalitos() {
        return analitos;
    }

    public void setAnalitos(List<Long> analitos) {
        this.analitos = analitos;
    }

    public List<Long> getProcedimentos() {
        return procedimentos;
    }

    public void setProcedimentos(List<Long> procedimentos) {
        this.procedimentos = procedimentos;
    }

    public String getAnaliseNome() {
        return analiseNome;
    }

    public void setAnaliseNome(String analiseNome) {
        this.analiseNome = analiseNome;

    }

    public List<Long> getProceduresIds() {
        return proceduresIds;
    }

    public void setProceduresIds(List<Long> proceduresIds) {
        this.proceduresIds = proceduresIds;
    }

    public List<String> getProcedimentosNomes() {
        return procedimentosNomes;
    }

    public void setProcedimentosNomes(List<String> procedimentosNomes) {
        this.procedimentosNomes = procedimentosNomes;
    }

    public LocalDate getDataEncerramento() {
        return dataEncerramento;
    }

    public void setDataEncerramento(LocalDate dataEncerramento) {
        this.dataEncerramento = dataEncerramento;
    }

    public AmostraDTO() {
    }

    public AmostraDTO(Amostra amostra) {
        this.id = amostra.getId();
        this.nome = amostra.getNome();
        this.enderecoColeta = amostra.getEnderecoColeta();
        this.dataColeta = amostra.getDataColeta();
        this.coordenadaColeta = amostra.getCoordenadaColeta();
        this.prazoFinalizacao = amostra.getPrazoFinalizacao();
        this.status = amostra.getStatus().name();
        this.descricao = amostra.getDescricao();
        this.dataEncerramento = amostra.getDataEncerramento();
        

        if (amostra.getAnalise() != null) {
            this.analiseId = amostra.getAnalise().getId();
            this.analiseNome = amostra.getAnalise().getNome();
        }

        if (amostra.getAnalitos() != null) {
            this.analitos = amostra.getAnalitos().stream()
                    .map(a -> a.getId())
                    .collect(Collectors.toList());
        }
        if (amostra.getProcedimentos() != null) {
            this.procedimentosIds = amostra.getProcedimentos().stream()
                    .map(p -> p.getId())
                    .collect(Collectors.toList());

            this.procedimentosNomes = amostra.getProcedimentos().stream()
                    .map(p -> p.getNomeProcedimento())
                    .collect(Collectors.toList());
        }

    }

    public List<Long> getProcedimentosIds() {
        return procedimentosIds;
    }

    public void setProcedimentosIds(List<Long> procedimentosIds) {
        this.procedimentosIds = procedimentosIds;
    }

    public List<AnalitoSubtipoDTO> getAnalitosSelecionados() {
        return analitosSelecionados;
    }

    public void setAnalitosSelecionados(List<AnalitoSubtipoDTO> analitosSelecionados) {
        this.analitosSelecionados = analitosSelecionados;
    }

    public LocalDate getDataFinalizacaoReal() { return dataFinalizacaoReal; }
public void setDataFinalizacaoReal(LocalDate dataFinalizacaoReal) { this.dataFinalizacaoReal = dataFinalizacaoReal; }

}
