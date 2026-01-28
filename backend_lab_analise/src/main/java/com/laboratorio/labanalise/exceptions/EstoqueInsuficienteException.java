package com.laboratorio.labanalise.exceptions;

import java.util.List;

import com.laboratorio.labanalise.DTO.FaltaReagenteDetalheDTO;

public class EstoqueInsuficienteException extends RuntimeException {

    private final List<FaltaReagenteDetalheDTO> faltas;

    public EstoqueInsuficienteException(List<FaltaReagenteDetalheDTO> faltas) {
        super("Existem reagentes sem estoque suficiente");
        this.faltas = faltas;
    }

    public List<FaltaReagenteDetalheDTO> getFaltas() {
        return faltas;
    }
}

