package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.model.Analito;
import com.laboratorio.labanalise.services.AmostraService;
import com.laboratorio.labanalise.services.AnalitoService; // Serviço para manipular Analitos
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping(path = "/amostra")
public class AmostraController {

    @Autowired
    private AmostraService service;

    @Autowired
    private AnalitoService analitoService;

    @PostMapping
    public ResponseEntity<Amostra> salvarAmostra(@RequestBody Amostra amostra) {
        if (amostra.getAnalitos() != null && !amostra.getAnalitos().isEmpty()) {
            List<Long> idsAnalitos = amostra.getAnalitos().stream()
                                            .map(Analito::getId)
                                            .collect(Collectors.toList());

            List<Analito> analitosAssociados = analitoService.buscarAnalitosPorIds(idsAnalitos);
            amostra.setAnalitos(analitosAssociados);
        }

        amostra = service.salvar(amostra);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                                             .path("/{id}")
                                             .buildAndExpand(amostra.getId())
                                             .toUri();
        return ResponseEntity.created(uri).body(amostra);
    }

    @GetMapping
    public ResponseEntity<List<Amostra>> listarAmostras() {
        List<Amostra> amostras = service.buscarTodos();
        return ResponseEntity.ok().body(amostras);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAmostra(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}
