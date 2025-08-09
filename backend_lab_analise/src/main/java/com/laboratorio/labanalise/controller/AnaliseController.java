package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.DTO.AnaliseDTO;
import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.model.Analise;
import com.laboratorio.labanalise.services.AnaliseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.laboratorio.labanalise.repositories.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000") // Altere para o seu frontend
@RestController
@RequestMapping(path = "/analise")
public class AnaliseController {

    @Autowired
    private AnaliseService service;
    private AmostraRepository amostraRepository;

    @PostMapping
    public ResponseEntity<?> salvarAnalise(@RequestBody Analise analise) {
        // Validação do contrato
        if (analise.getContrato() == null || analise.getContrato().getId() == null) {
            return ResponseEntity.badRequest().body("Contrato é obrigatório.");
        }

        // Validação da matriz
        if (analise.getMatriz() == null || analise.getMatriz().getId() == null) {
            return ResponseEntity.badRequest().body("Matriz é obrigatória.");
        }

        // Salvar a análise
        analise = service.salvar(analise);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand(analise.getId()).toUri();
        return ResponseEntity.created(uri).body(analise);
    }

    // ATUALIZANDO
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarAnalise(@PathVariable Long id, @RequestBody Analise analiseAtualizada) {
        // Verificar se a análise existe
        Analise analiseExistente = service.buscarPorId(id);
        if (analiseExistente == null) {
            return ResponseEntity.notFound().build();
        }

        // Atualizar os dados
        analiseExistente.setContrato(analiseAtualizada.getContrato());
        analiseExistente.setMatriz(analiseAtualizada.getMatriz());
        analiseExistente.setQuantidadeAmostras(analiseAtualizada.getQuantidadeAmostras());
        analiseExistente.setPrazoFinalizacao(analiseAtualizada.getPrazoFinalizacao());
        analiseExistente.setStatusAnalise(analiseAtualizada.getStatusAnalise());

        // Salvar a análise atualizada
        service.salvar(analiseExistente);

        return ResponseEntity.ok(analiseExistente);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> atualizarParcialAnalise(@PathVariable Long id, @RequestBody Analise analiseAtualizada) {
        // Verificar se a análise existe
        Analise analiseExistente = service.buscarPorId(id);
        if (analiseExistente == null) {
            return ResponseEntity.notFound().build();
        }

        // Atualizar apenas os campos fornecidos no request
        if (analiseAtualizada.getNome() != null) {
            analiseExistente.setNome(analiseAtualizada.getNome());
        }
        if (analiseAtualizada.getContrato() != null) {
            analiseExistente.setContrato(analiseAtualizada.getContrato());
        }
        if (analiseAtualizada.getMatriz() != null) {
            analiseExistente.setMatriz(analiseAtualizada.getMatriz());
        }
        if (analiseAtualizada.getQuantidadeAmostras() != null) {
            analiseExistente.setQuantidadeAmostras(analiseAtualizada.getQuantidadeAmostras());
        }
        if (analiseAtualizada.getPrazoFinalizacao() != null) {
            analiseExistente.setPrazoFinalizacao(analiseAtualizada.getPrazoFinalizacao());
        }
        if (analiseAtualizada.getStatusAnalise() != null) {
            analiseExistente.setStatusAnalise(analiseAtualizada.getStatusAnalise());
        }

        // Salvar a análise atualizada
        service.salvar(analiseExistente);

        return ResponseEntity.ok(analiseExistente);
    }

    @GetMapping
    public ResponseEntity<List<AnaliseDTO>> listarAnalise() {
        List<Analise> analises = service.buscarTodos();
        List<AnaliseDTO> analiseDTOs = analises.stream().map(analise -> {
            AnaliseDTO dto = new AnaliseDTO();
            dto.setId(analise.getId());
            dto.setNome(analise.getNome());
            dto.setDataCadastro(analise.getDataCadastro());
            dto.setDataInicio(analise.getDataInicio());
            dto.setDescricaoGeral(analise.getDescricaoGeral());
            dto.setStatusAnalise(analise.getStatusAnalise());
            dto.setQuantidadeAmostras(analise.getQuantidadeAmostras());
            dto.setPrazoFinalizacao(analise.getPrazoFinalizacao());
            dto.setMatrizId(analise.getMatriz() != null ? analise.getMatriz().getId() : null);
            dto.setContratoId(analise.getContrato() != null ? analise.getContrato().getId() : null);
            dto.setAmostraIds(analise.getAmostras().stream().map(Amostra::getId).collect(Collectors.toList()));
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok().body(analiseDTOs);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deletarAnalise(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/analises/{id}/quantidade-amostras")
    public int getQuantidadeAmostras(@PathVariable Long id) {
        return amostraRepository.countByAnaliseId(id);
    }

}
