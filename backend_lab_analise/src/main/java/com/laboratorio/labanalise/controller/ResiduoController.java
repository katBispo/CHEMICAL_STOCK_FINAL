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

import com.laboratorio.labanalise.DTO.ResiduoDTO;
import com.laboratorio.labanalise.services.ResiduoService;
@RestController
@RequestMapping("/residuos")
@CrossOrigin(origins = "*")
public class ResiduoController {

    private final ResiduoService residuoService;

    public ResiduoController(ResiduoService residuoService) {
        this.residuoService = residuoService;
    }

    // 🔹 LISTAR TODOS
    @GetMapping
    public ResponseEntity<List<ResiduoDTO>> listarTodos() {
        return ResponseEntity.ok(residuoService.listarTodosDTO());
    }

    // 🔹 BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<ResiduoDTO> buscarPorId(@PathVariable Long id) {
        return residuoService.buscarDTOPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 SALVAR
    @PostMapping
    public ResponseEntity<ResiduoDTO> salvar(@RequestBody ResiduoDTO dto) {
        ResiduoDTO salvo = residuoService.salvarDTO(dto);
        return ResponseEntity.ok(salvo);
    }

    // 🔹 ATUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<ResiduoDTO> atualizar(
            @PathVariable Long id,
            @RequestBody ResiduoDTO dto) {

        return residuoService.atualizarDTO(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 DELETAR
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        residuoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
