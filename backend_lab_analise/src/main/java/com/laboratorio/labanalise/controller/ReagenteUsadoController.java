package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.ReagenteUsado;
import com.laboratorio.labanalise.services.ReagenteUsadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path="/reagenteusado")
public class ReagenteUsadoController {

    @Autowired
    private ReagenteUsadoService service;

    @PostMapping
    public ResponseEntity<ReagenteUsado> salvarReagenteUsado(@RequestBody ReagenteUsado reagenteUsado) {
        reagenteUsado = service.salvar(reagenteUsado);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand(reagenteUsado.getId()).toUri();
        return ResponseEntity.created(uri).body(reagenteUsado);
    }

    @GetMapping
    public ResponseEntity<List<ReagenteUsado>> listarReagenteUsado() {
        List<ReagenteUsado> reagenteUsados = service.buscarTodos();
        return ResponseEntity.ok().body(reagenteUsados);
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<ReagenteUsado> deletarReagenteUsado(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }

}
