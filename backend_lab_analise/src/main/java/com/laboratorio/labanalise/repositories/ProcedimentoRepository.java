package com.laboratorio.labanalise.repositories;
import java.util.List;

import com.laboratorio.labanalise.model.Procedimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcedimentoRepository extends JpaRepository<Procedimento, Long> {
    Procedimento findByNomeProcedimento(String nomeProcedimento);

    List<Procedimento> findAllById(Iterable<Long> ids);

}
