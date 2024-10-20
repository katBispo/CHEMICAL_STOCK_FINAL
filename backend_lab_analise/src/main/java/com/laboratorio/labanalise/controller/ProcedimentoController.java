package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.services.ProcedimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/procedimentoCadastro")
public class ProcedimentoController {

    @Autowired
    private ProcedimentoService service;

    @PostMapping
    public ResponseEntity<Procedimento> salvarProcedimento(
            @RequestParam("nomeProcedimento") String nomeProcedimento,
            @RequestParam("descricaoProcedimento") String descricaoProcedimento,
            @RequestParam("pdfFile") MultipartFile pdfFile) {
        try {
            byte[] pdfData = pdfFile.getBytes();

            Procedimento procedimento = new Procedimento(nomeProcedimento, descricaoProcedimento);
            procedimento.setPdfData(pdfData);

            procedimento = service.salvar(procedimento);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(procedimento.getId()).toUri();
            return ResponseEntity.created(uri).body(procedimento);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Procedimento>> listarProcedimento() {
        List<Procedimento> procedimentos = service.buscarTodos();
        return ResponseEntity.ok().body(procedimentos);
    }

    @GetMapping("/download/{nomeProcedimento}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable String nomeProcedimento) {
        Procedimento procedimento = service.buscarPorNome(nomeProcedimento);

        if (procedimento == null || procedimento.getPdfData() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=" + procedimento.getNomeProcedimento() + ".pdf")
                .body(procedimento.getPdfData());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Procedimento> deletarProcedimento(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}
