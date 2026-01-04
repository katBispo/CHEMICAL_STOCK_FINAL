package com.laboratorio.labanalise.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.model.ReagenteUsadoProcedimento;

public interface ReagenteUsadoProcedimentoRepository extends JpaRepository<ReagenteUsadoProcedimento, Long> {

        List<ReagenteUsadoProcedimento> findByProcedimento(Procedimento procedimento);

}
