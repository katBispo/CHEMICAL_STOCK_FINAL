package com.laboratorio.labanalise.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.laboratorio.labanalise.model.ReagenteUsadoReserva;
import com.laboratorio.labanalise.repositories.ReagenteUsadoReservaRepository;

import java.util.List;

@Service
public class ReagenteUsadoReservaService {

    @Autowired
    private ReagenteUsadoReservaRepository repository;

    public List<ReagenteUsadoReserva> findAll() {
        return repository.findAll();
    }

    public ReagenteUsadoReserva findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public ReagenteUsadoReserva save(ReagenteUsadoReserva entity) {
        // Aqui você pode chamar o ReagenteService para descontar estoque
        return repository.save(entity);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
