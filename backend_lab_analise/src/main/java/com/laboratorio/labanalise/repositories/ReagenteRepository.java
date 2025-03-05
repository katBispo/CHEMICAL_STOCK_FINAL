package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.Reagente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReagenteRepository extends JpaRepository<Reagente, Long> {

    @Query("SELECT r FROM Reagente r WHERE r.dataValidade < CURRENT_DATE")
    List<Reagente> reagentesVencidos();

}
