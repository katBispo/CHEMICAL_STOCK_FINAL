package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Contrato;
import com.laboratorio.labanalise.services.ContratoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path="/contrato")
public class ContratoController {

    @Autowired
    private ContratoService service;

    @PostMapping
    public ResponseEntity<Contrato> salvarContrato(@RequestBody Contrato contrato) {
        contrato = service.salvar(contrato);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand(contrato.getId()).toUri();
        return ResponseEntity.created(uri).body(contrato);
    }

    @GetMapping
    public ResponseEntity<List<Contrato>> listarContrato() {
        List<Contrato> contratos = service.buscarTodos();
        return ResponseEntity.ok().body(contratos);
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<Contrato> deletarContrato(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }

}
