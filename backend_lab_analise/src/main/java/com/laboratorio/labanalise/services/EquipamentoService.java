package com.laboratorio.labanalise.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.DTO.EquipamentoDTO;
import com.laboratorio.labanalise.model.Equipamento;
import com.laboratorio.labanalise.repositories.EquipamentoRepository;
import com.laboratorio.labanalise.repositories.ProcedimentoRepository;

@Service
public class EquipamentoService {

    private final EquipamentoRepository equipamentoRepository;
    private final ProcedimentoRepository procedimentoRepository;

    public EquipamentoService(EquipamentoRepository equipamentoRepository,
                              ProcedimentoRepository procedimentoRepository) {
        this.equipamentoRepository = equipamentoRepository;
        this.procedimentoRepository = procedimentoRepository;
    }

    public EquipamentoDTO salvarEquipamento(EquipamentoDTO dto) {
        Equipamento equipamento = new Equipamento();
        equipamento.setNome(dto.getNome());
        equipamento.setFabricante(dto.getFabricante());
        equipamento.setModelo(dto.getModelo());
        equipamento.setNumeroSerie(dto.getNumeroSerie());
        equipamento.setDescricao(dto.getDescricao());
        equipamento.setStatus(dto.getStatus());

        // Associar procedimentos se houver
        if (dto.getProcedimentosIds() != null) {
            equipamento.setProcedimentos(
                dto.getProcedimentosIds().stream()
                    .map(id -> procedimentoRepository.findById(id).orElse(null))
                    .filter(p -> p != null)
                    .collect(Collectors.toSet())
            );
        }

        Equipamento salvo = equipamentoRepository.save(equipamento);
        return new EquipamentoDTO(salvo);
    }

    public List<EquipamentoDTO> listarEquipamentos() {
        return equipamentoRepository.findAll().stream()
                .map(EquipamentoDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<EquipamentoDTO> buscarPorId(Long id) {
        return equipamentoRepository.findById(id).map(EquipamentoDTO::new);
    }

    public void deletarEquipamento(Long id) {
        equipamentoRepository.deleteById(id);
    }

    public EquipamentoDTO atualizarEquipamento(Long id, EquipamentoDTO dto) {
        Optional<Equipamento> opt = equipamentoRepository.findById(id);
        if (opt.isEmpty()) {
            return null;
        }

        Equipamento equipamento = opt.get();
        equipamento.setNome(dto.getNome());
        equipamento.setFabricante(dto.getFabricante());
        equipamento.setModelo(dto.getModelo());
        equipamento.setNumeroSerie(dto.getNumeroSerie());
        equipamento.setDescricao(dto.getDescricao());
        equipamento.setStatus(dto.getStatus());

        // Atualiza procedimentos
        if (dto.getProcedimentosIds() != null) {
            equipamento.setProcedimentos(
                dto.getProcedimentosIds().stream()
                    .map(pid -> procedimentoRepository.findById(pid).orElse(null))
                    .filter(p -> p != null)
                    .collect(Collectors.toSet())
            );
        }

        Equipamento atualizado = equipamentoRepository.save(equipamento);
        return new EquipamentoDTO(atualizado);
    }
}
