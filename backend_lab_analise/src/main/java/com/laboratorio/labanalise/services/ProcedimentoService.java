package com.laboratorio.labanalise.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.DTO.FaltaReagenteDetalheDTO;
import com.laboratorio.labanalise.DTO.ProcedimentoSelectDTO;
import com.laboratorio.labanalise.DTO.projection.ProcedimentoMaisUsadoDTO;
import com.laboratorio.labanalise.DTO.request.ReagenteQuantidadeRequest;
import com.laboratorio.labanalise.exceptions.EstoqueInsuficienteException;
import com.laboratorio.labanalise.exceptions.QuantidadeInsuficienteException;
import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.ReagenteUsadoProcedimento;
import com.laboratorio.labanalise.repositories.ProcedimentoRepository;
import com.laboratorio.labanalise.repositories.ReagenteRepository;
import com.laboratorio.labanalise.repositories.ReagenteUsadoProcedimentoRepository;

import jakarta.transaction.Transactional;

@Service
public class ProcedimentoService {

    @Autowired
    private ProcedimentoRepository repository;

    @Autowired
    private ReagenteUsadoProcedimentoRepository reagenteUsadoProcedimentoRepository;

    @Autowired
    private ReagenteService reagenteService;
    @Autowired
    private ReagenteRepository reagenteRepository;

    @Autowired
    private MovimentacaoReagenteService movimentacaoReagenteService;

    @Autowired
    private FrascoReagenteService frascoReagenteService;

    public ProcedimentoService(
            ProcedimentoRepository repository,
            ReagenteUsadoProcedimentoRepository reagenteUsadoProcedimentoRepository,
            ReagenteService reagenteService,
            ReagenteRepository reagenteRepository,
            MovimentacaoReagenteService movimentacaoReagenteService,
            FrascoReagenteService frascoReagenteService
    ) {
        this.repository = repository;
        this.reagenteUsadoProcedimentoRepository = reagenteUsadoProcedimentoRepository;
        this.reagenteService = reagenteService;
        this.reagenteRepository = reagenteRepository;
        this.movimentacaoReagenteService = movimentacaoReagenteService;
        this.frascoReagenteService = frascoReagenteService;
    }

    // Salvar procedimento com reagente usado
    @Transactional
    public Procedimento salvar(
            Procedimento procedimento,
            Reagente reagente,
            Double quantidade) {

        // 🔹 Busca o reagente
        Reagente r = reagenteService.buscarPorId(reagente.getId());

        // 🔹 Salva o procedimento (se for novo)
        Procedimento procedimentoSalvo = repository.save(procedimento);

        // 🔹 Cria o vínculo "procedimento usa reagente X na quantidade Y"
        ReagenteUsadoProcedimento rup
                = criarReagenteUsadoProcedimento(
                        procedimentoSalvo,
                        quantidade,
                        r
                );

        reagenteUsadoProcedimentoRepository.save(rup);

        return procedimentoSalvo;
    }

    private ReagenteUsadoProcedimento criarReagenteUsadoProcedimento(
            Procedimento procedimento,
            Double quantidade,
            Reagente r) {

        ReagenteUsadoProcedimento rup = new ReagenteUsadoProcedimento();
        rup.setReagente(r);
        rup.setProcedimento(procedimento);
        rup.setQuantidade(quantidade);

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

    @Transactional
    public Procedimento salvarProcedimentoCompleto(
            Procedimento procedimento,
            List<ReagenteQuantidadeRequest> reagentesQuantidades) {

        // 🔹 Salva o procedimento primeiro
        Procedimento procedimentoSalvo = repository.save(procedimento);

        // 🔹 Validação básica
        if (reagentesQuantidades == null || reagentesQuantidades.isEmpty()) {
            throw new RuntimeException(
                    "Procedimento deve possuir ao menos um reagente"
            );
        }

        // 🔹 Cria os vínculos procedimento ↔ reagente
        for (ReagenteQuantidadeRequest rq : reagentesQuantidades) {

            Reagente reagente
                    = reagenteService.buscarPorId(rq.getIdReagente());

            ReagenteUsadoProcedimento rup
                    = criarReagenteUsadoProcedimento(
                            procedimentoSalvo,
                            rq.getQuantidade(),
                            reagente
                    );

            reagenteUsadoProcedimentoRepository.save(rup);
        }

        return procedimentoSalvo;
    }

    // Total de uso de todos os procedimentos
    public List<ProcedimentoMaisUsadoDTO> buscarUsoTotalProcedimentos() {
        return repository.buscarUsoTotalProcedimentos();
    }

    @Transactional
    public void executarProcedimento(Long procedimentoId) {

        Procedimento procedimento = repository
                .findById(procedimentoId)
                .orElseThrow(() -> new RuntimeException("Procedimento não encontrado"));

        List<ReagenteUsadoProcedimento> reagentesUsados
                = reagenteUsadoProcedimentoRepository.findByProcedimento(procedimento);

        if (reagentesUsados.isEmpty()) {
            throw new RuntimeException("Procedimento não possui reagentes cadastrados");
        }

        List<FaltaReagenteDetalheDTO> faltas = new ArrayList<>();

        // 🔹 PRIMEIRO: validar tudo
        for (ReagenteUsadoProcedimento rup : reagentesUsados) {

            Reagente reagente = rup.getReagente();
            Double quantidade = rup.getQuantidade();

            try {
                frascoReagenteService.descontarQuantidade(reagente, quantidade);
            } catch (QuantidadeInsuficienteException e) {

                faltas.add(
                        new FaltaReagenteDetalheDTO(
                                reagente.getNome(),
                                procedimento.getNomeProcedimento(),
                                quantidade,
                                e.getDisponivel()
                        )
                );
            }
        }

        if (!faltas.isEmpty()) {
            throw new EstoqueInsuficienteException(faltas);
        }

        // 🔹 SEGUNDO: agora sim executa de verdade
        for (ReagenteUsadoProcedimento rup : reagentesUsados) {

            Reagente reagente = rup.getReagente();
            Double quantidade = rup.getQuantidade();

            frascoReagenteService.descontarQuantidade(reagente, quantidade);

            movimentacaoReagenteService.registrarMovimentacaoDeSaida(
                    reagente,
                    quantidade
            );
        }

        procedimento.incrementarUso();
        repository.save(procedimento);
    }

    public List<ProcedimentoSelectDTO> listarParaSelect() {
        return repository.listarParaSelect();
    }

}
