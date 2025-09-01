package com.laboratorio.labanalise;

import com.laboratorio.labanalise.model.Usuario;
import com.laboratorio.labanalise.services.UsuarioService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootApplication
public class LabanaliseApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(LabanaliseApplication.class, args);

        // Obtendo beans do contexto
        UsuarioService usuarioService = context.getBean(UsuarioService.class);
        PasswordEncoder passwordEncoder = context.getBean(PasswordEncoder.class);

        // Buscar usuário pelo email
        Optional<Usuario> userOpt = usuarioService.buscarPorEmail("kateriny@example.com");
        if (userOpt.isPresent()) {
            Usuario user = userOpt.get();
            System.out.println("Senha armazenada: " + user.getSenha());

            // Verificar se a senha "123" bate com o hash
            boolean matches = passwordEncoder.matches("123", user.getSenha());
            System.out.println("Senha correta? " + matches);
        } else {
            System.out.println("Usuário não encontrado");
        }
    }
}
