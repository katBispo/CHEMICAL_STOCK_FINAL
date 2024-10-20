package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.repositories.AmostraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AmostraService {

    @Autowired
    public AmostraRepository repository;

    public Amostra salvar(Amostra amostra) {
        return repository.save(amostra);
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public Amostra buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Amostra> buscarTodos() {
        return repository.findAll();
    }
}
