package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.repositories.ReagenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReagenteService {

    @Autowired
    public ReagenteRepository repository;

    public Reagente salvar(Reagente reagente) {
        return repository.save(reagente);
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public Reagente buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Reagente> buscarTodos() {
        return repository.findAll();
    }
}
