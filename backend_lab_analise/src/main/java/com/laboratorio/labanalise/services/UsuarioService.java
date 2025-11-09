package com.laboratorio.labanalise.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.DTO.UsuarioCreateDTO;
import com.laboratorio.labanalise.DTO.UsuarioDTO;
import com.laboratorio.labanalise.model.Usuario;
import com.laboratorio.labanalise.model.enums.StatusUsuario;
import com.laboratorio.labanalise.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
            EmailService emailService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
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

    // BUSCAR POR EMAIL
    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    // CRIAR USUÁRIO (status PENDENTE)
    public UsuarioDTO salvar(UsuarioCreateDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setCpf(dto.getCpf());
        usuario.setEmail(dto.getEmail());
        usuario.setCrq(dto.getCrq());
        usuario.setDataAdmissao(dto.getDataAdmissao());
        usuario.setCargo(dto.getCargo());
        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));
        usuario.setStatus(StatusUsuario.PENDENTE);

        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        // gerando link de aprovação
        String linkAprovacao = "http://localhost:8080/usuarios/aprovar/" + usuarioSalvo.getId();

        // envio de email pra adm
        emailService.enviarEmailAprovacao("katerinybispo06@gmail.com", usuarioSalvo);

        return toDTO(usuarioSalvo);
    }

    // ATUALIZAR USUARIO
    public UsuarioDTO atualizar(Long id, UsuarioCreateDTO dto) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNome(dto.getNome());
            usuario.setCpf(dto.getCpf());
            usuario.setEmail(dto.getEmail());
            usuario.setCrq(dto.getCrq());
            usuario.setDataAdmissao(dto.getDataAdmissao());
            usuario.setCargo(dto.getCargo());

            if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
                usuario.setSenha(passwordEncoder.encode(dto.getSenha()));
            }

            return toDTO(usuarioRepository.save(usuario));
        }).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    // APROVAR USUÁRIO (método novo)
    public UsuarioDTO aprovarUsuario(Long id) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setStatus(StatusUsuario.ATIVO);
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
                usuario.getCargo(),
                usuario.getStatus() // Inclui status no DTO
        );
    }

    // Adicione no UsuarioService
    public UsuarioDTO converterParaDTO(Usuario usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getCpf(),
                usuario.getEmail(),
                usuario.getCrq(),
                usuario.getDataAdmissao(),
                usuario.getCargo(),
                usuario.getStatus()
        );
    }

   

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
}
