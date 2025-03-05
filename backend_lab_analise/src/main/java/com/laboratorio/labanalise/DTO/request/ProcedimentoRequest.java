package com.laboratorio.labanalise.DTO.request;

import com.laboratorio.labanalise.model.Procedimento;

import java.util.List;

public class ProcedimentoRequest {
    private Procedimento procedimento;
    private List<ReagenteQuantidadeRequest> reagentesQuantidades;

    public Procedimento getProcedimento() {
        return procedimento;
    }

    public List<ReagenteQuantidadeRequest> getReagentesQuantidades() {
        return reagentesQuantidades;
    }
    public void ProcedimentoRequest(Procedimento procedimento, ReagenteQuantidadeRequest reagenteQuantidadeRequest) {
        this.procedimento = procedimento;
        this.reagentesQuantidades = reagentesQuantidades;
    }

}
