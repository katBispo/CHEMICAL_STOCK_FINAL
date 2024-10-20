package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.services.ReagenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path="/reagente")
public class ReagenteController {

    @Autowired
    private ReagenteService service;

    @PostMapping
    public ResponseEntity<Reagente> salvarReagente(@RequestBody Reagente reagente) {
        reagente = service.salvar(reagente);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand(reagente.getId()).toUri();
        return ResponseEntity.created(uri).body(reagente);
    }

    @GetMapping
    public ResponseEntity<List<Reagente>> listarReagente() {
        List<Reagente> reagentes = service.buscarTodos();
        return ResponseEntity.ok().body(reagentes);
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<Reagente> deletarReagente(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }

}
