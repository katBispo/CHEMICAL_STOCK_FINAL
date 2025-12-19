package com.laboratorio.labanalise.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.DTO.MovimentacaoReagenteResponseDTO;
import com.laboratorio.labanalise.model.MovimentacaoReagente;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoMovimentacao;
import com.laboratorio.labanalise.repositories.MovimentacaoReagenteRepository;

@Service
public class MovimentacaoReagenteService {

    private final MovimentacaoReagenteRepository repository;

    public MovimentacaoReagenteService(MovimentacaoReagenteRepository repository) {
        this.repository = repository;
    }

    /* ===============================
       CRUD BÁSICO
    =============================== */

    public MovimentacaoReagente salvar(MovimentacaoReagente movimentacao) {
        return repository.save(movimentacao);
    }

    public List<MovimentacaoReagente> listarTodas() {
        return repository.findAll();
    }

    public List<MovimentacaoReagente> listarPorReagente(Long reagenteId) {
        return repository.findByReagenteIdOrderByDataMovimentacaoDesc(reagenteId);
    }

    public List<MovimentacaoReagenteResponseDTO> listarDTO() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    /* ===============================
       REGISTROS DE MOVIMENTAÇÃO
    =============================== */

    public void registrarMovimentacaoInicial(Reagente reagente) {

        MovimentacaoReagente mov = new MovimentacaoReagente();
        mov.setTipoMovimentacao(TipoMovimentacao.ENTRADA);
        mov.setReagente(reagente);
        mov.setDataMovimentacao(LocalDate.now());
        mov.setQuantidadeAlterada(reagente.getQuantidadeTotal());
        mov.setQuantidadeFinal(reagente.getQuantidadeTotal());
        mov.setMotivo("Cadastro inicial do reagente");

        repository.save(mov);
    }

    public void registrarMovimentacaoDeEntrada(Reagente reagente, Double quantidade) {

        MovimentacaoReagente mov = new MovimentacaoReagente();
        mov.setTipoMovimentacao(TipoMovimentacao.ENTRADA);
        mov.setReagente(reagente);
        mov.setDataMovimentacao(LocalDate.now());
        mov.setQuantidadeAlterada(quantidade);
        mov.setQuantidadeFinal(reagente.getQuantidadeTotal());
        mov.setMotivo("Entrada de reagente");

        repository.save(mov);
    }

    public void registrarMovimentacaoDeSaida(Reagente reagente, Double quantidade) {

        MovimentacaoReagente mov = new MovimentacaoReagente();
        mov.setTipoMovimentacao(TipoMovimentacao.SAIDA);
        mov.setReagente(reagente);
        mov.setDataMovimentacao(LocalDate.now());
        mov.setQuantidadeAlterada(quantidade);
        mov.setQuantidadeFinal(reagente.getQuantidadeTotal());
        mov.setMotivo("Saída por uso em procedimento");

        repository.save(mov);
    }

    /* ===============================
       DTO
    =============================== */

    private MovimentacaoReagenteResponseDTO toDTO(MovimentacaoReagente mov) {

        MovimentacaoReagenteResponseDTO dto =
                new MovimentacaoReagenteResponseDTO();

        dto.setId(mov.getId());
        dto.setTipoMovimentacao(mov.getTipoMovimentacao());
        dto.setQuantidadeAlterada(mov.getQuantidadeAlterada());
        dto.setQuantidadeFinal(mov.getQuantidadeFinal());
        dto.setDataMovimentacao(mov.getDataMovimentacao());
        dto.setMotivo(mov.getMotivo());

        dto.setReagenteId(mov.getReagente().getId());
        dto.setNomeReagente(mov.getReagente().getNome());

        return dto;
    }
}
