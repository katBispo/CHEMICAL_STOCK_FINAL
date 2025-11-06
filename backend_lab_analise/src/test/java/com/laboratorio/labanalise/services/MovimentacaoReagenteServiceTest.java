package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.MovimentacaoReagente;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoMovimentacao;
import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.model.enums.UnidadeReagente;
import com.laboratorio.labanalise.repositories.MovimentacaoReagenteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class MovimentacaoReagenteServiceTest {

    @Mock
    private MovimentacaoReagenteRepository repository;

    @InjectMocks
    private MovimentacaoReagenteService movimentacaoReagenteService;

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
    void shouldRegisterInitialMovimentacao() {
        // given
        when(repository.save(any(MovimentacaoReagente.class))).thenAnswer(i -> i.getArguments()[0]);
        ArgumentCaptor<MovimentacaoReagente> movimentacaoCaptor = ArgumentCaptor.forClass(MovimentacaoReagente.class);

        // when
        movimentacaoReagenteService.registrarMovimentacaoInicial(reagente);

        // then
        verify(repository).save(movimentacaoCaptor.capture());
        MovimentacaoReagente savedMovimentacao = movimentacaoCaptor.getValue();
        
        assertThat(savedMovimentacao.getReagente()).isEqualTo(reagente);
        assertThat(savedMovimentacao.getTipoMovimentacao()).isEqualTo(TipoMovimentacao.ENTRADA);
    }

    @Test
    void shouldRegisterEntradaMovimentacao() {
        // given
        Reagente reagenteNovo = new Reagente();
        reagenteNovo.setQuantidadeTotal(2000.0);
        reagenteNovo.setId(1L);
        reagenteNovo.setNome("Ácido Clorídrico");
        reagenteNovo.setMarca("Merck");
        reagenteNovo.setLote("123456");
        reagenteNovo.setControlado(false);
        reagenteNovo.setDataValidade(LocalDate.now().plusYears(1));
        reagenteNovo.setTipo(TipoReagente.ÁCIDO);
        reagenteNovo.setUnidadeReagente(UnidadeReagente.ml);
        
        when(repository.save(any(MovimentacaoReagente.class))).thenAnswer(i -> i.getArguments()[0]);
        ArgumentCaptor<MovimentacaoReagente> movimentacaoCaptor = ArgumentCaptor.forClass(MovimentacaoReagente.class);

        // when
        movimentacaoReagenteService.registarMovimentacaoDeEntrada(reagente, reagenteNovo);

        // then
        verify(repository).save(movimentacaoCaptor.capture());
        MovimentacaoReagente savedMovimentacao = movimentacaoCaptor.getValue();
        
        assertThat(savedMovimentacao.getReagente()).isEqualTo(reagente);
        assertThat(savedMovimentacao.getTipoMovimentacao()).isEqualTo(TipoMovimentacao.ENTRADA);
        assertThat(savedMovimentacao.getQuantidadeFinal()).isEqualTo(2000.0);
    }
}