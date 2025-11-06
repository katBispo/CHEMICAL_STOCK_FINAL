package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.Analise;
import com.laboratorio.labanalise.model.Matriz;
import com.laboratorio.labanalise.model.Contrato;
import com.laboratorio.labanalise.model.enums.StatusAnalise;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class AnaliseRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private AnaliseRepository analiseRepository;

    @Test
    public void shouldSaveAnalise() {
        // given
        Matriz matriz = new Matriz();
        entityManager.persist(matriz);

        Contrato contrato = new Contrato();
        entityManager.persist(contrato);

        Analise analise = new Analise();
        analise.setNome("Análise de pH");
        analise.setDescricaoGeral("Análise de pH em amostras de água");
        analise.setDataInicio(LocalDate.now());
        analise.setPrazoFinalizacao(LocalDate.now().plusDays(7));
        analise.setStatusAnalise(StatusAnalise.EM_ANDAMENTO);
        analise.setQuantidadeAmostras(5);
        analise.setMatriz(matriz);
        analise.setContrato(contrato);

        // when
        Analise savedAnalise = analiseRepository.save(analise);

        // then
        assertThat(savedAnalise).isNotNull();
        assertThat(savedAnalise.getId()).isNotNull();
        assertThat(savedAnalise.getNome()).isEqualTo("Análise de pH");
        assertThat(savedAnalise.getStatusAnalise()).isEqualTo(StatusAnalise.EM_ANDAMENTO);
    }

    @Test
    public void shouldFindAnaliseById() {
        // given
        Matriz matriz = new Matriz();
        entityManager.persist(matriz);

        Contrato contrato = new Contrato();
        entityManager.persist(contrato);

        Analise analise = new Analise();
        analise.setNome("Análise de Condutividade");
        analise.setDescricaoGeral("Análise de condutividade em amostras");
        analise.setDataInicio(LocalDate.now());
        analise.setPrazoFinalizacao(LocalDate.now().plusDays(7));
        analise.setStatusAnalise(StatusAnalise.EM_ANDAMENTO);
        analise.setQuantidadeAmostras(3);
        analise.setMatriz(matriz);
        analise.setContrato(contrato);
        entityManager.persist(analise);
        entityManager.flush();

        // when
        Optional<Analise> found = analiseRepository.findById(analise.getId());

        // then
        assertThat(found).isPresent();
        assertThat(found.get().getNome()).isEqualTo("Análise de Condutividade");
        assertThat(found.get().getDescricaoGeral()).isEqualTo("Análise de condutividade em amostras");
    }
}