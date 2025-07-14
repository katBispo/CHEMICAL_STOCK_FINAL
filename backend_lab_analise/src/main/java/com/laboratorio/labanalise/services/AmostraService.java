package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.*;
import com.laboratorio.labanalise.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.laboratorio.labanalise.DTO.*;
import com.laboratorio.labanalise.model.enums.*;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

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

    public List<Amostra> buscarTodos() {
        return amostraRepository.findAll();
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

    @Transactional
    public Amostra saveAmostra(AmostraDTO dto) {
        Amostra amostra = new Amostra();
        amostra.setNome(dto.getNome());
        amostra.setEnderecoColeta(dto.getEnderecoColeta());
        amostra.setDataColeta(dto.getDataColeta());
        amostra.setCoordenadaColeta(dto.getCoordenadaColeta());
        amostra.setPrazoFinalizacao(dto.getPrazoFinalizacao());
        amostra.setStatus(StatusAmostra.valueOf(dto.getStatus()));
        amostra.setDescricao(dto.getDescricao());

        // Salva a amostra no banco
        amostra = amostraRepository.save(amostra);

        // --- Análise ---
        if (dto.getAnaliseId() != null) {
            Analise analise = analiseRepository.findById(dto.getAnaliseId())
                    .orElseThrow(() -> new RuntimeException("Analise não encontrada!"));
            amostra.setAnalise(analise);

            // Atualiza a contagem
            int novaQuantidade = amostraRepository.countByAnaliseId(analise.getId());
            analise.setQuantidadeAmostras(novaQuantidade + 1);
            analiseRepository.save(analise);
        }

        // --- Analitos ---
        if (dto.getAnalitos() != null && !dto.getAnalitos().isEmpty()) {
            List<Long> analitosFiltrados = dto.getAnalitos().stream()
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            if (!analitosFiltrados.isEmpty()) {
                List<Analito> analitos = analitoRepository.findAllById(analitosFiltrados);
                if (analitos.size() != analitosFiltrados.size()) {
                    throw new RuntimeException("Um ou mais analitos não foram encontrados!");
                }

                amostra.getAmostraAnalitos().clear();
                for (Analito analito : analitos) {
                    AmostraAnalito aa = new AmostraAnalito(amostra, analito);
                    amostra.getAmostraAnalitos().add(aa);
                }
            }
        }

        // --- Procedimentos ---
        if (dto.getProceduresIds() != null) {
            for (Long procedimentoId : dto.getProceduresIds()) {
                Procedimento procedimento = procedimentoRepository.findById(procedimentoId)
                        .orElseThrow(() -> new RuntimeException("Procedimento não encontrado: " + procedimentoId));

                AmostraProcedimento ap = new AmostraProcedimento(amostra, procedimento);
                amostraProcedimentoRepository.save(ap);
            }
        }
        if (dto.getStatus() != null) {
            amostra.setStatus(StatusAmostra.valueOf(dto.getStatus()));
        } else {
            amostra.setStatus(StatusAmostra.EM_ANDAMENTO); // default
        }

        return amostra;
    }
}
