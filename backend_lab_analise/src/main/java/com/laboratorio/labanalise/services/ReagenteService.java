package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.MovimentacaoReagente;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.*;
import com.laboratorio.labanalise.repositories.ReagenteRepository;
import com.laboratorio.labanalise.repositories.MovimentacaoReagenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReagenteService {

    @Autowired
    public ReagenteRepository repository;

    @Autowired
    private MovimentacaoReagenteService movimentacaoReagenteService; 

    public Reagente salvar(Reagente reagente) {
        // Salvar o reagente primeiro
        reagente = repository.save(reagente);
        movimentacaoReagenteService.registrarEntrada(reagente);
        
        // Criar a movimentação inicial de entrada
      //  getMovimentacaoInicial(reagente);

        return reagente;
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
