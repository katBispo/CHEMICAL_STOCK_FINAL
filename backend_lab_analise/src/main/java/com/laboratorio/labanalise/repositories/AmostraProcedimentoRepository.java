package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.AmostraProcedimento;
import com.laboratorio.labanalise.model.pk.AmostraProcedimentoPK;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AmostraProcedimentoRepository extends JpaRepository<AmostraProcedimento, AmostraProcedimentoPK> {
}
