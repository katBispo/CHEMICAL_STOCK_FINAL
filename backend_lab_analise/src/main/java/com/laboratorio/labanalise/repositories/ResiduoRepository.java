package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.Residuo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResiduoRepository extends JpaRepository<Residuo, Long> {

    Residuo findByNome(String nome);
}
