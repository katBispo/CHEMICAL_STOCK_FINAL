package com.laboratorio.labanalise.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.laboratorio.labanalise.model.Analito;
public interface AnalitoRepository extends JpaRepository<Analito, Long> {
}
