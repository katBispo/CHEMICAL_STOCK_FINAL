package com.laboratorio.labanalise.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.laboratorio.labanalise.model.Cliente;
import com.laboratorio.labanalise.services.ClienteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;

import java.time.LocalDate;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ClienteController.class)
@AutoConfigureSecurityContext
public class ClienteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClienteService clienteService;

    @Autowired
    private ObjectMapper objectMapper;

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
    @WithMockUser
    public void shouldCreateCliente() throws Exception {
        given(clienteService.salvar(any(Cliente.class))).willReturn(cliente);

        mockMvc.perform(post("/api/clientes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(cliente)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value(cliente.getNome()))
                .andExpect(jsonPath("$.email").value(cliente.getEmail()))
                .andExpect(jsonPath("$.CNPJ").value(cliente.getCNPJ()));
    }

    @Test
    public void shouldGetClienteById() throws Exception {
        given(clienteService.buscarPorId(1L)).willReturn(cliente);

        mockMvc.perform(get("/api/clientes/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value(cliente.getNome()))
                .andExpect(jsonPath("$.CNPJ").value(cliente.getCNPJ()));
    }

    @Test
    public void shouldGetAllClientes() throws Exception {
        given(clienteService.buscarTodos()).willReturn(Arrays.asList(cliente));

        mockMvc.perform(get("/api/clientes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value(cliente.getNome()))
                .andExpect(jsonPath("$[0].CNPJ").value(cliente.getCNPJ()));
    }

    @Test
    public void shouldDeleteCliente() throws Exception {
        mockMvc.perform(delete("/api/clientes/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(clienteService).remover(1L);
    }
}