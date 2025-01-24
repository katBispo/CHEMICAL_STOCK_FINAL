package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.repositories.ProcedimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcedimentoService {

    @Autowired
    public ProcedimentoRepository repository;

    public Procedimento salvar(Procedimento procedimento) {
        return repository.save(procedimento);
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public Procedimento buscarPorId(Long id) {
        return repository.findById(id).orElse(null); 
    }

    public Procedimento buscarPorNome(String nomeProcedimento) {
        return repository.findByNomeProcedimento(nomeProcedimento);
    }

    public List<Procedimento> buscarTodos() {
        return repository.findAll();
    }
}
