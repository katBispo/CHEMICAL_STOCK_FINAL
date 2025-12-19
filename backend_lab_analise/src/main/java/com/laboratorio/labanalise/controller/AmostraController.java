package com.laboratorio.labanalise.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping; // Serviço para manipular Analitos
import org.springframework.web.bind.annotation.RestController;

import com.laboratorio.labanalise.DTO.AmostraComAnaliseDTO;
import com.laboratorio.labanalise.DTO.AmostraDTO;
import com.laboratorio.labanalise.DTO.projection.StatusAmostraCountProjection;
import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.model.enums.StatusAmostra;
import com.laboratorio.labanalise.repositories.AmostraRepository;
import com.laboratorio.labanalise.repositories.AnaliseRepository;
import com.laboratorio.labanalise.repositories.AnalitoRepository;
import com.laboratorio.labanalise.repositories.ProcedimentoRepository;
import com.laboratorio.labanalise.services.AmostraService;
import com.laboratorio.labanalise.services.AnaliseService;
import com.laboratorio.labanalise.services.AnalitoService;
import com.laboratorio.labanalise.services.ProcedimentoService;

@CrossOrigin(origins = "http://localhost:3000") // Altere para o seu frontend
@RestController
@RequestMapping(path = "/amostra")
public class AmostraController {

    @Autowired
    private AmostraService service;

    @Autowired
    private AmostraRepository repository;

    @Autowired
    private AnalitoService analitoService;

    @Autowired
    private AnalitoRepository analitoRepository;

    @Autowired
    private AnaliseService analiseService;
    @Autowired
    private AnaliseRepository analiseRepository;

    @Autowired
    private ProcedimentoService procedimentoService;

    @Autowired
    private ProcedimentoRepository procedimentoRepository;

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody AmostraDTO dto) {
        try {
            Amostra amostra = service.saveAmostra(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(amostra);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<AmostraDTO>> listarAmostras() {
        // Primeiro, buscar todas as entidades
        List<Amostra> amostras = service.buscarEntidades(); // método que retorna List<Amostra>

        // Atualizar status se necessário e salvar
        for (Amostra amostra : amostras) {
            StatusAmostra novoStatus = amostra.verificarStatusAtual();
            if (amostra.getStatus() != novoStatus) {
                amostra.setStatus(novoStatus);
                service.salvar(amostra);
            }
        }

        // Agora sim buscar os DTOs pelo método já existente que faz a conversão
        List<AmostraDTO> dtos = service.buscarTodos(); // retorna List<AmostraDTO> usando converterParaDTO internamente

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

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<AmostraDTO> buscarPorId(@PathVariable Long id) {
        Amostra amostra = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Amostra não encontrada"));

        return ResponseEntity.ok(new AmostraDTO(amostra));
    }

    @GetMapping("/com-analises")
    public ResponseEntity<List<AmostraComAnaliseDTO>> listarAmostrasComAnalises() {
        List<AmostraComAnaliseDTO> dtos = service.buscarAmostrasComAnalise();
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}/encerrar")
    public ResponseEntity<AmostraDTO> encerrarAmostra(@PathVariable Long id) {
        Amostra amostraEncerrada = service.encerrarAmostra(id);
        return ResponseEntity.ok(new AmostraDTO(amostraEncerrada));
    }

    @GetMapping("/status/contagem")
    public ResponseEntity<List<StatusAmostraCountProjection>> getContagemPorStatus() {
        List<StatusAmostraCountProjection> resultado = service.obterContagemPorStatus();
        return ResponseEntity.ok(resultado);
    }

}
