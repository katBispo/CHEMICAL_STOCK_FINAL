package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.ReagenteUsado;
import com.laboratorio.labanalise.repositories.ReagenteUsadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReagenteUsadoService {

    @Autowired
    public ReagenteUsadoRepository repository;

    public ReagenteUsado salvar(ReagenteUsado reagenteUsado) {
        return repository.save(reagenteUsado);
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public ReagenteUsado buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<ReagenteUsado> buscarTodos() {
        return repository.findAll();
    }
}
