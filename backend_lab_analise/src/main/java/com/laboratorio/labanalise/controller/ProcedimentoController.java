package com.laboratorio.labanalise.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.laboratorio.labanalise.DTO.ProcedimentoExecucaoDTO;
import com.laboratorio.labanalise.DTO.ProcedimentoSelectDTO;
import com.laboratorio.labanalise.DTO.projection.ProcedimentoMaisUsadoDTO;
import com.laboratorio.labanalise.DTO.request.ProcedimentoRequest;
import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.services.ProcedimentoService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/procedimento")
public class ProcedimentoController {

    @Autowired
    private ProcedimentoService service;

    // ============================
    // SALVAR PROCEDIMENTO
    // ============================
    @PostMapping
    public ResponseEntity<Procedimento> salvar(
            @RequestBody ProcedimentoRequest request) {

        Procedimento salvo = service.salvarProcedimentoCompleto(
                request.getProcedimento(),
                request.getReagentesQuantidades()
        );

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvo.getId())
                .toUri();

        return ResponseEntity.created(uri).body(salvo);
    }

    // ============================
    // LISTAR PROCEDIMENTOS
    // ============================
    @GetMapping
    public ResponseEntity<List<Procedimento>> listarProcedimentos() {
        return ResponseEntity.ok(service.buscarTodos());
    }

    // ============================
    // DOWNLOAD PDF
    // ============================
    @GetMapping("/download/{nomeProcedimento}")
    public ResponseEntity<byte[]> downloadPdf(
            @PathVariable String nomeProcedimento) {

        Procedimento procedimento
                = service.buscarPorNome(nomeProcedimento);

        if (procedimento == null || procedimento.getPdfData() == null) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add(
                HttpHeaders.CONTENT_DISPOSITION,
                "inline; filename=" + procedimento.getNomeProcedimento() + ".pdf"
        );
        headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(procedimento.getPdfData());
    }

    // ============================
    // DELETAR PROCEDIMENTO
    // ============================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProcedimento(
            @PathVariable Long id) {

        service.remover(id);
        return ResponseEntity.noContent().build();
    }

    // ============================
    // ESTATÍSTICAS
    // ============================
    @GetMapping("/mais-usados")
    public ResponseEntity<List<ProcedimentoMaisUsadoDTO>> buscarTop5() {
        return ResponseEntity.ok(service.buscarTop5Procedimentos());
    }

    @GetMapping("/uso-total")
    public ResponseEntity<List<ProcedimentoMaisUsadoDTO>> usoTotal() {
        return ResponseEntity.ok(service.buscarUsoTotalProcedimentos());
    }

    // ============================
    // EXECUTAR PROCEDIMENTO
    // ============================
    @PostMapping("/executar")
    public ResponseEntity<String> executarProcedimento(
            @RequestBody ProcedimentoExecucaoDTO dto) {

        service.executarProcedimento(dto.getProcedimentoId());
        return ResponseEntity.ok("Procedimento executado com sucesso");
    }

    @GetMapping("/select")
    public ResponseEntity<List<ProcedimentoSelectDTO>> listarParaSelect() {
        return ResponseEntity.ok(service.listarParaSelect());
    }

}
