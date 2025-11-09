package com.laboratorio.labanalise.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.laboratorio.labanalise.model.ReservaEquipamento;
import com.laboratorio.labanalise.repositories.ReservaEquipamentoRepository;

import java.util.List;

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
        // Aqui você pode salvar a reserva e depois salvar os reagentes usados via ReagenteUsadoReservaService
        return repository.save(reserva);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
