package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.model.enums.UnidadeReagente;
import com.laboratorio.labanalise.services.ReagenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "/reagente")
public class ReagenteController {

    @Autowired
    private ReagenteService service;

    @PostMapping
    public ResponseEntity<Reagente> salvarReagente(@RequestBody Reagente reagente) {
        reagente = service.salvar(reagente);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(reagente.getId()).toUri();
        return ResponseEntity.created(uri).body(reagente);
    }

    @GetMapping
    public ResponseEntity<List<Reagente>> listarReagente() {
        List<Reagente> reagentes = service.buscarTodos();
        return ResponseEntity.ok().body(reagentes);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deletarReagente(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }

    // Novo endpoint para obter os tipos de reagentes
    @GetMapping("/tipos")
    public ResponseEntity<TipoReagente[]> getTiposReagente() {
        TipoReagente[] tipos = TipoReagente.values();
        return ResponseEntity.ok().body(tipos);
    }

     // Novo endpoint para listar unidades de medida dos reagentes
    @GetMapping("/unidades")
    public ResponseEntity<List<String>> listarUnidadesReagente() {
        List<String> unidades = Arrays.stream(UnidadeReagente.values())
                                      .map(Enum::name)
                                      .toList();
        return ResponseEntity.ok().body(unidades);
    }
}
