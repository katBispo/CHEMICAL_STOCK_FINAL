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
        return ResponseEntity.badRequest().body(null); // 400 se não tiver análise associada
    }

    // Buscar a análise no banco
    Analise analise = analiseService.buscarPorId(amostra.getAnalise().getId());
    if (analise == null) {
        return ResponseEntity.badRequest().body(null);
    }

    // Associar a análise à amostra
    amostra.setAnalise(analise);

    // Aqui usamos o campo auxiliar que o frontend envia no JSON
    if (amostra.getAnalitosAuxiliares() != null && !amostra.getAnalitosAuxiliares().isEmpty()) {
        List<Long> idsAnalitos = amostra.getAnalitosAuxiliares().stream()
                .map(Analito::getId)
                .collect(Collectors.toList());

        List<Analito> analitosAssociados = analitoService.buscarAnalitosPorIds(idsAnalitos);

        // Monta os AmostraAnalito corretamente
        amostra.setAnalitos(analitosAssociados);
    }

    // Salva a amostra
    amostra = service.salvar(amostra);

    // Atualiza a análise com a nova amostra
    analise.getAmostras().add(amostra);
    analiseService.salvar(analise);

    // Retorna status 201 com URI da nova amostra
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(amostra.getId())
            .toUri();

    return ResponseEntity.created(uri).body(amostra);
}


    @GetMapping
    public ResponseEntity<List<AmostraDTO>> listarAmostras() {
        List<Amostra> amostras = service.buscarTodos();

        for (Amostra amostra : amostras) {
            StatusAmostra novoStatus = amostra.verificarStatusAtual();
            if (amostra.getStatus() != novoStatus) {
                amostra.setStatus(novoStatus);
                service.salvar(amostra);
            }
        }

        List<AmostraDTO> dtos = amostras.stream()
                .map(AmostraDTO::new) 
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