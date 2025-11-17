package com.laboratorio.labanalise.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laboratorio.labanalise.model.LogAcao;

@Repository
public interface LogAcaoRepository extends JpaRepository<LogAcao, Long> {
}
