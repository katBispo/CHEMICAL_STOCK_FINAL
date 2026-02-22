package com.laboratorio.labanalise.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.exceptions.QuantidadeInsuficienteException;
import com.laboratorio.labanalise.model.FrascoReagente;
import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.StatusFrasco;
import com.laboratorio.labanalise.repositories.FrascoReagenteRepository;

import jakarta.transaction.Transactional;

@Service
public class FrascoReagenteService {

    private final FrascoReagenteRepository repository;

    public FrascoReagenteService(FrascoReagenteRepository repository) {
        this.repository = repository;
    }

    public FrascoReagente salvar(FrascoReagente frasco) {
        return repository.save(frasco);
    }

    public List<FrascoReagente> listarDisponiveisPorReagente(Reagente reagente) {
        return repository.buscarFrascosDisponiveisOrdenadoPorValidade(
                reagente,
                StatusFrasco.CHEIO,
                StatusFrasco.EM_USO
        );
    }

    @Transactional
    public List<FrascoReagente> descontarQuantidade(Reagente reagente, Double quantidade, Procedimento procedimento) {

        double restante = quantidade;
        List<FrascoReagente> usados = new ArrayList<>();

        List<FrascoReagente> frascos = listarDisponiveisPorReagente(reagente);

        for (FrascoReagente frasco : frascos) {

            if (restante <= 0) {
                break;
            }

            double disponivel = frasco.getQuantidadeAtual();
            double usado = Math.min(disponivel, restante);

            frasco.setQuantidadeAtual(disponivel - usado);
            frasco.setQuantidadeMovimentada(usado);
            restante -= usado;

            frasco.setStatus(
                    frasco.getQuantidadeAtual() == 0
                    ? StatusFrasco.VAZIO
                    : StatusFrasco.EM_USO
            );

            repository.save(frasco);
            usados.add(frasco);
        }
        if (restante > 0) {
            double totalDisponivel = frascos.stream()
                    .mapToDouble(FrascoReagente::getQuantidadeAtual)
                    .sum();

            throw new QuantidadeInsuficienteException(totalDisponivel);
        }
        return usados;
    }

    public Double somarQuantidadeAtualPorReagente(Reagente reagente) {
        return repository.findByReagente(reagente)
                .stream()
                .mapToDouble(FrascoReagente::getQuantidadeAtual)
                .sum();
    }

    public List<FrascoReagente> listarTodos() {
        return repository.findAll();
    }

    public void validarQuantidadeDisponivel(Reagente reagente, Double quantidade) {

        if (quantidade == null || quantidade <= 0) {
            throw new IllegalArgumentException("Quantidade inválida para validação.");
        }

        Double totalDisponivel = repository
                .findByReagente(reagente)
                .stream()
                .mapToDouble(FrascoReagente::getQuantidadeAtual)
                .sum();

        if (totalDisponivel < quantidade) {
            throw new QuantidadeInsuficienteException(totalDisponivel);
        }
    }

    //sobrecarga
    @Transactional
    public List<FrascoReagente> descontarQuantidade(
            Reagente reagente,
            Double quantidade
    ) {
        return descontarQuantidade(reagente, quantidade, null);
    }

    public Long obterTotalDeFrascos() {
        return repository.contarFrascosDisponiveis();
    }
}
