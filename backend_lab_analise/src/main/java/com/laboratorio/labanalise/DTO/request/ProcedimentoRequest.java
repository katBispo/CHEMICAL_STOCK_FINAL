package com.laboratorio.labanalise.DTO.request;
import java.util.List;

import com.laboratorio.labanalise.model.Procedimento;

public class ProcedimentoRequest {

    private Procedimento procedimento;
    private List<ReagenteQuantidadeRequest> reagentesQuantidades;

    public Procedimento getProcedimento() {
        return procedimento;
    }

    public void setProcedimento(Procedimento procedimento) {
        this.procedimento = procedimento;
    }

    public List<ReagenteQuantidadeRequest> getReagentesQuantidades() {
        return reagentesQuantidades;
    }

    public void setReagentesQuantidades(
            List<ReagenteQuantidadeRequest> reagentesQuantidades) {
        this.reagentesQuantidades = reagentesQuantidades;
    }
}
