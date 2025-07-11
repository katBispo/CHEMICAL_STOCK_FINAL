package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.DTO.ReagenteDTO;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.model.enums.UnidadeReagente;
import com.laboratorio.labanalise.services.ReagenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.util.Map;
import java.util.HashMap;

import java.net.URI;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/reagente")
public class ReagenteController {

    @Autowired
    private ReagenteService service;

    @PostMapping
    public ResponseEntity<Reagente> salvarReagente(@RequestBody Reagente reagente) {
        reagente = service.salvar(reagente);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(reagente.getId())
                .toUri();
        return ResponseEntity.created(uri).body(reagente);
    }

    @GetMapping
    public ResponseEntity<List<Reagente>> listarReagente() {
        List<Reagente> reagentes = service.buscarTodos();
        return ResponseEntity.ok().body(reagentes);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deletarReagente(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }

    // Novo endpoint para obter os tipos de reagentes
    @GetMapping("/tipos")
    public ResponseEntity<TipoReagente[]> getTiposReagente() {
        TipoReagente[] tipos = TipoReagente.values();
        return ResponseEntity.ok().body(tipos);
    }

    // Novo endpoint para listar unidades de medida dos reagentes
    @GetMapping("/unidades")
    public ResponseEntity<List<String>> listarUnidadesReagente() {
        List<String> unidades = Arrays.stream(UnidadeReagente.values())
                .map(Enum::name)
                .toList();
        return ResponseEntity.ok().body(unidades);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reagente> atualizarReagente(@PathVariable(value = "id") Long id,
            @RequestBody Reagente reagente) {
        service.atualizarReagente(id, reagente);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/vencidos")
    public ResponseEntity<List<Reagente>> listarVencidosReagente() {
        List<Reagente> reagentes = service.listarReagentesVencidos();
        return ResponseEntity.ok().body(reagentes);
    }

    @GetMapping("/vencidos/quantidade")
    public ResponseEntity<Long> contarReagentesVencidos() {
        long total = service.listarReagentesVencidos().size();
        return ResponseEntity.ok().body(total);
    }

    @GetMapping("/total-frascos")
    public ResponseEntity<Integer> getTotalFrascos() {
        Integer totalFrascos = service.obterTotalDeFrascos();
        return ResponseEntity.ok(totalFrascos);
    }

    @GetMapping("/quantidade-por-tipo")
    public ResponseEntity<Map<TipoReagente, Long>> contarPorTipo() {
        return ResponseEntity.ok(service.contarPorTipo());
    }

    @GetMapping("/grafico-validade")
    public Map<String, Long> getDadosGraficoValidade() {
        return service.getDadosGraficoValidade();
    }

    @GetMapping("/quantidade-controlados")
    public long getQuantidadeReagentesControlados() {
        return service.contarReagentesControlados();
    }

    @GetMapping("/buscarReagente")
    public List<ReagenteDTO> buscarPorNome(@RequestParam String nome) {
        return service.buscarPorNome(nome);
    }

    @GetMapping("/filtroReagente")
    public List<ReagenteDTO> buscarReagentesFiltrados(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) TipoReagente tipo,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {
        return service.buscarFiltrados(nome, tipo, dataInicio, dataFim);
    }

}
