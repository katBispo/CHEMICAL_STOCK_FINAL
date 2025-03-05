package com.laboratorio.labanalise.services;


import com.laboratorio.labanalise.model.Usuario;
import com.laboratorio.labanalise.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService   {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UserDetails findUserByEmail(String email) {
        return usuarioRepository.findUserByEmail(email);
    }

    public Usuario salvarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
}
