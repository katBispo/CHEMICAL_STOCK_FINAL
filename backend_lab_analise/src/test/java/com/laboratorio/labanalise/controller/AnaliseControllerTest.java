package com.laboratorio.labanalise.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.laboratorio.labanalise.DTO.AnaliseDTO;
import com.laboratorio.labanalise.model.Analise;
import com.laboratorio.labanalise.model.Matriz;
import com.laboratorio.labanalise.model.Contrato;
import com.laboratorio.labanalise.model.enums.StatusAnalise;
import com.laboratorio.labanalise.services.AnaliseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AnaliseController.class)
public class AnaliseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AnaliseService analiseService;

    @Autowired
    private ObjectMapper objectMapper;

    private Analise analise;
    private AnaliseDTO analiseDTO;

    @BeforeEach
    void setUp() {
        Matriz matriz = new Matriz();
        matriz.setId(1L);

        Contrato contrato = new Contrato();
        contrato.setId(1L);

        analise = new Analise();
        analise.setId(1L);
        analise.setNome("Análise de pH");
        analise.setDescricaoGeral("Análise de pH em amostras de água");
        analise.setDataInicio(LocalDate.now());
        analise.setPrazoFinalizacao(LocalDate.now().plusDays(7));
        analise.setStatusAnalise(StatusAnalise.EM_ANDAMENTO);
        analise.setQuantidadeAmostras(5);
        analise.setMatriz(matriz);
        analise.setContrato(contrato);

        analiseDTO = new AnaliseDTO();
        analiseDTO.setId(1L);
        analiseDTO.setNome("Análise de pH");
        analiseDTO.setDescricaoGeral("Análise de pH em amostras de água");
        analiseDTO.setDataInicio(LocalDate.now());
        analiseDTO.setPrazoFinalizacao(LocalDate.now().plusDays(7));
        analiseDTO.setStatusAnalise(StatusAnalise.EM_ANDAMENTO);
        analiseDTO.setQuantidadeAmostras(5);
    }

    @Test
    public void shouldCreateAnalise() throws Exception {
        given(analiseService.salvar(any(Analise.class))).willReturn(analise);

        mockMvc.perform(post("/api/analises")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(analiseDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value(analise.getNome()));
    }

    @Test
    public void shouldGetAnaliseById() throws Exception {
        given(analiseService.buscarPorId(1L)).willReturn(analise);

        mockMvc.perform(get("/api/analises/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value(analise.getNome()));
    }

    @Test
    public void shouldGetAllAnalises() throws Exception {
        given(analiseService.buscarTodos()).willReturn(Arrays.asList(analiseDTO));

        mockMvc.perform(get("/api/analises")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value(analiseDTO.getNome()));
    }

    @Test
    public void shouldDeleteAnalise() throws Exception {
        mockMvc.perform(delete("/api/analises/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(analiseService).remover(1L);
    }
}