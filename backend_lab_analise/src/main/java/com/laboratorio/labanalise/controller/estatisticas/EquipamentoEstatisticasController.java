package com.laboratorio.labanalise.controller.estatisticas;


import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laboratorio.labanalise.DTO.projection.EquipamentoEstatisticasProjection;
import com.laboratorio.labanalise.services.estatisticas.EquipamentoEstatisticasService;

@RestController
@RequestMapping("/equipamentos/estatisticas")
public class EquipamentoEstatisticasController {

    private final EquipamentoEstatisticasService service;

    public EquipamentoEstatisticasController(EquipamentoEstatisticasService service) {
        this.service = service;
    }

    @GetMapping("/status")
    public List<EquipamentoEstatisticasProjection> contarPorStatus() {
        return service.contarPorStatus();
    }

    @GetMapping("/procedimentos")
    public List<EquipamentoEstatisticasProjection> distribuicaoPorProcedimento() {
        return service.distribuicaoPorProcedimento();
    }

    @GetMapping("/usos")
    public List<EquipamentoEstatisticasProjection> contagemDeUso() {
        return service.contagemDeUso();
    }

    @GetMapping("/top5")
    public List<EquipamentoEstatisticasProjection> top5MaisUsados() {
        return service.top5MaisUsados();
    }
}
