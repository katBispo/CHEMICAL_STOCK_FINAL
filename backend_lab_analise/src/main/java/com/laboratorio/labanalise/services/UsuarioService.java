package com.laboratorio.labanalise.services;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.repositories.*;
import com.laboratorio.labanalise.model.*;
import org.springframework.stereotype.Service;
import com.laboratorio.labanalise.DTO.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // LISTAR TODOS
    public List<UsuarioDTO> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // BUSCAR POR ID
    public Optional<UsuarioDTO> buscarPorId(Long id) {
        return usuarioRepository.findById(id).map(this::toDTO);
    }

    // CRIAR USUÁRIO
    public UsuarioDTO salvar(UsuarioCreateDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setCpf(dto.getCpf());
        usuario.setEmail(dto.getEmail());
        usuario.setCrq(dto.getCrq());
        usuario.setDataAdmissao(dto.getDataAdmissao());
        usuario.setCargo(dto.getCargo());
        usuario.setSenha(passwordEncoder.encode(dto.getSenha())); // 🔒 Criptografa senha

        return toDTO(usuarioRepository.save(usuario));
    }

    // ATUALIZAR USUÁRIO
    public UsuarioDTO atualizar(Long id, UsuarioCreateDTO dto) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNome(dto.getNome());
            usuario.setCpf(dto.getCpf());
            usuario.setEmail(dto.getEmail());
            usuario.setCrq(dto.getCrq());
            usuario.setDataAdmissao(dto.getDataAdmissao());
            usuario.setCargo(dto.getCargo());

            // Se veio uma senha nova, criptografa e atualiza
            if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
                usuario.setSenha(passwordEncoder.encode(dto.getSenha()));
            }

            return toDTO(usuarioRepository.save(usuario));
        }).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    // DELETAR USUÁRIO
    public void deletar(Long id) {
        usuarioRepository.deleteById(id);
    }

    // CONVERSÃO ENTITY -> DTO
    private UsuarioDTO toDTO(Usuario usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getCpf(),
                usuario.getEmail(),
                usuario.getCrq(),
                usuario.getDataAdmissao(),
                usuario.getCargo()
        );
    }
}