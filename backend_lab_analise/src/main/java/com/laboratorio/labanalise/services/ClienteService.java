package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Cliente;
import com.laboratorio.labanalise.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    public ClienteRepository repository;

    public Cliente salvar(Cliente cliente) {
        return repository.save(cliente);
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public Cliente buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Cliente> buscarTodos() {
        return repository.findAll();
    }
}
