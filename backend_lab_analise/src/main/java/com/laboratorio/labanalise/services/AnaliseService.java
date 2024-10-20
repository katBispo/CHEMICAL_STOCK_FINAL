package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Analise;
import com.laboratorio.labanalise.repositories.AnaliseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnaliseService {

    @Autowired
    public AnaliseRepository repository;


    public Analise salvar(Analise analise) {
        return repository.save(analise);
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public Analise buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Analise> buscarTodos() {
        return repository.findAll();
    }
}
