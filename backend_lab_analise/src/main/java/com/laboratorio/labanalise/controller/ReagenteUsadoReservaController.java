package com.laboratorio.labanalise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.laboratorio.labanalise.model.ReagenteUsadoReserva;
import com.laboratorio.labanalise.services.ReagenteUsadoReservaService;

import java.util.List;

@RestController
@RequestMapping("/reagente-usado-reserva")
@CrossOrigin(origins = "http://localhost:3000")
public class ReagenteUsadoReservaController {

    @Autowired
    private ReagenteUsadoReservaService service;

    @GetMapping
    public List<ReagenteUsadoReserva> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ReagenteUsadoReserva getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ReagenteUsadoReserva save(@RequestBody ReagenteUsadoReserva entity) {
        return service.save(entity);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
