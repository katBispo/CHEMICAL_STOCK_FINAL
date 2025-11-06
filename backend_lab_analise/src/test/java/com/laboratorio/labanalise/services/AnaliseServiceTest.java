package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.DTO.AnaliseDTO;
import com.laboratorio.labanalise.DTO.projection.AnaliseProjection;
import com.laboratorio.labanalise.model.Analise;
import com.laboratorio.labanalise.model.Matriz;
import com.laboratorio.labanalise.model.Contrato;
import com.laboratorio.labanalise.model.enums.StatusAnalise;
import com.laboratorio.labanalise.repositories.AnaliseRepository;
import com.laboratorio.labanalise.repositories.MatrizRepository;
import com.laboratorio.labanalise.repositories.ContratoRepository;
import com.laboratorio.labanalise.repositories.AmostraRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AnaliseServiceTest {

    @Mock
    private AnaliseRepository analiseRepository;

    @Mock
    private MatrizRepository matrizRepository;

    @Mock
    private ContratoRepository contratoRepository;

    @Mock
    private AmostraRepository amostraRepository;

    @InjectMocks
    private AnaliseService analiseService;

    private Analise analise;
    private Matriz matriz;
    private Contrato contrato;

    @BeforeEach
    void setUp() {
        matriz = new Matriz();
        matriz.setId(1L);

        contrato = new Contrato();
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
    }

    @Test
    void shouldSaveAnalise() {
        // given
        when(analiseRepository.save(any(Analise.class))).thenReturn(analise);

        // when
        Analise savedAnalise = analiseService.salvar(analise);

        // then
        assertThat(savedAnalise).isNotNull();
        assertThat(savedAnalise.getId()).isEqualTo(1L);
        assertThat(savedAnalise.getNome()).isEqualTo("Análise de pH");
        verify(analiseRepository).save(any(Analise.class));
    }

    @Test
    void shouldFindAllAnalises() {
        // given
        AnaliseProjection projection = new AnaliseProjection() {
            @Override
            public Long getId() {
                return 1L;
            }

            @Override
            public String getNome() {
                return "Análise de pH";
            }

            @Override
            public LocalDate getDataCadastro() {
                return LocalDate.now();
            }

            @Override
            public LocalDate getDataInicio() {
                return LocalDate.now();
            }

            @Override
            public String getDescricaoGeral() {
                return "Descrição";
            }

            @Override
            public StatusAnalise getStatusAnalise() {
                return StatusAnalise.EM_ANDAMENTO;
            }

            @Override
            public Integer getQuantidadeAmostras() {
                return 5;
            }

            @Override
            public LocalDate getPrazoFinalizacao() {
                return LocalDate.now().plusDays(7);
            }

            @Override
            public Long getMatrizId() {
                return 1L;
            }

            @Override
            public String getNomeMatriz() {
                return "Água";
            }

            @Override
            public Long getContratoId() {
                return 1L;
            }

            @Override
            public String getNomeContrato() {
                return "CONT-001";
            }

            @Override
            public String getNomeCliente() {
                return "Cliente 1";
            }
        };

        when(analiseRepository.findAllProjected()).thenReturn(Arrays.asList(projection));

        // when
        List<AnaliseDTO> analises = analiseService.buscarTodos();

        // then
        assertThat(analises).hasSize(1);
        assertThat(analises.get(0).getNome()).isEqualTo("Análise de pH");
    }

    @Test
    void shouldFindAnaliseById() {
        // given
        when(analiseRepository.findById(1L)).thenReturn(Optional.of(analise));

        // when
        Analise found = analiseService.buscarPorId(1L);

        // then
        assertThat(found).isNotNull();
        assertThat(found.getNome()).isEqualTo("Análise de pH");
    }

    @Test
    void shouldRemoveAnalise() {
        // given
        doNothing().when(analiseRepository).deleteById(1L);

        // when
        analiseService.remover(1L);

        // then
        verify(analiseRepository).deleteById(1L);
    }
}
