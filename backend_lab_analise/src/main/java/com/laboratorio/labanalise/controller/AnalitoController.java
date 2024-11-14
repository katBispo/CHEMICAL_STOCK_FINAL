package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Analito;
import com.laboratorio.labanalise.DTO.TipoAnalitoDto; // Certifique-se de que você tenha esse DTO criado
import com.laboratorio.labanalise.services.AnalitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.HttpStatus;


import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/analito")
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

    // Novo endpoint para buscar classificações, tipos e subtipos
    @GetMapping("/classificacoes")
    public ResponseEntity<List<String>> listarClassificacoes() {
        List<String> classificacoes = service.buscarClassificacoesDistintas();
        return ResponseEntity.ok(classificacoes);
    }

    @GetMapping("/tipos")
    public ResponseEntity<List<String>> listarTipos() {
        List<String> tipos = service.buscarTiposDistintos();
        return ResponseEntity.ok(tipos);
    }

    @GetMapping("/subtipos")
    public ResponseEntity<List<String>> listarSubtipos() {
        List<String> subtipos = service.buscarSubtiposDistintos();
        return ResponseEntity.ok(subtipos);
    }
    @GetMapping("/buscar-id")
public ResponseEntity<Long> buscarIdPorNome(@RequestParam String classificacao) {
    Long id = service.buscarIdPorNome(classificacao);
    if (id != null) {
        return ResponseEntity.ok(id);
    } else {
        return ResponseEntity.notFound().build();
    }
}


    // Novo endpoint para adicionar tipoAnalito
    @PostMapping("/{classificacaoId}/adicionar")
    public ResponseEntity<Void> adicionarTipoAnalito(
            @PathVariable Long classificacaoId,
            @RequestBody TipoAnalitoDto tipoAnalitoDto) {
        try {
            service.adicionarTipoAnalito(classificacaoId, tipoAnalitoDto);
            return ResponseEntity.ok().build(); // Retorna 200 OK
        } catch (Exception e) {
            e.printStackTrace(); // Log de erro no servidor
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Retorna 500 em caso de erro
        }
    }
}