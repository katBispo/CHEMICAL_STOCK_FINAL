package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.services.*;
import com.laboratorio.labanalise.model.*;
import com.laboratorio.labanalise.model.enums.StatusUsuario;
import com.laboratorio.labanalise.repositories.UsuarioRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.laboratorio.labanalise.DTO.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioService usuarioService, UsuarioRepository usuarioRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
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

    // Aprovar usuário pelo ID
    @PutMapping("/aprovar/{id}")
    public ResponseEntity<String> aprovarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setStatus(StatusUsuario.ATIVO);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Usuário aprovado com sucesso!");
    }

    // Negar usuário pelo ID
    @PutMapping("/negar/{id}")
    public ResponseEntity<String> negarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setStatus(StatusUsuario.REJEITADO); // ou outro status
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Usuário negado com sucesso!");
    }

    // Busca usuário pendente pelo ID
    @GetMapping("/pendentes/{id}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPendente(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .filter(u -> u.getStatus() == StatusUsuario.PENDENTE)
                .map(u -> ResponseEntity.ok(usuarioService.converterParaDTO(u)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/me")
    public UsuarioDTO getUsuarioLogado() {
        // Pega o e-mail do usuário autenticado diretamente do SecurityContext
        String email = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        // Busca o usuário pelo e-mail
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Retorna o DTO
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getCpf(),
                usuario.getEmail(),
                usuario.getCrq(),
                usuario.getDataAdmissao(),
                usuario.getCargo(),
                usuario.getStatus());
    }

}