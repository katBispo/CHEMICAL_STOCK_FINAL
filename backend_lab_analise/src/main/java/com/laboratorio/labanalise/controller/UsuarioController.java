package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.services.*;
import com.laboratorio.labanalise.model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.laboratorio.labanalise.DTO.*;

import java.util.List;


@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // LISTAR TODOS
    @GetMapping
    public List<UsuarioDTO> listarTodos() {
        return usuarioService.listarTodos();
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CRIAR USUÁRIO
    @PostMapping
    public ResponseEntity<UsuarioDTO> criar(@RequestBody UsuarioCreateDTO usuarioDTO) {
        UsuarioDTO novoUsuario = usuarioService.salvar(usuarioDTO);
        return ResponseEntity.ok(novoUsuario);
    }

    // ATUALIZAR USUÁRIO
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> atualizar(@PathVariable Long id, @RequestBody UsuarioCreateDTO usuarioDTO) {
        try {
            UsuarioDTO usuarioAtualizado = usuarioService.atualizar(id, usuarioDTO);
            return ResponseEntity.ok(usuarioAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETAR USUÁRIO
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}