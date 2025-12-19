package com.laboratorio.labanalise.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.laboratorio.labanalise.model.*;
import java.util.List;


@Repository
public interface MovimentacaoReagenteRepository extends JpaRepository<MovimentacaoReagente, Long> {

    @Query("SELECT mr FROM MovimentacaoReagente mr WHERE mr.reagente.id = :id")
    MovimentacaoReagente obterMovimentacaoPorIdDoReagente(@Param("id") Long id);

      List<MovimentacaoReagente>
        findByReagenteIdOrderByDataMovimentacaoDesc(Long reagenteId);
}

