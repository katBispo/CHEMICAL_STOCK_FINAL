package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.services.*;
import com.laboratorio.labanalise.model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.laboratorio.labanalise.config.*;
import com.laboratorio.labanalise.DTO.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;
import org.springframework.http.HttpStatus;


import java.util.List;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000") 
public class AuthController {

    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UsuarioService usuarioService, PasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        Optional<Usuario> userOpt = usuarioService.buscarPorEmail(loginDTO.getEmail());
        if (userOpt.isEmpty())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos");

        Usuario user = userOpt.get();
        if (!passwordEncoder.matches(loginDTO.getSenha(), user.getSenha()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos");

        // Gerar token JWT
        String token = JWTUtil.gerarToken(user); // você vai criar essa classe JWTUtil

        return ResponseEntity.ok(new LoginResponseDTO(user.getNome(), user.getEmail(), token));
    }
}
