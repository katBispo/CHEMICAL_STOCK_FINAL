package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.repositories.ReagenteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReagenteService {

    @Autowired
    public ReagenteRepository repository;

    @Autowired
    private MovimentacaoReagenteService movimentacaoReagenteService;

    public Reagente salvar(Reagente reagente) {
        reagente = repository.save(reagente);
        movimentacaoReagenteService.registrarMovimentacaoInicial(reagente);
        return reagente;
    }

    @Transactional
    public Reagente atualizarReagente(Long id, Reagente reagenteNovo) {
        Reagente reagente = repository.findById(id).orElse(null);
        atualizarDados(reagente, reagenteNovo);
        registrarMovimentacao(reagenteNovo, reagente);
        return repository.save(reagente);
    }

    private void registrarMovimentacao(Reagente reagenteNovo, Reagente reagente) {
        movimentacaoReagenteService.registarMovimentacaoDeEntrada(reagente, reagenteNovo);
    }

    private void atualizarDados(Reagente reagente, Reagente reagenteNovo) {
        reagente.setNome(reagenteNovo.getNome());
        reagente.setDataValidade(reagenteNovo.getDataValidade());
        reagente.setQuantidadePorFrasco(reagenteNovo.getQuantidadePorFrasco());
        reagente.setQuantidadeDeFrascos(reagenteNovo.getQuantidadeDeFrascos());
        reagente.setLote(reagenteNovo.getLote());
        reagente.setQuantidadeAtual(reagenteNovo.getQuantidadeAtual());
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public Reagente buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Reagente> buscarTodos() {
        return repository.findAll();
    }
}
