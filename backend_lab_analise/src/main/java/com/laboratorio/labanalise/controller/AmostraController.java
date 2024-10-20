package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.services.AmostraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path="/amostra")
public class AmostraController {

    @Autowired
    private AmostraService service;

    @PostMapping
    public ResponseEntity<Amostra> salvarAmostra(@RequestBody Amostra amostra) {
        amostra = service.salvar(amostra);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand(amostra.getId()).toUri();
        return ResponseEntity.created(uri).body(amostra);
    }

    @GetMapping
    public ResponseEntity<List<Amostra>> listarAmostra() {
        List<Amostra> amostras = service.buscarTodos();
        return ResponseEntity.ok().body(amostras);
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<Amostra> deletarAmostra(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }


}
