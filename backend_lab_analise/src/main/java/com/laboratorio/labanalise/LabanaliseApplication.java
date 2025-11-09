package com.laboratorio.labanalise;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.laboratorio.labanalise.model.Usuario;
import com.laboratorio.labanalise.model.enums.Cargo;
import com.laboratorio.labanalise.model.enums.StatusUsuario;
import com.laboratorio.labanalise.repositories.UsuarioRepository;
import com.laboratorio.labanalise.services.UsuarioService;

@SpringBootApplication
@EnableAspectJAutoProxy

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

    @Bean
    public CommandLineRunner initDatabase(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (usuarioRepository.findByEmail("admin@lab.com").isEmpty()) {
                Usuario admin = new Usuario();
                admin.setNome("Administrador do Sistema");
                admin.setCpf("00000000000");
                admin.setEmail("admin@lab.com");
                admin.setCrq("CRQ123");
                admin.setDataAdmissao(LocalDate.now());
                admin.setCargo(Cargo.PESQUISADOR);
                admin.setSenha(passwordEncoder.encode("123456"));
                admin.setStatus(StatusUsuario.ATIVO);
                usuarioRepository.save(admin);
                System.out.println("✅ Usuário administrador criado com sucesso!");
            } else {
                System.out.println("ℹ️ Usuário admin já existe, não foi recriado.");
            }
        };
    }
}