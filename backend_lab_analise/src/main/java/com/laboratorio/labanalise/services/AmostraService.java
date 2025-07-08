package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.*;
import com.laboratorio.labanalise.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.laboratorio.labanalise.DTO.*;
import com.laboratorio.labanalise.model.enums.*;
import java.util.Optional;

import java.util.List;

@Service
public class AmostraService {
    @Autowired
    private AmostraRepository amostraRepository;

    @Autowired
    private AnalitoRepository analitoRepository;

    @Autowired
    private ProcedimentoRepository procedimentoRepository;

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

    public Amostra saveAmostra(AmostraDTO dto) {
        Amostra amostra = new Amostra();
        amostra.setNome(dto.getNome());
        amostra.setEnderecoColeta(dto.getEnderecoColeta());
        amostra.setDataColeta(dto.getDataColeta());
        amostra.setCoordenadaColeta(dto.getCoordenadaColeta());
        amostra.setPrazoFinalizacao(dto.getPrazoFinalizacao());
        amostra.setStatus(StatusAmostra.valueOf(dto.getStatus()));
        amostra.setDescricao(dto.getDescricao());

        if (dto.getAnaliseId() != null) {
            Analise analise = analiseRepository.findById(dto.getAnaliseId())
                    .orElseThrow(() -> new RuntimeException("Analise não encontrada!"));
            amostra.setAnalise(analise);

            // Atualizar a quantidade de amostras na análise
            int novaQuantidade = amostraRepository.countByAnaliseId(analise.getId());
            analise.setQuantidadeAmostras(novaQuantidade + 1); // +1 porque ainda não salvou essa amostra
            analiseRepository.save(analise);
        }

        if (dto.getAnalitos() != null && !dto.getAnalitos().isEmpty()) {
        List<Analito> analitos = analitoRepository.findAllById(dto.getAnalitos());
        if (analitos.size() != dto.getAnalitos().size()) {
            throw new RuntimeException("Um ou mais analitos não foram encontrados!");
        }
        amostra.setAnalitos(analitos);
    }

        return amostraRepository.save(amostra);
    }
}
