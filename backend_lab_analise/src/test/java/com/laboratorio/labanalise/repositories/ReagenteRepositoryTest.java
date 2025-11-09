package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.model.enums.UnidadeReagente;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.context.annotation.Import;
import com.laboratorio.labanalise.config.TestConfig;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(TestConfig.class)
@TestPropertySource(properties = {
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE",
    "spring.datasource.driverClassName=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password=password",
    "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect"
})
public class ReagenteRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ReagenteRepository reagenteRepository;

    @Test
    public void shouldSaveReagente() {
        // given
        Reagente reagente = new Reagente();
        reagente.setNome("Ácido Sulfúrico");
        reagente.setMarca("Merck");
        reagente.setLote("123456");
        reagente.setControlado(false);
        reagente.setDataValidade(LocalDate.now().plusYears(1));
        reagente.setUnidadeReagente(UnidadeReagente.ml);
        reagente.setQuantidadeDeFrascos(5);
        reagente.setQuantidadePorFrasco(1000.0);
        reagente.setTipo(TipoReagente.ÁCIDO);

        // when
        Reagente savedReagente = reagenteRepository.save(reagente);

        // then
        assertThat(savedReagente).isNotNull();
        assertThat(savedReagente.getId()).isNotNull();
        assertThat(savedReagente.getNome()).isEqualTo("Ácido Sulfúrico");
    }

    @Test
    public void shouldFindReagenteById() {
        // given
        Reagente reagente = new Reagente();
        reagente.setNome("Hidróxido de Sódio");
        reagente.setMarca("Merck");
        reagente.setLote("789012");
        reagente.setControlado(false);
        reagente.setUnidadeReagente(UnidadeReagente.g);
        reagente.setQuantidadeDeFrascos(2);
        reagente.setQuantidadePorFrasco(500.0);
        reagente.setDataValidade(LocalDate.now().plusYears(1));
        reagente.setTipo(TipoReagente.BASE);
        entityManager.persist(reagente);
        entityManager.flush();

        // when
        Optional<Reagente> found = reagenteRepository.findById(reagente.getId());

        // then
        assertThat(found).isPresent();
        assertThat(found.get().getNome()).isEqualTo(reagente.getNome());
    }

    @Test
    public void shouldFindExpiredReagentes() {
        // given
        Reagente expiredReagente = new Reagente();
        expiredReagente.setNome("Reagente Vencido");
        expiredReagente.setMarca("Marca Test");
        expiredReagente.setLote("V123");
        expiredReagente.setControlado(false);
        expiredReagente.setUnidadeReagente(UnidadeReagente.ml);
        expiredReagente.setQuantidadeDeFrascos(1);
        expiredReagente.setQuantidadePorFrasco(100.0);
        expiredReagente.setDataValidade(LocalDate.now().minusDays(1));
        expiredReagente.setTipo(TipoReagente.OUTRO);
        entityManager.persist(expiredReagente);

        Reagente validReagente = new Reagente();
        validReagente.setNome("Reagente Válido");
        validReagente.setMarca("Marca Test");
        validReagente.setLote("V456");
        validReagente.setControlado(false);
        validReagente.setUnidadeReagente(UnidadeReagente.ml);
        validReagente.setQuantidadeDeFrascos(1);
        validReagente.setQuantidadePorFrasco(100.0);
        validReagente.setDataValidade(LocalDate.now().plusYears(1));
        validReagente.setTipo(TipoReagente.OUTRO);
        entityManager.persist(validReagente);
        
        entityManager.flush();

        // when
        List<Reagente> expiredReagentes = reagenteRepository.reagentesVencidos();

        // then
        assertThat(expiredReagentes).hasSize(1);
        assertThat(expiredReagentes.get(0).getNome()).isEqualTo("Reagente Vencido");
    }

    @Test
    public void shouldCountTotalFrascos() {
        // given
        Reagente reagente1 = new Reagente();
        reagente1.setNome("Reagente 1");
        reagente1.setMarca("Marca Test");
        reagente1.setLote("F123");
        reagente1.setControlado(false);
        reagente1.setUnidadeReagente(UnidadeReagente.ml);
        reagente1.setQuantidadeDeFrascos(3);
        reagente1.setQuantidadePorFrasco(100.0);
        reagente1.setDataValidade(LocalDate.now().plusYears(1));
        reagente1.setTipo(TipoReagente.INDICADOR);
        entityManager.persist(reagente1);

        Reagente reagente2 = new Reagente();
        reagente2.setNome("Reagente 2");
        reagente2.setMarca("Marca Test");
        reagente2.setLote("F456");
        reagente2.setControlado(false);
        reagente2.setUnidadeReagente(UnidadeReagente.ml);
        reagente2.setQuantidadeDeFrascos(2);
        reagente2.setQuantidadePorFrasco(100.0);
        reagente2.setDataValidade(LocalDate.now().plusYears(1));
        reagente2.setTipo(TipoReagente.INDICADOR);
        entityManager.persist(reagente2);
        
        entityManager.flush();

        // when
        Integer totalFrascos = reagenteRepository.somarTodosOsFrascos();

        // then
        assertThat(totalFrascos).isEqualTo(5); // 3 + 2 frascos
    }

    @Test
    public void shouldFindReagentesExpiringIn15Days() {
        // given
        LocalDate today = LocalDate.now();
        LocalDate inTenDays = today.plusDays(10);
        
        Reagente expiringReagente = new Reagente();
        expiringReagente.setNome("Reagente a Vencer");
        expiringReagente.setMarca("Marca Test");
        expiringReagente.setLote("E123");
        expiringReagente.setControlado(false);
        expiringReagente.setUnidadeReagente(UnidadeReagente.ml);
        expiringReagente.setQuantidadeDeFrascos(1);
        expiringReagente.setQuantidadePorFrasco(100.0);
        expiringReagente.setDataValidade(inTenDays);
        expiringReagente.setTipo(TipoReagente.SAL);
        entityManager.persist(expiringReagente);

        Reagente validReagente = new Reagente();
        validReagente.setNome("Reagente Válido");
        validReagente.setMarca("Marca Test");
        validReagente.setLote("E456");
        validReagente.setControlado(false);
        validReagente.setUnidadeReagente(UnidadeReagente.ml);
        validReagente.setQuantidadeDeFrascos(1);
        validReagente.setQuantidadePorFrasco(100.0);
        validReagente.setDataValidade(today.plusYears(1));
        validReagente.setTipo(TipoReagente.SAL);
        entityManager.persist(validReagente);
        
        entityManager.flush();

        // when
        List<Reagente> expiringReagentes = reagenteRepository.proximosAVencer15Dias(today, today.plusDays(15));

        // then
        assertThat(expiringReagentes).hasSize(1);
        assertThat(expiringReagentes.get(0).getNome()).isEqualTo("Reagente a Vencer");
    }
}