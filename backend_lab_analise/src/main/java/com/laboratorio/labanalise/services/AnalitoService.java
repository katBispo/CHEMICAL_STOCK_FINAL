package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Analito;
import com.laboratorio.labanalise.repositories.AnalitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalitoService {

    @Autowired
    private AnalitoRepository repository;

    public Analito salvar(Analito analito) {
        return repository.save(analito);
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public Analito buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Analito> buscarTodos() {
        return repository.findAll();
    }

    // Métodos para buscar classificações, tipos e subtipos
    public List<String> buscarClassificacoesDistintas() {
        return repository.findDistinctClassificacoes();
    }

    public List<String> buscarTiposDistintos() {
        return repository.findDistinctTipos();
    }

    public List<String> buscarSubtiposDistintos() {
        return repository.findDistinctSubtipos();
    }
}
