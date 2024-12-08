package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Analito;
import com.laboratorio.labanalise.DTO.TipoAnalitoDto; // Certifique-se de que você tenha esse DTO criado
import com.laboratorio.labanalise.services.AnalitoService;
import com.laboratorio.labanalise.request.*;
import com.laboratorio.labanalise.repositories.AnalitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.HttpStatus;
import java.util.Optional;


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
    public ResponseEntity<Void> deletarAnalito(@PathVariable Long id) {
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
    public ResponseEntity<Long> buscarIdPorClassificacao(@RequestParam String classificacao) {
        Long id = service.buscarIdPorClassificacao(classificacao);
        if (id != null) {
            return ResponseEntity.ok(id);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    private final AnalitoRepository analitoRepository;

    public AnalitoController(AnalitoRepository analitoRepository) {
        this.analitoRepository = analitoRepository;
    }

    @PostMapping("/{id}/adicionar")
    public ResponseEntity<Analito> adicionarTipoEsubtipo(
            @PathVariable Long id,
            @RequestBody TipoESubtiposRequest request) {
        Optional<Analito> analitoOpt = analitoRepository.findById(id);
        if (analitoOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    
        Analito analito = analitoOpt.get();
        analito.adicionarTipo(request.getTipoAnalito(), request.getSubtipoAnalito());
        analitoRepository.save(analito); // Persistir as alterações no banco
    
        return ResponseEntity.ok(analito);
    }
    
}
