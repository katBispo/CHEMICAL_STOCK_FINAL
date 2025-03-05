package com.laboratorio.labanalise.controller;


import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.DTO.request.ProcedimentoRequest;
import com.laboratorio.labanalise.DTO.request.ReagenteQuantidadeRequest;
import com.laboratorio.labanalise.services.ProcedimentoService;
import com.laboratorio.labanalise.services.ReagenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Permite requisições do frontend no localhost:3000
@RestController
@RequestMapping(path = "/procedimento")
public class ProcedimentoController {

    @Autowired
    private ProcedimentoService service;

    @Autowired
    private ReagenteService reagenteService;

    // Endpoint para salvar o procedimento
    @PostMapping
    /*public ResponseEntity<Procedimento> salvar(@RequestBody Procedimento procedimento, @RequestParam Long id, @RequestParam Double quantidade) {
        Reagente reagente = reagenteService.buscarPorId(id);
        procedimento = service.salvar(procedimento, reagente, quantidade);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(procedimento.getId())
                .toUri();

        return ResponseEntity.created(uri).body(procedimento);
    }*/
    public ResponseEntity<Procedimento> salvar(@RequestBody ProcedimentoRequest request) {
        Procedimento procedimento = request.getProcedimento();
        List<ReagenteQuantidadeRequest> reagenteQuantidadeRequests = request.getReagentesQuantidades();
        reagenteQuantidadeRequests.stream()
                .forEach(r -> {
                    Reagente reagente = reagenteService.buscarPorId(r.getIdReagente());
                    service.salvar(procedimento,reagente,r.getQuantidade());
                });
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(procedimento.getId())
                .toUri();

        return ResponseEntity.created(uri).body(procedimento);
    }

    /*public ResponseEntity<Procedimento> salvarProcedimento(
            @RequestParam("nomeProcedimento") String nomeProcedimento,
            @RequestParam("descricaoProcedimento") String descricaoProcedimento,
            @RequestParam("pdfFile") MultipartFile pdfFile,
            @RequestParam("reagenteId") Long reagenteId,
            @RequestParam("quantidadeReagente") Double quantidadeReagente) {
        try {
            // Verificar se o arquivo PDF não está vazio
            if (pdfFile.isEmpty()) {
                return ResponseEntity.badRequest().body(null); // Retorna 400 se o PDF estiver vazio
            }

            // Convertendo o arquivo PDF para um array de bytes
            byte[] pdfData = pdfFile.getBytes();

            // Criando o objeto Procedimento
            Procedimento procedimento = new Procedimento(nomeProcedimento, descricaoProcedimento);
            procedimento.setPdfData(pdfData); // Salvando os dados do PDF no objeto

            // Criando um objeto Reagente apenas com o ID
            Reagente reagente = new Reagente();
            reagente.setId(reagenteId);

            // Chamando o serviço para salvar o procedimento e registrar a saída do reagente
            Procedimento procedimentoSalvo = service.salvar(procedimento, reagente, quantidadeReagente);

            // Construindo a URI do novo procedimento criado
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(procedimentoSalvo.getId())
                    .toUri();

            return ResponseEntity.created(uri).body(procedimentoSalvo); // Retorna 201 com o procedimento salvo
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Retorna 500 em caso de erro
        }
    }*/

    // Endpoint para listar todos os procedimentos
    @GetMapping
    public ResponseEntity<List<Procedimento>> listarProcedimentos() {
        List<Procedimento> procedimentos = service.buscarTodos();
        return ResponseEntity.ok().body(procedimentos); // Retorna todos os procedimentos
    }

    // Endpoint para fazer download do PDF de um procedimento
    @GetMapping("/download/{nomeProcedimento}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable String nomeProcedimento) {
        Procedimento procedimento = service.buscarPorNome(nomeProcedimento);

        if (procedimento == null || procedimento.getPdfData() == null) {
            return ResponseEntity.notFound().build();
        }

        // Retorna o PDF com os cabeçalhos apropriados
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + procedimento.getNomeProcedimento() + ".pdf");
        headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf"); // Define o tipo do conteúdo

        return ResponseEntity.ok()
                .headers(headers)
                .body(procedimento.getPdfData());
    }

    // Endpoint para deletar um procedimento
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deletarProcedimento(@PathVariable Long id) {
        service.remover(id); // Chama o serviço para remover o procedimento
        return ResponseEntity.noContent().build(); // Retorna 204 sem conteúdo
    }
}
