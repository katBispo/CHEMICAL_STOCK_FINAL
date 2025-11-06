package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.DTO.ReagenteDTO;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.services.ReagenteService;
import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.model.enums.UnidadeReagente;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ReagenteController.class)
public class ReagenteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReagenteService reagenteService;

    @Autowired
    private ObjectMapper objectMapper;

    private Reagente reagente;
    private ReagenteDTO reagenteDTO;

    @BeforeEach
    void setUp() {
        reagente = new Reagente();
        reagente.setId(1L);
        reagente.setNome("Ácido Clorídrico");
        reagente.setMarca("Merck");
        reagente.setLote("123456");
        reagente.setControlado(false);
        reagente.setDataValidade(LocalDate.now().plusYears(1));
        reagente.setTipo(TipoReagente.ÁCIDO);
        reagente.setUnidadeReagente(UnidadeReagente.ml);
        
        reagenteDTO = new ReagenteDTO();
        reagenteDTO.setNome("Ácido Clorídrico");
        reagenteDTO.setMarca("Merck");
        reagenteDTO.setLote("123456");
        reagenteDTO.setControlado(false);
        reagenteDTO.setDataValidade(LocalDate.now().plusYears(1));
        reagenteDTO.setTipo(TipoReagente.ÁCIDO);
        reagenteDTO.setUnidadeReagente(UnidadeReagente.ml);
        reagenteDTO.setQuantidadeDeFrascos(1);
        reagenteDTO.setQuantidadePorFrasco(1000.0);
    }

    @Test
    public void shouldCreateReagente() throws Exception {
        when(reagenteService.salvar(any(Reagente.class))).thenReturn(reagente);

        mockMvc.perform(post("/api/reagentes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(reagenteDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value(reagente.getNome()));
    }

    @Test
    public void shouldGetReagenteById() throws Exception {
        given(reagenteService.repository.findById(1L)).willReturn(Optional.of(reagente));

        mockMvc.perform(get("/api/reagentes/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value(reagente.getNome()));
    }

    @Test
    public void shouldGetAllReagentes() throws Exception {
        given(reagenteService.repository.findAll()).willReturn(Arrays.asList(reagente));

        mockMvc.perform(get("/api/reagentes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value(reagente.getNome()));
    }

    @Test
    public void shouldUpdateReagente() throws Exception {
        given(reagenteService.repository.findById(1L)).willReturn(Optional.of(reagente));
        when(reagenteService.atualizarReagente(eq(1L), any(Reagente.class))).thenReturn(reagente);

        mockMvc.perform(put("/api/reagentes/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(reagenteDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value(reagente.getNome()));
    }

    @Test
    public void shouldDeleteReagente() throws Exception {
        given(reagenteService.repository.findById(1L)).willReturn(Optional.of(reagente));

        mockMvc.perform(delete("/api/reagentes/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}