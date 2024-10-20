package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Contrato;
import com.laboratorio.labanalise.repositories.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContratoService {

    @Autowired
    public ContratoRepository repository;

    public Contrato salvar(Contrato contrato) {
        return repository.save(contrato);
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public Contrato buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Contrato> buscarTodos() {
        return repository.findAll();
    }
}
