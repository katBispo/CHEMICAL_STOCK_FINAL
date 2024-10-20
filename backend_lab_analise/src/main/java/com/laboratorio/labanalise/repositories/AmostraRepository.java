package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.Amostra;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AmostraRepository extends JpaRepository<Amostra, Long> {
}
