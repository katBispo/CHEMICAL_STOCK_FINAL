package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Contrato;
import com.laboratorio.labanalise.model.Cliente;
import com.laboratorio.labanalise.services.ContratoService;
import com.laboratorio.labanalise.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path="/contrato")
public class ContratoController {

    @Autowired
    private ContratoService service;

    @Autowired
    private ClienteService clienteService;  // Para buscar o cliente por ID

    @PostMapping
    public ResponseEntity<?> salvarContrato(@RequestBody Contrato contrato) {
        // Verificação do cliente associado ao contrato
        if (contrato.getCliente() != null && contrato.getCliente().getId() != null) {
            Cliente cliente = clienteService.buscarPorId(contrato.getCliente().getId());
            if (cliente == null) {
                // Retorna a mensagem de erro como String
                return ResponseEntity.badRequest().body("Cliente não encontrado.");
            }
            contrato.setCliente(cliente);  // Associa o cliente ao contrato
        } else {
            // Retorna a mensagem de erro como String
            return ResponseEntity.badRequest().body("Cliente é obrigatório.");
        }
    
        // Salvar o contrato
        contrato = service.salvar(contrato);
    
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand(contrato.getId()).toUri();
        return ResponseEntity.created(uri).body(contrato);
    }
    
    @GetMapping
    public ResponseEntity<List<Contrato>> listarContrato() {
        List<Contrato> contratos = service.buscarTodos();
        return ResponseEntity.ok().body(contratos);
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<Contrato> deletarContrato(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}
