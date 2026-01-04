package com.laboratorio.labanalise.controller;

import java.net.URI;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.laboratorio.labanalise.DTO.ReagenteDTO;
import com.laboratorio.labanalise.DTO.SaidaReagenteDTO;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.model.enums.UnidadeReagente;
import com.laboratorio.labanalise.services.ReagenteService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/reagente")
public class ReagenteController {

    @Autowired
    private ReagenteService service;

    @PostMapping
    public ResponseEntity<Reagente> salvar(@RequestBody Reagente reagente) {

        Reagente salvo = service.salvar(reagente);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvo.getId())
                .toUri();

        return ResponseEntity.created(uri).body(salvo);
    }

    @GetMapping
    public ResponseEntity<List<ReagenteDTO>> listar() {
        return ResponseEntity.ok(service.buscarTodosDTO());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reagente> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizar(
            @PathVariable Long id,
            @RequestBody Reagente reagente) {

        service.atualizarReagente(id, reagente);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tipos")
    public ResponseEntity<TipoReagente[]> tipos() {
        return ResponseEntity.ok(TipoReagente.values());
    }

    @GetMapping("/unidades")
    public ResponseEntity<List<String>> unidades() {
        return ResponseEntity.ok(
                Arrays.stream(UnidadeReagente.values())
                        .map(Enum::name)
                        .toList()
        );
    }

    @GetMapping("/vencidos")
    public ResponseEntity<List<Reagente>> vencidos() {
        return ResponseEntity.ok(service.listarReagentesVencidos());
    }

    @GetMapping("/total-frascos")
    public ResponseEntity<Integer> totalFrascos() {
        return ResponseEntity.ok(service.obterTotalDeFrascos());
    }

    @GetMapping("/quantidade-por-tipo")
    public ResponseEntity<Map<TipoReagente, Long>> quantidadePorTipo() {
        return ResponseEntity.ok(service.contarPorTipo());
    }

    @GetMapping("/grafico-validade")
    public ResponseEntity<Map<String, Long>> graficoValidade() {
        return ResponseEntity.ok(service.getDadosGraficoValidade());
    }

    @GetMapping("/quantidade-controlados")
    public ResponseEntity<Long> controlados() {
        return ResponseEntity.ok(service.contarReagentesControlados());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<ReagenteDTO>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(service.buscarPorNome(nome));
    }

    @GetMapping("/filtro")
    public ResponseEntity<List<ReagenteDTO>> filtrar(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) TipoReagente tipo,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {

        return ResponseEntity.ok(
                service.buscarFiltrados(nome, tipo, dataInicio, dataFim)
        );
    }

    /**
     * Registrar saída de reagente (consumo)
     */
    @PostMapping("/{id}/saida")
    public ResponseEntity<?> registrarSaida(
            @PathVariable Long id,
            @RequestBody SaidaReagenteDTO dto
    ) {
        service.registrarSaida(id, dto);
        return ResponseEntity.ok("Saída registrada com sucesso");
    }
}
