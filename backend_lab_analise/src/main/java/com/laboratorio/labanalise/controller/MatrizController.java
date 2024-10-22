package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Matriz;
import com.laboratorio.labanalise.services.MatrizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path="/matriz")
public class MatrizController {

    @Autowired
    private MatrizService service;

    @PostMapping
    public ResponseEntity<Matriz> salvarMatriz(@RequestBody Matriz matriz) {
        matriz = service.salvar(matriz);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand(matriz.getId()).toUri();
        return ResponseEntity.created(uri).body(matriz);
    }

    @GetMapping
    public ResponseEntity<List<Matriz>> listarMatriz() {
        List<Matriz> matrizs = service.buscarTodos();
        return ResponseEntity.ok().body(matrizs);
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<Matriz> deletarMatriz(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }

}
