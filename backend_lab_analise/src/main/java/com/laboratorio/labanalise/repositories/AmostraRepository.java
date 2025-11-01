package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.Amostra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.laboratorio.labanalise.DTO.projection.StatusAmostraCountProjection;
import java.util.List;
public interface AmostraRepository extends JpaRepository<Amostra, Long> {
        int countByAnaliseId(Long analiseId);

        @Query("SELECT a.status AS status, COUNT(a) AS count FROM Amostra a GROUP BY a.status")
        List<StatusAmostraCountProjection> countAmostrasByStatus();

}
