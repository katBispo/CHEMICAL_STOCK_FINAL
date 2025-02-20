package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.ReagenteUsadoProcedimento;
import com.laboratorio.labanalise.repositories.ReagenteUsadoProcedimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReagenteUsadoProcedimentoService {
    @Autowired
    private ReagenteUsadoProcedimentoRepository repository;

    @Autowired
    private ReagenteService reagenteService;

    public List<ReagenteUsadoProcedimento> findAll() {
        return repository.findAll();
    }
    public ReagenteUsadoProcedimento findById(Long id) {
        ReagenteUsadoProcedimento reagenteUsadoProcedimento = repository.findById(id).get();
        return reagenteUsadoProcedimento;
    }

    //todo
    public ReagenteUsadoProcedimento cadastrar(ReagenteUsadoProcedimento reagenteUsadoProcedimento) {
       return repository.save(reagenteUsadoProcedimento);
    }




}
