package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Cliente;
import com.laboratorio.labanalise.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path="/cliente")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @PostMapping
    public ResponseEntity<Cliente> salvarCliente(@RequestBody Cliente cliente) {
        cliente = service.salvar(cliente);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand(cliente.getId()).toUri();
        return ResponseEntity.created(uri).body(cliente);
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> listarCliente() {
        List<Cliente> clientes = service.buscarTodos();
        return ResponseEntity.ok().body(clientes);
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<Cliente> deletarCliente(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }

}
