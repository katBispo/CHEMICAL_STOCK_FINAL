package com.laboratorio.labanalise.DTO;

public class ProcedimentoSelectDTO {

    private Long id;
    private String nomeProcedimento;

    public ProcedimentoSelectDTO() {}

    public ProcedimentoSelectDTO(Long id, String nomeProcedimento) {
        this.id = id;
        this.nomeProcedimento = nomeProcedimento;
    }

    public Long getId() {
        return id;
    }

    public String getNomeProcedimento() {
        return nomeProcedimento;
    }
}
