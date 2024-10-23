package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Analise;
import com.laboratorio.labanalise.services.AnaliseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

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
