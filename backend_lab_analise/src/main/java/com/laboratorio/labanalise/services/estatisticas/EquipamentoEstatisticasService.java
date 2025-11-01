package com.laboratorio.labanalise.services.estatisticas;
import java.util.List;

import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.DTO.projection.EquipamentoEstatisticasProjection;
import com.laboratorio.labanalise.repositories.EquipamentoRepository;

@Service
public class EquipamentoEstatisticasService {

    private final EquipamentoRepository equipamentoRepository;

    public EquipamentoEstatisticasService(EquipamentoRepository equipamentoRepository) {
        this.equipamentoRepository = equipamentoRepository;
    }

    public List<EquipamentoEstatisticasProjection> contarPorStatus() {
        return equipamentoRepository.contarPorStatus();
    }

    public List<EquipamentoEstatisticasProjection> distribuicaoPorProcedimento() {
        return equipamentoRepository.distribuicaoPorProcedimento();
    }

    public List<EquipamentoEstatisticasProjection> contagemDeUso() {
        return equipamentoRepository.contagemDeUso();
    }

    public List<EquipamentoEstatisticasProjection> top5MaisUsados() {
        return equipamentoRepository.top5MaisUsados().stream()
                .limit(5)
                .toList();
    }
}