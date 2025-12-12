package com.laboratorio.labanalise.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.laboratorio.labanalise.model.ReservaLaboratorio;
import com.laboratorio.labanalise.model.enums.StatusReserva;
import com.laboratorio.labanalise.repositories.ReservaLaboratorioRepository;

@Service
public class ReservaLaboratorioService {

    @Autowired
    private ReservaLaboratorioRepository repository;
    
    @Autowired
    private EmailService emailService;

    public List<ReservaLaboratorio> findAll() {
        return repository.findAll();
    }

    public ReservaLaboratorio findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public ReservaLaboratorio save(ReservaLaboratorio reserva) {
        return repository.save(reserva);
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    // ---- APROVAR RESERVA ----
    public ReservaLaboratorio aprovarReserva(Long id) {
        ReservaLaboratorio reserva = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));

        reserva.setStatus(StatusReserva.APROVADA);
        repository.save(reserva);

        emailService.enviarEmailReservaAprovada(reserva);

        return reserva;
    }

    // ---- NEGAR RESERVA ----
    public ReservaLaboratorio negarReserva(Long id) {
        ReservaLaboratorio reserva = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));

        reserva.setStatus(StatusReserva.NEGADA);
        repository.save(reserva);

        emailService.enviarEmailReservaNegada(reserva);

        return reserva;
    }
}
