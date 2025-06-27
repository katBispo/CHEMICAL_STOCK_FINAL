package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.DTO.AmostraDTO;
import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.model.Analise;
import com.laboratorio.labanalise.model.Analito;
import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.model.enums.StatusAmostra;
import com.laboratorio.labanalise.services.AmostraService;
import com.laboratorio.labanalise.services.AnaliseService;
import com.laboratorio.labanalise.services.ProcedimentoService;

import com.laboratorio.labanalise.services.AnalitoService; // Serviço para manipular Analitos
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.util.HashMap;
import java.util.Map;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/amostra")
public class AmostraController {

    @Autowired
    private AmostraService service;

    @Autowired
    private AnalitoService analitoService;

    @Autowired
    private AnaliseService analiseService;

    @Autowired
    private ProcedimentoService procedimentoService;

    @PostMapping
    public ResponseEntity<Amostra> salvarAmostra(@RequestBody Amostra amostra) {
        if (amostra.getAnalise() == null || amostra.getAnalise().getId() == null) {
            return ResponseEntity.badRequest().body(null); // Retorna 400 se não tiver análise associada
        }

        // Buscar a análise no banco
        Analise analise = analiseService.buscarPorId(amostra.getAnalise().getId());
        if (analise == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Associar a análise à amostra
        amostra.setAnalise(analise);

        // Verificar e associar Analitos
        if (amostra.getAnalitos() != null && !amostra.getAnalitos().isEmpty()) {
            List<Long> idsAnalitos = amostra.getAnalitos().stream()
                    .map(Analito::getId)
                    .collect(Collectors.toList());
            List<Analito> analitosAssociados = analitoService.buscarAnalitosPorIds(idsAnalitos);

            // Adiciona a amostra nos analitos (evita problema de não persistir a relação)
            for (Analito analito : analitosAssociados) {
                analito.getAmostras().add(amostra);
            }

            amostra.setAnalitos(analitosAssociados);
        }

        // Salvar a amostra
        amostra = service.salvar(amostra);

        // Adicionar a amostra à lista da análise e salvar a análise
        analise.getAmostras().add(amostra);
        analiseService.salvar(analise);

        // Retorna a amostra criada com status 201 (Created)
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(amostra.getId())
                .toUri();
        return ResponseEntity.created(uri).body(amostra);
    }

    @GetMapping
    public ResponseEntity<List<AmostraDTO>> listarAmostras() {
        List<Amostra> amostras = service.buscarTodos();

        // Atualiza status dinamicamente
        for (Amostra amostra : amostras) {
            StatusAmostra novoStatus = amostra.verificarStatusAtual();
            if (amostra.getStatus() != novoStatus) {
                amostra.setStatus(novoStatus);
                service.salvar(amostra);
            }
        }

        // Converte para DTO
        List<AmostraDTO> dtos = amostras.stream()
                .map(AmostraDTO::new) // <- Você precisa ter um construtor que aceite Amostra
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarAmostra(@PathVariable Long id) {
        try {
            service.remover(id);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Não é possível excluir a amostra pois ela está associada a outros dados.");
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Amostra com ID " + id + " não encontrada.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno ao excluir a amostra: " + e.getMessage());
        }
    }

}