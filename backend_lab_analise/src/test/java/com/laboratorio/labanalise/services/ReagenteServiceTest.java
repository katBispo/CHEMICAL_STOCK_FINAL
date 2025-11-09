package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.model.enums.UnidadeReagente;
import com.laboratorio.labanalise.repositories.ReagenteRepository;
import com.laboratorio.labanalise.mapper.ReagenteMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReagenteServiceTest {

    @Mock
    private ReagenteRepository repository;

    @Mock
    private MovimentacaoReagenteService movimentacaoReagenteService;

    @Mock
    private ReagenteMapper reagenteMapper;

    @InjectMocks
    private ReagenteService reagenteService;

    private Reagente reagente;

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
    }

    @Test
    void shouldSaveReagente() {
        // given
        when(repository.save(any(Reagente.class))).thenReturn(reagente);
        doNothing().when(movimentacaoReagenteService).registrarMovimentacaoInicial(any(Reagente.class));

        // when
        Reagente savedReagente = reagenteService.salvar(reagente);

        // then
        assertThat(savedReagente).isNotNull();
        assertThat(savedReagente.getId()).isEqualTo(1L);
        assertThat(savedReagente.getNome()).isEqualTo("Ácido Clorídrico");
        verify(repository).save(any(Reagente.class));
        verify(movimentacaoReagenteService).registrarMovimentacaoInicial(any(Reagente.class));
    }

    @Test
    void shouldUpdateReagente() {
        // given
        Reagente updatedReagente = new Reagente();
        updatedReagente.setNome("Ácido Clorídrico Atualizado");
        updatedReagente.setMarca("Merck");
        updatedReagente.setLote("123456-Updated");

        when(repository.findById(1L)).thenReturn(Optional.of(reagente));
        when(repository.save(any(Reagente.class))).thenReturn(updatedReagente);

        // when
        Reagente result = reagenteService.atualizarReagente(1L, updatedReagente);

        // then
        assertThat(result).isNotNull();
        assertThat(result.getNome()).isEqualTo("Ácido Clorídrico Atualizado");
        verify(repository).save(any(Reagente.class));
        verify(movimentacaoReagenteService).registarMovimentacaoDeEntrada(any(Reagente.class), any(Reagente.class));
    }
}