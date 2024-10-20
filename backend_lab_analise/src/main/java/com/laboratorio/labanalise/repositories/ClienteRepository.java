package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    @Query("SELECT c FROM Cliente c WHERE c.CNPJ = :CNPJ")
    Cliente buscarPorCNPJ(@Param("CNPJ") String CNPJ);

}
