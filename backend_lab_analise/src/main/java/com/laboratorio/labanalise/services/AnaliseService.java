package com.laboratorio.labanalise.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.DTO.AnaliseDTO;
import com.laboratorio.labanalise.DTO.projection.AnaliseProjection;
import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.model.Analise;
import com.laboratorio.labanalise.repositories.AmostraRepository;
import com.laboratorio.labanalise.repositories.AnaliseRepository;

@Service
public class AnaliseService {

    @Autowired
    public AnaliseRepository repository;

     @Autowired
    public AmostraRepository amostraRepository;


    public Analise salvar(Analise analise) {
        return repository.save(analise);
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public Analise buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

 public List<AnaliseDTO> buscarTodos() {
    List<AnaliseProjection> projections = repository.findAllProjected();

    return projections.stream().map(p -> {
        AnaliseDTO dto = new AnaliseDTO();
        dto.setId(p.getId());
        dto.setNome(p.getNome());
        dto.setDataCadastro(p.getDataCadastro());
        dto.setDataInicio(p.getDataInicio());
        dto.setDescricaoGeral(p.getDescricaoGeral());
        dto.setStatusAnalise(p.getStatusAnalise()); // ✅ Correção aqui
        dto.setQuantidadeAmostras(p.getQuantidadeAmostras());
        dto.setPrazoFinalizacao(p.getPrazoFinalizacao());

        dto.setMatrizId(p.getMatrizId());
        dto.setNomeMatriz(p.getNomeMatriz());
        dto.setContratoId(p.getContratoId());
        dto.setNomeContrato(p.getNomeContrato());
        dto.setNomeCliente(p.getNomeCliente());

        // Busca amostras relacionadas
        List<Amostra> amostras = amostraRepository.findByAnaliseId(p.getId());
        dto.setAmostraIds(amostras.stream()
            .map(Amostra::getId)
            .collect(Collectors.toList()));

        // Busca analitos distintos
        List<String> analitos = amostras.stream()
            .flatMap(a -> a.getAmostraAnalitos().stream()
                .map(aa -> aa.getAnalito().getClassificacao()))
            .distinct()
            .collect(Collectors.toList());
        dto.setAnalitos(analitos);

        return dto;
    }).collect(Collectors.toList());
}



}
