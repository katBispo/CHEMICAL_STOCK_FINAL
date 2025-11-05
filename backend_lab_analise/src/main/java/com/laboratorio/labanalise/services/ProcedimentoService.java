package com.laboratorio.labanalise.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.DTO.projection.ProcedimentoMaisUsadoDTO;
import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.ReagenteUsadoProcedimento;
import com.laboratorio.labanalise.repositories.ProcedimentoRepository;
import com.laboratorio.labanalise.repositories.ReagenteUsadoProcedimentoRepository;
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

    // Salvar procedimento com reagente usado
    public Procedimento salvar(Procedimento procedimento, Reagente reagente, Double quantidade) {
        if (reagente.getQuantidadeTotal() < quantidade) {
            throw new IllegalArgumentException("Quantidade insuficiente no estoque do reagente.");
        }

        Reagente r = reagenteService.buscarPorId(reagente.getId());

        ReagenteUsadoProcedimento reagenteUsadoProcedimento = criarReagenteUsadoProcedimento(procedimento, quantidade, r);

        movimentacaoReagenteService.registrarMovimentacaoDeSaida(r, quantidade);

        repository.save(procedimento);
        reagenteUsadoProcedimentoRepository.save(reagenteUsadoProcedimento);

        return procedimento;
    }

    private ReagenteUsadoProcedimento criarReagenteUsadoProcedimento(Procedimento procedimento, Double quantidade, Reagente r) {
        ReagenteUsadoProcedimento rup = new ReagenteUsadoProcedimento();
        rup.setReagente(r);
        rup.setProcedimento(procedimento);
        rup.setQuantidade(quantidade);
        r.reduzirQuantidade(quantidade);
        return rup;
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

    // Estatísticas

    // Top 5 procedimentos mais usados
    public List<ProcedimentoMaisUsadoDTO> buscarTop5Procedimentos() {
        return repository.buscarUsoTotalProcedimentos()
                         .stream()
                         .sorted((p1, p2) -> p2.getQuantidade().compareTo(p1.getQuantidade()))
                         .limit(5)
                         .toList();
    }

    // Total de uso de todos os procedimentos
    public List<ProcedimentoMaisUsadoDTO> buscarUsoTotalProcedimentos() {
        return repository.buscarUsoTotalProcedimentos();
    }
}

