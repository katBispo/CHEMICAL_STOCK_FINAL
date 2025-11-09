package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Cliente;
import com.laboratorio.labanalise.repositories.ClienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;

    private Cliente cliente;

    @BeforeEach
    void setUp() {
        cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNome("Empresa ABC");
        cliente.setEmail("contato@empresa-abc.com");
        cliente.setCNPJ("12345678000199");
        cliente.setTelefone("11999999999");
        cliente.setDataCadastro(LocalDate.now());
    }

    @Test
    void shouldSaveCliente() {
        // given
        when(clienteRepository.save(any(Cliente.class))).thenReturn(cliente);

        // when
        Cliente savedCliente = clienteService.salvar(cliente);

        // then
        assertThat(savedCliente).isNotNull();
        assertThat(savedCliente.getId()).isEqualTo(1L);
        assertThat(savedCliente.getNome()).isEqualTo("Empresa ABC");
        verify(clienteRepository).save(any(Cliente.class));
    }

    @Test
    void shouldFindClienteById() {
        // given
        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));

        // when
        Cliente found = clienteService.buscarPorId(1L);

        // then
        assertThat(found).isNotNull();
        assertThat(found.getNome()).isEqualTo("Empresa ABC");
    }

    @Test
    void shouldFindAllClientes() {
        // given
        when(clienteRepository.findAll()).thenReturn(List.of(cliente));

        // when
        List<Cliente> clientes = clienteService.buscarTodos();

        // then
        assertThat(clientes).hasSize(1);
        assertThat(clientes.get(0).getNome()).isEqualTo("Empresa ABC");
    }

    @Test
    void shouldDeleteCliente() {
        // given
        doNothing().when(clienteRepository).deleteById(1L);

        // when
        clienteService.remover(1L);

        // then
        verify(clienteRepository).deleteById(1L);
    }
}