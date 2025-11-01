package com.laboratorio.labanalise.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.laboratorio.labanalise.DTO.projection.EquipamentoEstatisticasProjection;
import com.laboratorio.labanalise.model.Equipamento;
import java.util.List;


@Repository
public interface EquipamentoRepository extends JpaRepository<Equipamento, Long> {
    // Métodos customizados podem ser adi
    // 1️⃣ Contagem de equipamentos por status
    @Query("""
        SELECT e.status AS nome, COUNT(e) AS quantidade
        FROM Equipamento e
        GROUP BY e.status
    """)
    List<EquipamentoEstatisticasProjection> contarPorStatus();

    // 2️⃣ Distribuição de equipamentos por procedimento
    @Query("""
        SELECT p.nome AS nome, COUNT(e) AS quantidade
        FROM Procedimento p
        JOIN p.equipamentos e
        GROUP BY p.nome
    """)
    List<EquipamentoEstatisticasProjection> distribuicaoPorProcedimento();

    // 3️⃣ Quantidade de usos (quantas amostras utilizaram cada equipamento)
    @Query("""
        SELECT e.nome AS nome, COUNT(a.id) AS quantidade
        FROM Amostra a
        JOIN a.procedimento p
        JOIN p.equipamentos e
        GROUP BY e.nome
        ORDER BY COUNT(a.id) DESC
    """)
    List<EquipamentoEstatisticasProjection> contagemDeUso();

    // 4️⃣ Top 5 equipamentos mais usados
    @Query("""
        SELECT e.nome AS nome, COUNT(a.id) AS quantidade
        FROM Amostra a
        JOIN a.procedimento p
        JOIN p.equipamentos e
        GROUP BY e.nome
        ORDER BY COUNT(a.id) DESC
    """)
    List<EquipamentoEstatisticasProjection> top5MaisUsados();
}
