package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Analise;
import com.laboratorio.labanalise.services.AnaliseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Altere para o seu frontend
@RestController
@RequestMapping(path = "/analise")
public class AnaliseController {

    @Autowired
    private AnaliseService service;

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

        // Validação do procedimento
        if (analise.getProcedimento() == null || analise.getProcedimento().getId() == null) {
            return ResponseEntity.badRequest().body("Procedimento é obrigatório.");
        }

        // Salvar a análise
        analise = service.salvar(analise);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand(analise.getId()).toUri();
        return ResponseEntity.created(uri).body(analise);
    }



    //ATUALIZANDO
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
    analiseExistente.setProcedimento(analiseAtualizada.getProcedimento());
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
    if (analiseAtualizada.getContrato() != null) {
        analiseExistente.setContrato(analiseAtualizada.getContrato());
    }
    if (analiseAtualizada.getMatriz() != null) {
        analiseExistente.setMatriz(analiseAtualizada.getMatriz());
    }
    if (analiseAtualizada.getProcedimento() != null) {
        analiseExistente.setProcedimento(analiseAtualizada.getProcedimento());
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
    public ResponseEntity<List<Analise>> listarAnalise() {
        List<Analise> analises = service.buscarTodos();
        return ResponseEntity.ok().body(analises);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deletarAnalise(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}
