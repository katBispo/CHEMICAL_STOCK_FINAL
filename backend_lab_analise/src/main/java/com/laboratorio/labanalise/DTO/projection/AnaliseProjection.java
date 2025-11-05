package com.laboratorio.labanalise.DTO.projection;
import java.time.LocalDate;

import com.laboratorio.labanalise.model.enums.StatusAnalise;

public interface AnaliseProjection {
    Long getId();
    String getNome();
    LocalDate getDataCadastro();
    LocalDate getDataInicio();
    String getDescricaoGeral();
    StatusAnalise getStatusAnalise(); 
    Integer getQuantidadeAmostras();
    LocalDate getPrazoFinalizacao();

    // Matriz
    Long getMatrizId();
    String getNomeMatriz();

    // Contrato
    Long getContratoId();
    String getNomeContrato();
    String getNomeCliente();
}