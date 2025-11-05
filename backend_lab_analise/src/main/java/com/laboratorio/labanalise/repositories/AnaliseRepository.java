package com.laboratorio.labanalise.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.laboratorio.labanalise.DTO.projection.AnaliseProjection;
import com.laboratorio.labanalise.model.Analise;


public interface AnaliseRepository extends JpaRepository<Analise, Long> {

     @Query("SELECT a.id AS id, a.nome AS nome, a.dataCadastro AS dataCadastro, a.dataInicio AS dataInicio, " +
           "a.descricaoGeral AS descricaoGeral, a.statusAnalise AS statusAnalise, a.quantidadeAmostras AS quantidadeAmostras, " +
           "a.prazoFinalizacao AS prazoFinalizacao, " +
           "m.id AS matrizId, m.nomeMatriz AS nomeMatriz, " +
           "c.id AS contratoId, c.nomeContrato AS nomeContrato, cl.nome AS nomeCliente " +
           "FROM Analise a " +
           "LEFT JOIN a.matriz m " +
           "LEFT JOIN a.contrato c " +
           "LEFT JOIN c.cliente cl")
    List<AnaliseProjection> findAllProjected();


}
