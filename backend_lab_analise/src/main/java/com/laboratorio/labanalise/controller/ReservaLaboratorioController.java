package com.laboratorio.labanalise.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laboratorio.labanalise.model.ReservaLaboratorio;
import com.laboratorio.labanalise.model.enums.NaturezaProjeto;
import com.laboratorio.labanalise.model.enums.StatusReserva;
import com.laboratorio.labanalise.services.EmailService;
import com.laboratorio.labanalise.services.ReservaLaboratorioService;

@RestController
@RequestMapping("/reserva-laboratorio")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservaLaboratorioController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private ReservaLaboratorioService service;

    // Email do administrador definido no application.properties
    @Value("${app.email.admin}")
    private String emailAdmin;

    @GetMapping
    public List<ReservaLaboratorio> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ReservaLaboratorio getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ReservaLaboratorio save(@RequestBody ReservaLaboratorio reserva) {
        reserva.setStatus(StatusReserva.ANALISE);

        ReservaLaboratorio salva = service.save(reserva);

        emailService.enviarEmailNovaReserva(emailAdmin, salva);

        return salva;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PutMapping("/{id}/aprovar")
    public ReservaLaboratorio aprovarReserva(@PathVariable Long id) {
        ReservaLaboratorio reserva = service.findById(id);
        if (reserva != null) {
            reserva.setStatus(StatusReserva.APROVADA);
            ReservaLaboratorio salva = service.save(reserva);

            // envia e-mail ao solicitante
            emailService.enviarEmailReservaAprovada(salva);

            return salva;
        }
        throw new RuntimeException("Reserva não encontrada");
    }

    @PutMapping("/{id}/negar")
    public ReservaLaboratorio negarReserva(@PathVariable Long id) {
        ReservaLaboratorio reserva = service.findById(id);
        if (reserva != null) {
            reserva.setStatus(StatusReserva.NEGADA);
            ReservaLaboratorio salva = service.save(reserva);

            // envia e-mail ao solicitante
            emailService.enviarEmailReservaNegada(salva);

            return salva;
        }
        throw new RuntimeException("Reserva não encontrada");
    }

    @GetMapping("/naturezas-projeto")
    public NaturezaProjeto[] listarNaturezasProjeto() {
        return NaturezaProjeto.values();
    }

}
