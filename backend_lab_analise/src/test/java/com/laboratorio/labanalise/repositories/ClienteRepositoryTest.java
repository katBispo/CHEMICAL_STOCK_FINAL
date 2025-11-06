package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.Cliente;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import java.time.LocalDate;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class ClienteRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ClienteRepository clienteRepository;

    @Test
    public void shouldSaveCliente() {
        // given
        Cliente cliente = new Cliente();
        cliente.setNome("Empresa ABC");
        cliente.setCNPJ("12345678000199");
        cliente.setEmail("contato@empresa-abc.com");
        cliente.setTelefone("11999999999");

        // when
        Cliente savedCliente = clienteRepository.save(cliente);

        // then
        assertThat(savedCliente).isNotNull();
        assertThat(savedCliente.getId()).isNotNull();
        assertThat(savedCliente.getNome()).isEqualTo("Empresa ABC");
    }

    @Test
    public void shouldFindClienteById() {
        // given
        Cliente cliente = new Cliente();
        cliente.setNome("Empresa XYZ");
        cliente.setCNPJ("98765432000199");
        cliente.setEmail("contato@empresa-xyz.com");
        cliente.setTelefone("11988888888");
        entityManager.persist(cliente);
        entityManager.flush();

        // when
        Optional<Cliente> found = clienteRepository.findById(cliente.getId());

        // then
        assertThat(found).isPresent();
        assertThat(found.get().getNome()).isEqualTo("Empresa XYZ");
    }

    @Test
    public void shouldFindClienteByCnpj() {
        // given
        Cliente cliente = new Cliente();
        cliente.setNome("Empresa DEF");
        cliente.setCNPJ("11111111000199");
        cliente.setEmail("contato@empresa-def.com");
        cliente.setTelefone("11977777777");
        cliente.setDataCadastro(LocalDate.now());
        entityManager.persist(cliente);
        entityManager.flush();

        // when
        Cliente found = clienteRepository.buscarPorCNPJ("11111111000199");

        // then
        assertThat(found).isNotNull();
        assertThat(found.getCNPJ()).isEqualTo("11111111000199");
    }
}