package com.laboratorio.labanalise;

import com.laboratorio.labanalise.DTO.UsuarioCreateDTO;
import com.laboratorio.labanalise.DTO.UsuarioDTO;
import com.laboratorio.labanalise.model.*;
import com.laboratorio.labanalise.model.enums.*;
import com.laboratorio.labanalise.repositories.*;
import com.laboratorio.labanalise.services.*;
import java.time.LocalDate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class LabanaliseApplication {
	public LabanaliseApplication() {
	}

	public static void main(String[] args) {
		System.out.println("hello");
		ConfigurableApplicationContext context = SpringApplication.run(LabanaliseApplication.class, args);

		// Pega o service e o encoder do contexto
        UsuarioService usuarioService = context.getBean(UsuarioService.class);
        PasswordEncoder passwordEncoder = context.getBean(PasswordEncoder.class);

        // Cria o DTO do usuário
        UsuarioCreateDTO usuario = new UsuarioCreateDTO();
        usuario.setNome("Kateriny Bispo");
        usuario.setCpf("12345678900"); // sem máscara
        usuario.setEmail("kateriny@example.com");
        usuario.setCrq("CRQ-12345");
        usuario.setDataAdmissao(LocalDate.of(2025, 9, 1));
        usuario.setCargo(Cargo.PESQUISADOR);

        // Criptografa a senha
        usuario.setSenha(passwordEncoder.encode("123")); 

        // Salva o usuário
        UsuarioDTO usuarioSalvo = usuarioService.salvar(usuario);

        System.out.println("Usuário inserido: " + usuarioSalvo.getNome() + " - " + usuarioSalvo.getEmail());
        System.out.println("Agora você já consegue logar com esse usuário e a senha: 123");
    
		
	}
}