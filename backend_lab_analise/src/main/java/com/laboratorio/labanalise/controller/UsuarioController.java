package com.laboratorio.labanalise.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laboratorio.labanalise.DTO.UsuarioCreateDTO;
import com.laboratorio.labanalise.DTO.UsuarioDTO;
import com.laboratorio.labanalise.model.Usuario;
import com.laboratorio.labanalise.model.enums.Role;
import com.laboratorio.labanalise.model.enums.StatusUsuario;
import com.laboratorio.labanalise.repositories.UsuarioRepository;
import com.laboratorio.labanalise.services.UsuarioService;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:3000") // se usa React, mantenha isso
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioService usuarioService, UsuarioRepository usuarioRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
    }

    // ✅ LISTAR TODOS
    @GetMapping
    public List<UsuarioDTO> listarTodos() {
        return usuarioService.listarTodos();
    }

    // ✅ BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ CRIAR USUÁRIO
    @PostMapping
    public ResponseEntity<UsuarioDTO> criar(@RequestBody UsuarioCreateDTO usuarioDTO) {
        UsuarioDTO novoUsuario = usuarioService.salvar(usuarioDTO);
        return ResponseEntity.ok(novoUsuario);
    }

    // ✅ ATUALIZAR USUÁRIO
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> atualizar(@PathVariable Long id, @RequestBody UsuarioCreateDTO usuarioDTO) {
        try {
            UsuarioDTO usuarioAtualizado = usuarioService.atualizar(id, usuarioDTO);
            return ResponseEntity.ok(usuarioAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ DELETAR USUÁRIO
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ APROVAR USUÁRIO
    @PutMapping("/aprovar/{id}")
    public ResponseEntity<String> aprovarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setStatus(StatusUsuario.ATIVO);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Usuário aprovado com sucesso!");
    }

    // ✅ NEGAR USUÁRIO
    @PutMapping("/negar/{id}")
    public ResponseEntity<String> negarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setStatus(StatusUsuario.REJEITADO);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Usuário negado com sucesso!");
    }

    // ✅ BUSCAR USUÁRIO PENDENTE
    @GetMapping("/pendentes/{id}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPendente(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .filter(u -> u.getStatus() == StatusUsuario.PENDENTE)
                .map(u -> ResponseEntity.ok(usuarioService.converterParaDTO(u)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // ✅ PEGAR USUÁRIO LOGADO
    @GetMapping("/me")
    public UsuarioDTO getUsuarioLogado() {
        String email = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

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

    // 🔒 Apenas ADMIN pode promover usuários
    @PutMapping("/{id}/promover")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> promoverUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setRole(Role.ADMIN);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Usuário promovido a ADMIN com sucesso!");
    }

    // 🔒 Apenas ADMIN pode rebaixar usuários
    @PutMapping("/{id}/rebaixar")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> rebaixarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setRole(Role.USER);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Usuário rebaixado para USER com sucesso!");
    }
}
