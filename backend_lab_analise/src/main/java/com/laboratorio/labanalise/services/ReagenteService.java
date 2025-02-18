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
        atualizarDados(reagente,reagenteNovo);
        movimentacaoReagenteService.registarMovimentacaoDeEntrada(reagente,reagenteNovo);
        return repository.save(reagente);
    }

    private void atualizarDados(Reagente reagente, Reagente reagenteNovo) {
        reagente.setNome(reagenteNovo.getNome());
        reagente.setDataValidade(reagenteNovo.getDataValidade());
        reagente.setQuantidadePorFrasco(reagenteNovo.getQuantidadePorFrasco());
        reagente.setQuantidadeDeFrascos(reagenteNovo.getQuantidadeDeFrascos());
        reagente.setLote(reagenteNovo.getLote());
        reagente.setQuantidadeAtual(reagenteNovo.getQuantidadeAtual());
    }


    /*private void getMovimentacaoInicial(Reagente reagente) {
        MovimentacaoReagente movimentacao = new MovimentacaoReagente();
        movimentacao.setReagente(reagente);
        movimentacao.setDataMovimentacao(LocalDate.now());
        movimentacao.setTipoMovimentacao(TipoMovimentacao.ENTRADA);
        movimentacao.setQuantidadeAlterada(reagente.getQtdFrascos() * reagente.getVolumePorFrasco());
        movimentacao.setQuantidadeFinal(movimentacao.getQuantidadeAlterada()); // Primeira movimentação, então é o total
        movimentacao.setMotivo("Cadastro inicial");

        // Salvar a movimentação
        service.salvar(movimentacao);

        // Adicionar movimentação ao reagente para manter o relacionamento bidirecional
        reagente.getMovimentacoes().add(movimentacao);
    }*/

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
