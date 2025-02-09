package com.laboratorio.labanalise.repositories;
import com.laboratorio.labanalise.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.laboratorio.labanalise.model.*;

@Repository
public interface MovimentacaoReagenteRepository extends JpaRepository<MovimentacaoReagente, Long> {
}