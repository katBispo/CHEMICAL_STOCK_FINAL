package com.laboratorio.labanalise.services;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.model.MovimentacaoReagente;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoMovimentacao;
import com.laboratorio.labanalise.repositories.MovimentacaoReagenteRepository;

@Service
public class MovimentacaoReagenteService {

    @Autowired
    MovimentacaoReagenteRepository repository;

    public MovimentacaoReagente salvar(MovimentacaoReagente movimentacaoReagente) {
        return repository.save(movimentacaoReagente);
    }

    public void registrarEntrada(Reagente reagente) {
        MovimentacaoReagente movimentacaoReagente = new MovimentacaoReagente();
        MovimentacaoReagente movimentacaoReagente1 = buscarPorIdDoReagente(reagente.getId());
        if (movimentacaoReagente1 != null) {
            movimentacaoReagente.setQuantidadeAlterada(reagente.getQtdFrascos() * reagente.getVolumePorFrasco());
            movimentacaoReagente.setQuantidadeFinal(movimentacaoReagente.getQuantidadeAlterada());
            movimentacaoReagente.setTipoMovimentacao(TipoMovimentacao.ENTRADA);
        

        salvar(movimentacaoReagente);
    }

    }

    private MovimentacaoReagente buscarPorIdDoReagente(Long idReagente) {
        return repository.obterMovimentacaoPorIdDoReagente(idReagente);
    }

}
