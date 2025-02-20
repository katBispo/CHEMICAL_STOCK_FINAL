package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.MovimentacaoReagente;
import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.ReagenteUsadoProcedimento;
import com.laboratorio.labanalise.repositories.ProcedimentoRepository;
import com.laboratorio.labanalise.repositories.ReagenteUsadoProcedimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcedimentoService {

    @Autowired
    private ProcedimentoRepository repository;

    @Autowired
    private ReagenteUsadoProcedimentoRepository reagenteUsadoProcedimentoRepository;

    @Autowired
    private ReagenteService reagenteService;
    @Autowired
    private MovimentacaoReagenteService movimentacaoReagenteService;

    public Procedimento salvar(Procedimento procedimento, Reagente reagente, Double quantidade) {
        if (reagente.getQuantidadeTotal() < quantidade) {
            throw new IllegalArgumentException("Quantidade insuficiente no estoque do reagente.");
        }
        Reagente r = reagenteService.buscarPorId(reagente.getId());

        ReagenteUsadoProcedimento reagenteUsadoProcedimento = criarReagenteUsadoProcedimento(procedimento, quantidade, r);
       // reagenteService.atualizarReagente(reagente.getId(), r);
        movimentacaoReagenteService.registrarMovimentacaoDeSaida(r,quantidade);
        repository.save(procedimento);
        reagenteUsadoProcedimentoRepository.save(reagenteUsadoProcedimento);
        return procedimento;
    }

    private ReagenteUsadoProcedimento criarReagenteUsadoProcedimento(Procedimento procedimento, Double quantidade, Reagente r) {
        ReagenteUsadoProcedimento reagenteUsadoProcedimento = new ReagenteUsadoProcedimento();
        reagenteUsadoProcedimento.setReagente(r);
        reagenteUsadoProcedimento.setProcedimento(procedimento);
        reagenteUsadoProcedimento.setQuantidade(quantidade);
        r.reduzirQuantidade(quantidade);
        return reagenteUsadoProcedimento;
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public List<Procedimento> buscarPorIds(List<Long> ids) {
        return repository.findAllById(ids);
    }

    public Procedimento buscarPorNome(String nomeProcedimento) {
        return repository.findByNomeProcedimento(nomeProcedimento);
    }

    public List<Procedimento> buscarTodos() {
        return repository.findAll();
    }
}
