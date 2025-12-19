package com.laboratorio.labanalise.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.model.FrascoReagente;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.StatusFrasco;
import com.laboratorio.labanalise.repositories.FrascoReagenteRepository;

import jakarta.transaction.Transactional;

@Service
public class FrascoReagenteService {

    private final FrascoReagenteRepository repository;
    private final MovimentacaoReagenteService movimentacaoService;

    public FrascoReagenteService(
            FrascoReagenteRepository repository,
            MovimentacaoReagenteService movimentacaoService) {
        this.repository = repository;
        this.movimentacaoService = movimentacaoService;
    }

    public FrascoReagente salvar(FrascoReagente frasco) {
        return repository.save(frasco);
    }

    public List<FrascoReagente> listarTodos() {
        return repository.findAll();
    }

  public List<FrascoReagente> listarDisponiveisPorReagente(Reagente reagente) {
    return repository.buscarFrascosDisponiveisOrdenadoPorValidade(
        reagente,
        StatusFrasco.CHEIO,
        StatusFrasco.EM_USO
    );
}


  @Transactional
public void descontarQuantidade(Reagente reagente, Double quantidade) {

    double restante = quantidade;

    List<FrascoReagente> frascos =
            repository.buscarFrascosDisponiveisOrdenadoPorValidade(
                    reagente,
                    StatusFrasco.CHEIO,
                    StatusFrasco.EM_USO
            );

    for (FrascoReagente frasco : frascos) {

        if (restante <= 0) break;

        double disponivel = frasco.getQuantidadeAtual();
        double usado = Math.min(disponivel, restante);

        frasco.setQuantidadeAtual(disponivel - usado);
        restante -= usado;

        if (frasco.getQuantidadeAtual() == 0) {
            frasco.setStatus(StatusFrasco.VAZIO);
        } else {
            frasco.setStatus(StatusFrasco.EM_USO);
        }

        repository.save(frasco);
    }

    if (restante > 0) {
        throw new RuntimeException(
                "Estoque insuficiente para o reagente: " + reagente.getNome()
        );
    }
}

public Double somarQuantidadeAtualPorReagente(Reagente reagente) {
    return repository.findByReagente(reagente)
            .stream()
            .mapToDouble(FrascoReagente::getQuantidadeAtual)
            .sum();
}

}
