package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.Analito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalitoRepository extends JpaRepository<Analito, Long> {

    // Busca todas as classificações distintas dos analitos
    @Query("SELECT DISTINCT a.classificacao FROM Analito a")
    List<String> findDistinctClassificacoes();

    // Busca todos os tipos distintos de analitos
    @Query("SELECT DISTINCT a.tipoAnalito FROM Analito a")
    List<String> findDistinctTipos();

    // Busca todos os subtipos distintos de analitos
    @Query("SELECT DISTINCT s FROM Analito a JOIN a.subtipoAnalito s")
    List<String> findDistinctSubtipos();

    // Busca um analito específico pela classificação (necessário para a função de
    // adição)
    Analito findByClassificacao(String classificacao);

    @Query("SELECT a.id FROM Analito a WHERE a.classificacao = :classificacao")
    Long findIdByClassificacao(@Param("classificacao") String classificacao);


    
}
