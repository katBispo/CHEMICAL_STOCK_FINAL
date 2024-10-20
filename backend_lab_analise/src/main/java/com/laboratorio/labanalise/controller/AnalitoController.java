package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Analito;
import com.laboratorio.labanalise.services.AnalitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/cadastroAnalitos")
public class AnalitoController {

    @Autowired
    private AnalitoService service;

    @PostMapping
    public ResponseEntity<Analito> salvarAnalito(@RequestBody Analito analito) {
        analito = service.salvar(analito);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(analito.getId()).toUri();
        return ResponseEntity.created(uri).body(analito);
    }

    @GetMapping
    public ResponseEntity<List<Analito>> listarAnalitos() {
        List<Analito> analitos = service.buscarTodos();
        return ResponseEntity.ok().body(analitos);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Analito> deletarAnalito(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}
