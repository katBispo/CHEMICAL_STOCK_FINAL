package com.laboratorio.labanalise.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laboratorio.labanalise.DTO.FrascoReagenteDTO;
import com.laboratorio.labanalise.model.FrascoReagente;
import com.laboratorio.labanalise.services.FrascoReagenteService;

@RestController
@RequestMapping("/frascos")
public class FrascoReagenteController {

    private final FrascoReagenteService service;

    public FrascoReagenteController(FrascoReagenteService service) {
        this.service = service;
    }

    @GetMapping
    public List<FrascoReagenteDTO> listar() {
        return service.listarTodos()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private FrascoReagenteDTO toDTO(FrascoReagente frasco) {
        FrascoReagenteDTO dto = new FrascoReagenteDTO();
        dto.setId(frasco.getId());
        dto.setReagenteId(frasco.getReagente().getId());
        dto.setNomeReagente(frasco.getReagente().getNome());
        dto.setCapacidadeMaxima(frasco.getCapacidadeMaxima());
        dto.setQuantidadeAtual(frasco.getQuantidadeAtual());
        dto.setStatus(frasco.getStatus());
        dto.setDataValidade(frasco.getDataValidade());
        return dto;
    }

    @GetMapping("/total")
    public ResponseEntity<Long> totalFrascosDisponiveis() {
        return ResponseEntity.ok(service.obterTotalDeFrascos());
    }
}
