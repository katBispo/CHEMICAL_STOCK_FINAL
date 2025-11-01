package com.laboratorio.labanalise.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laboratorio.labanalise.DTO.EquipamentoDTO;
import com.laboratorio.labanalise.services.EquipamentoService;

@RestController
@RequestMapping("/equipamentos")
public class EquipamentoController {

    private final EquipamentoService equipamentoService;

    public EquipamentoController(EquipamentoService equipamentoService) {
        this.equipamentoService = equipamentoService;
    }

    @PostMapping
    public ResponseEntity<EquipamentoDTO> criarEquipamento(@RequestBody EquipamentoDTO dto) {
        EquipamentoDTO criado = equipamentoService.salvarEquipamento(dto);
        return ResponseEntity.status(201).body(criado);
    }

    @GetMapping
    public ResponseEntity<List<EquipamentoDTO>> listarEquipamentos() {
        return ResponseEntity.ok(equipamentoService.listarEquipamentos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipamentoDTO> buscarEquipamento(@PathVariable Long id) {
        return equipamentoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EquipamentoDTO> atualizarEquipamento(@PathVariable Long id, @RequestBody EquipamentoDTO dto) {
        EquipamentoDTO atualizado = equipamentoService.atualizarEquipamento(id, dto);
        if (atualizado == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEquipamento(@PathVariable Long id) {
        equipamentoService.deletarEquipamento(id);
        return ResponseEntity.noContent().build();
    }
}