package com.laboratorio.labanalise.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.laboratorio.labanalise.DTO.AmostraComAnaliseDTO;
import com.laboratorio.labanalise.DTO.AmostraDTO;
import com.laboratorio.labanalise.DTO.AnalitoSubtipoDTO;
import com.laboratorio.labanalise.DTO.projection.StatusAmostraCountProjection;
import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.model.AmostraAnalito;
import com.laboratorio.labanalise.model.AmostraProcedimento;
import com.laboratorio.labanalise.model.Analise;
import com.laboratorio.labanalise.model.Analito;
import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.model.enums.StatusAmostra;
import com.laboratorio.labanalise.repositories.AmostraProcedimentoRepository;
import com.laboratorio.labanalise.repositories.AmostraRepository;
import com.laboratorio.labanalise.repositories.AnaliseRepository;
import com.laboratorio.labanalise.repositories.AnalitoRepository;
import com.laboratorio.labanalise.repositories.ProcedimentoRepository;

@Service
public class AmostraService {
    @Autowired
    private AmostraRepository amostraRepository;

    @Autowired
    private AmostraProcedimentoRepository amostraProcedimentoRepository;

    @Autowired
    private AnalitoRepository analitoRepository;

    @Autowired
    private ProcedimentoRepository procedimentoRepository;

    @Autowired
    private ProcedimentoService procedimentoService;

    @Autowired
    private AnaliseRepository analiseRepository;

    public Amostra salvar(Amostra amostra) {
        return amostraRepository.save(amostra);
    }

    public void remover(Long id) {
        Optional<Amostra> amostraOpt = amostraRepository.findById(id);
        if (amostraOpt.isPresent()) {
            Amostra amostra = amostraOpt.get();
            Analise analise = amostra.getAnalise();
            amostraRepository.deleteById(id);
            if (analise != null) {
                int novaQuantidade = amostraRepository.countByAnaliseId(analise.getId());
                analise.setQuantidadeAmostras(novaQuantidade);
                analiseRepository.save(analise);
            }
        }
    }

    private AmostraDTO converterParaDTO(Amostra amostra) {
        AmostraDTO dto = new AmostraDTO();
        dto.setId(amostra.getId());
        dto.setNome(amostra.getNome());
        dto.setEnderecoColeta(amostra.getEnderecoColeta());
        dto.setDataColeta(amostra.getDataColeta());
        dto.setCoordenadaColeta(amostra.getCoordenadaColeta());
        dto.setPrazoFinalizacao(amostra.getPrazoFinalizacao());

        if (amostra.getStatus() != null) {
            dto.setStatus(amostra.getStatus().name());
        }

        dto.setDescricao(amostra.getDescricao());

        if (amostra.getAmostraAnalitos() != null) {
            List<Long> analitosIds = amostra.getAmostraAnalitos().stream()
                    .map(aa -> aa.getAnalito().getId())
                    .collect(Collectors.toList());
            dto.setAnalitos(analitosIds);

            List<AnalitoSubtipoDTO> analitosSelecionados = amostra.getAmostraAnalitos()
                    .stream()
                    .map(aa -> new AnalitoSubtipoDTO(
                            aa.getAnalito().getId(),
                            aa.getAnalito().getClassificacao(),
                            aa.getSubtipo()))
                    .collect(Collectors.toList());
            dto.setAnalitosSelecionados(analitosSelecionados);
        }

        if (amostra.getAmostraProcedimentos() != null) {
            List<Long> procedimentosIds = amostra.getAmostraProcedimentos().stream()
                    .map(ap -> ap.getProcedimento().getId())
                    .collect(Collectors.toList());
            dto.setProcedimentosIds(procedimentosIds);

            List<String> procedimentosNomes = amostra.getAmostraProcedimentos().stream()
                    .map(ap -> ap.getProcedimento().getNomeProcedimento())
                    .collect(Collectors.toList());
            dto.setProcedimentosNomes(procedimentosNomes);

        }

        return dto;
    }

@Transactional
public Amostra saveAmostra(AmostraDTO dto) {

    Amostra amostra = new Amostra();
    amostra.setNome(dto.getNome());
    amostra.setEnderecoColeta(dto.getEnderecoColeta());
    amostra.setDataColeta(dto.getDataColeta());
    amostra.setCoordenadaColeta(dto.getCoordenadaColeta());
    amostra.setPrazoFinalizacao(dto.getPrazoFinalizacao());
    amostra.setDescricao(dto.getDescricao());

    // ================= STATUS =================
    if (dto.getStatus() != null && !dto.getStatus().isBlank()) {
        amostra.setStatus(StatusAmostra.valueOf(dto.getStatus()));
    } else {
        amostra.setStatus(StatusAmostra.EM_ANDAMENTO);
    }

    // ================= ANALISE (OBRIGATÓRIA) =================
    if (dto.getAnaliseId() != null) {
        Analise analise = analiseRepository.findById(dto.getAnaliseId())
                .orElseThrow(() -> new RuntimeException("Análise não encontrada!"));
        amostra.setAnalise(analise);
    } else {
        throw new RuntimeException("Analise é obrigatória para criar a amostra.");
    }

    // ================= SAVE DA AMOSTRA =================
    amostra = amostraRepository.save(amostra);

    // ================= ATUALIZA CONTAGEM DA ANALISE =================
    int quantidade = amostraRepository.countByAnaliseId(amostra.getAnalise().getId());
    amostra.getAnalise().setQuantidadeAmostras(quantidade);
    analiseRepository.save(amostra.getAnalise());

    // ================= ANALITOS (SEM SUBTIPO) =================
    if (dto.getAnalitos() != null && !dto.getAnalitos().isEmpty()) {

        List<Long> analitosFiltrados = dto.getAnalitos().stream()
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());

        if (!analitosFiltrados.isEmpty()) {

            List<Analito> analitos = analitoRepository.findAllById(analitosFiltrados);

            if (analitos.size() != analitosFiltrados.size()) {
                throw new RuntimeException("Um ou mais analitos não foram encontrados!");
            }

            for (Analito analito : analitos) {
                AmostraAnalito aa = new AmostraAnalito(amostra, analito);
                amostra.getAmostraAnalitos().add(aa);
            }
        }
    }

    // ================= ANALITOS COM SUBTIPO =================
    if (dto.getAnalitosSelecionados() != null && !dto.getAnalitosSelecionados().isEmpty()) {

        for (AnalitoSubtipoDTO analitoSubtipoDTO : dto.getAnalitosSelecionados()) {

            Long analitoId = analitoSubtipoDTO.getAnalitoId();
            String subtipoSelecionado = analitoSubtipoDTO.getSubtipo();

            if (analitoId == null || subtipoSelecionado == null || subtipoSelecionado.isBlank()) {
                throw new RuntimeException("Analito ou subtipo inválido.");
            }

            Analito analito = analitoRepository.findById(analitoId)
                    .orElseThrow(() -> new RuntimeException("Analito não encontrado: " + analitoId));

            if (!analito.getSubtipoAnalito().contains(subtipoSelecionado)) {
                throw new RuntimeException(
                        "Subtipo " + subtipoSelecionado + " não pertence ao analito " + analitoId
                );
            }

            AmostraAnalito amostraAnalito = new AmostraAnalito();
            amostraAnalito.setAmostra(amostra);
            amostraAnalito.setAnalito(analito);
            amostraAnalito.setSubtipo(subtipoSelecionado);

            amostra.getAmostraAnalitos().add(amostraAnalito);
        }
    }

    // ================= PROCEDIMENTOS =================
    if (dto.getProceduresIds() != null && !dto.getProceduresIds().isEmpty()) {

        for (Long procedimentoId : dto.getProceduresIds()) {

            Procedimento procedimento = procedimentoRepository.findById(procedimentoId)
                    .orElseThrow(() ->
                            new RuntimeException("Procedimento não encontrado: " + procedimentoId)
                    );

            AmostraProcedimento ap = new AmostraProcedimento(amostra, procedimento);
            amostraProcedimentoRepository.save(ap);
        }
    }

    return amostra;
}



    public List<Amostra> buscarEntidades() {
        return amostraRepository.findAll();
    }

    public List<AmostraDTO> buscarTodos() {
        List<Amostra> amostras = amostraRepository.findAll();

        return amostras.stream().map(this::converterParaDTO).collect(Collectors.toList());
    }

    public List<AmostraComAnaliseDTO> buscarAmostrasComAnalise() {
        List<Amostra> amostras = buscarEntidades();

        return amostras.stream().map(a -> {
            Long analiseId = a.getAnalise() != null ? a.getAnalise().getId() : null;
            String nomeAnalise = a.getAnalise() != null ? a.getAnalise().getNome() : "Não associada";

            return new AmostraComAnaliseDTO(
                    a.getId(),
                    a.getNome(),
                    a.getPrazoFinalizacao(),
                    a.getEnderecoColeta(),
                    a.getStatus().toString(),
                    analiseId,
                    nomeAnalise);
        }).collect(Collectors.toList());
    }

    public Amostra encerrarAmostra(Long id) {
        Amostra amostra = amostraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Amostra não encontrada"));

        LocalDate hoje = LocalDate.now();
        amostra.setDataFinalizacaoReal(hoje);

        if (!hoje.isAfter(amostra.getPrazoFinalizacao())) {
            amostra.setStatus(StatusAmostra.CONCLUIDA);
        } else {
            amostra.setStatus(StatusAmostra.ENCERRADA);
        }

        return amostraRepository.save(amostra);
    }

    public List<StatusAmostraCountProjection> obterContagemPorStatus() {
        return amostraRepository.countAmostrasByStatus();
    }
    /*
     * public List<Amostra> buscarTodos() {
     * return amostraRepository.findAll();
     * }
     */
}
