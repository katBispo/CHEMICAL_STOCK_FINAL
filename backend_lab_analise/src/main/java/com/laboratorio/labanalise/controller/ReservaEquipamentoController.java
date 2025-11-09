package com.laboratorio.labanalise.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.laboratorio.labanalise.model.ReservaEquipamento;
import com.laboratorio.labanalise.services.EmailService;
import com.laboratorio.labanalise.services.ReservaEquipamentoService;
import com.laboratorio.labanalise.model.enums.StatusReserva;



import java.util.List;

@RestController
@RequestMapping("/reserva-equipamento")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservaEquipamentoController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private ReservaEquipamentoService service;

    // Email do administrador definido no application.properties
    @Value("${app.email.admin}")
    private String emailAdmin;

    @GetMapping
    public List<ReservaEquipamento> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ReservaEquipamento getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ReservaEquipamento save(@RequestBody ReservaEquipamento reserva) {
        // Define o status inicial como ANALISE
        reserva.setStatus(StatusReserva.ANALISE);

        // Salva a reserva
        ReservaEquipamento salva = service.save(reserva);

        // Envia email ao administrador
        emailService.enviarEmailNovaReserva(emailAdmin, salva);

        return salva;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PutMapping("/{id}/aprovar")
    public ReservaEquipamento aprovarReserva(@PathVariable Long id) {
        ReservaEquipamento reserva = service.findById(id);
        if (reserva != null) {
            reserva.setStatus(StatusReserva.APROVADA);
            ReservaEquipamento salva = service.save(reserva);

            // envia e-mail ao solicitante
            emailService.enviarEmailReservaAprovada(salva);

            return salva;
        }
        throw new RuntimeException("Reserva não encontrada");
    }

    @PutMapping("/{id}/negar")
    public ReservaEquipamento negarReserva(@PathVariable Long id) {
        ReservaEquipamento reserva = service.findById(id);
        if (reserva != null) {
            reserva.setStatus(StatusReserva.NEGADA);
            ReservaEquipamento salva = service.save(reserva);

            // envia e-mail ao solicitante
            emailService.enviarEmailReservaNegada(salva);

            return salva;
        }
        throw new RuntimeException("Reserva não encontrada");
    }
}
