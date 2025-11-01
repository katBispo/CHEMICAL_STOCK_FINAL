package com.laboratorio.labanalise.repositories;
import java.util.List;
import com.laboratorio.labanalise.DTO.projection.ProcedimentoMaisUsadoDTO;
import com.laboratorio.labanalise.model.Procedimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProcedimentoRepository extends JpaRepository<Procedimento, Long> {
    Procedimento findByNomeProcedimento(String nomeProcedimento);

    List<Procedimento> findAllById(Iterable<Long> ids);

   @Query(value = """
    SELECT p.nome_procedimento AS nome, COUNT(*) AS quantidade
    FROM procedimento p
    JOIN amostra_procedimento ap ON ap.procedimento_id = p.id
    GROUP BY p.nome_procedimento
    ORDER BY quantidade DESC
    LIMIT 5
""", nativeQuery = true)
List<ProcedimentoMaisUsadoDTO> findTop5ProcedimentosMaisUsados();


@Query(value = """
    SELECT p.nome_procedimento AS nome, COUNT(ap.procedimento_id) AS quantidade
    FROM procedimento p
    LEFT JOIN amostra_procedimento ap ON ap.procedimento_id = p.id
    GROUP BY p.nome_procedimento
    ORDER BY quantidade DESC
""", nativeQuery = true)
List<ProcedimentoMaisUsadoDTO> buscarUsoTotalProcedimentos();


}