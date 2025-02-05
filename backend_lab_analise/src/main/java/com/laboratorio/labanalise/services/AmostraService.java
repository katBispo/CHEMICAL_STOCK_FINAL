package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.*;
import com.laboratorio.labanalise.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.laboratorio.labanalise.DTO.*;
import com.laboratorio.labanalise.model.enums.*;

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
        amostraRepository.deleteById(id);
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
        }

        if (dto.getAnalitos() != null && !dto.getAnalitos().isEmpty()) {
            List<Analito> analitos = analitoRepository.findAllById(dto.getAnalitos());
            amostra.setAnalitos(analitos);
        }

        //ignroar trecho por enquanto
        /*if (dto.getProcedimentos() != null && !dto.getProcedimentos().isEmpty()) {
            List<Procedimento> procedimentos = procedimentoRepository.findAllById(dto.getProcedimentos());
            amostra.set
        }*/

        return amostraRepository.save(amostra);
    }
}
