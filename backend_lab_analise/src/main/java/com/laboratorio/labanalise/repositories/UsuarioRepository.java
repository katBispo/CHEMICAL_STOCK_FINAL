package com.laboratorio.labanalise.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.laboratorio.labanalise.model.*;
import java.util.Optional;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByCpf(String cpf);
}