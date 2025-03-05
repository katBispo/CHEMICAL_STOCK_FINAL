package com.laboratorio.labanalise.controller;


import com.laboratorio.labanalise.DTO.Response.LoginResponseDTO;
import com.laboratorio.labanalise.DTO.request.LoginRequestDTO;
import com.laboratorio.labanalise.config.security.TokenService;
import com.laboratorio.labanalise.model.Usuario;
import com.laboratorio.labanalise.DTO.request.RegistroUsuarioRequest;
import com.laboratorio.labanalise.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AutenticacaoController {

    @Autowired
    private TokenService tokenService;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Validated LoginRequestDTO usuario) {
        var usuarioSenha = new UsernamePasswordAuthenticationToken(usuario.getEmail(), usuario.getSenha());
        var autenticao = authenticationManager.authenticate(usuarioSenha);
        var token = tokenService.generateToken((Usuario) autenticao.getPrincipal());
        return ResponseEntity.ok().body(new LoginResponseDTO(token));
    }

    @PostMapping("/registrar")
    public ResponseEntity register(@RequestBody @Validated RegistroUsuarioRequest registroUsuario) {
        if (usuarioService.findUserByEmail(registroUsuario.getEmail()) != null) {
            return ResponseEntity.badRequest().build();
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(registroUsuario.getSenha());
        Usuario novoUsuario = new Usuario(registroUsuario.getNome(),registroUsuario.getEmail(),encryptedPassword,registroUsuario.getCRQ(),registroUsuario.getCPF(),registroUsuario.getRole());
        usuarioService.salvarUsuario(novoUsuario);
        return ResponseEntity.ok().build();
    }



}
