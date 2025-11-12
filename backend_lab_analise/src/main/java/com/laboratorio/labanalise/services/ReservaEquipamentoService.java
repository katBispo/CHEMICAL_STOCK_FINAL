package com.laboratorio.labanalise.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.laboratorio.labanalise.model.ReservaEquipamento;
import com.laboratorio.labanalise.repositories.ReservaEquipamentoRepository;

@Service
public class ReservaEquipamentoService {

    @Autowired
    private ReservaEquipamentoRepository repository;

    public List<ReservaEquipamento> findAll() {
        return repository.findAll();
    }

    public ReservaEquipamento findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public ReservaEquipamento save(ReservaEquipamento reserva) {
        return repository.save(reserva);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
