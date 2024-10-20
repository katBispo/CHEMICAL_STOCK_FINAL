package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Matriz;
import com.laboratorio.labanalise.repositories.MatrizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatrizService {

    @Autowired
    public MatrizRepository repository;

    public Matriz salvar(Matriz matriz) {
        return repository.save(matriz);
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public Matriz buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Matriz> buscarTodos() {
        return repository.findAll();
    }


}
