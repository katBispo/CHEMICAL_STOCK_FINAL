package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.model.Analise;
import com.laboratorio.labanalise.model.Analito;
import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.services.AmostraService;
import com.laboratorio.labanalise.services.AnaliseService;
import com.laboratorio.labanalise.services.ProcedimentoService;

import com.laboratorio.labanalise.services.AnalitoService; // Serviço para manipular Analitos
import org.springframework.beans.factory.annotation.Autowired;
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
        if (amostra.getAnalise() == null) {
            return ResponseEntity.badRequest().body(null); // Retorna 400 se não tiver análise
        }

        // Verificar se a análise existe no banco
        Analise analise = analiseService.buscarPorId(amostra.getAnalise().getId());
        if (analise == null) {
            return ResponseEntity.badRequest().body(null);
        }

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

        /*
        // Verificar e associar Procedimentos (nova parte adicionada)
        if (amostra.getProcedimentos() != null && !amostra.getProcedimentos().isEmpty()) {
            List<Long> idsProcedimentos = amostra.getProcedimentos().stream()
                    .map(Procedimento::getId)
                    .collect(Collectors.toList());
            List<Procedimento> procedimentosAssociados = procedimentoService.buscarPorIds(idsProcedimentos);

            // Adiciona a amostra nos procedimentos (evita problema de não persistir a
            // relação)
            for (Procedimento procedimento : procedimentosAssociados) {
                procedimento.getAmostras().add(amostra);
            }

            amostra.setProcedimentos(procedimentosAssociados);
        }
        */

        // Salva a amostra
        amostra = service.salvar(amostra);

        // Retorna a amostra criada com status 201 (Created)
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(amostra.getId())
                .toUri();
        return ResponseEntity.created(uri).body(amostra);
    }

    @GetMapping
    public ResponseEntity<List<Amostra>> listarAmostras() {
        List<Amostra> amostras = service.buscarTodos();
        return ResponseEntity.ok().body(amostras);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAmostra(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}