package com.laboratorio.labanalise.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laboratorio.labanalise.model.Residuo;
import com.laboratorio.labanalise.services.ResiduoService;

@RestController
@RequestMapping("/residuos")
@CrossOrigin(origins = "*")
public class ResiduoController {

    private final ResiduoService residuoService;

    public ResiduoController(ResiduoService residuoService) {
        this.residuoService = residuoService;
    }

    @GetMapping
    public ResponseEntity<List<Residuo>> listarTodos() {
        return ResponseEntity.ok(residuoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Residuo> buscarPorId(@PathVariable Long id) {
        return residuoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Residuo> salvar(@RequestBody Residuo residuo) {
        return ResponseEntity.ok(residuoService.salvar(residuo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Residuo> atualizar(@PathVariable Long id, @RequestBody Residuo residuoAtualizado) {
        return residuoService.buscarPorId(id)
                .map(residuo -> {
                    residuoAtualizado.setId(id);
                    return ResponseEntity.ok(residuoService.salvar(residuoAtualizado));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        residuoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
