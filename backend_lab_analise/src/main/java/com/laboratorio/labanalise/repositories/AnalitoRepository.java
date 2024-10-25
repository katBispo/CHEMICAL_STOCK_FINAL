package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.Analito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalitoRepository extends JpaRepository<Analito, Long> {

    @Query("SELECT DISTINCT a.classificacao FROM Analito a")
    List<String> findDistinctClassificacoes();

    @Query("SELECT DISTINCT a.tipoAnalito FROM Analito a") // Corrigido para usar 'tipoAnalito'
    List<String> findDistinctTipos();

    @Query("SELECT DISTINCT s FROM Analito a JOIN a.subtipoAnalito s") // Ajuste para subtipos
    List<String> findDistinctSubtipos();
}
