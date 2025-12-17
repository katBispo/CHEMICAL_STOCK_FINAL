package com.laboratorio.labanalise.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.DTO.ResiduoDTO;
import com.laboratorio.labanalise.model.Residuo;
import com.laboratorio.labanalise.model.enums.StatusResiduo;
import com.laboratorio.labanalise.repositories.ResiduoRepository;

@Service
public class ResiduoService {

    private final ResiduoRepository residuoRepository;

    public ResiduoService(ResiduoRepository residuoRepository) {
        this.residuoRepository = residuoRepository;
    }

    public List<Residuo> listarTodos() {
        return residuoRepository.findAll();
    }

    public Optional<Residuo> buscarPorId(Long id) {
        return residuoRepository.findById(id);
    }

    public Residuo salvar(Residuo residuo) {
        return residuoRepository.save(residuo);
    }

    public void deletar(Long id) {
        residuoRepository.deleteById(id);
    }

    private ResiduoDTO toDTO(Residuo residuo) {
        return new ResiduoDTO(residuo);
    }

    private Residuo toEntity(ResiduoDTO dto) {
        Residuo residuo = new Residuo();

        residuo.setId(dto.getId());
        residuo.setNome(dto.getNome());
        residuo.setTipo(dto.getTipo());
        residuo.setEstadoFisico(dto.getEstadoFisico());
        residuo.setQuantidade(dto.getQuantidade());
        residuo.setUnidadeMedida(dto.getUnidadeMedida());
        residuo.setDataGeracao(dto.getDataGeracao());
        residuo.setDataDescarte(dto.getDataDescarte());
        residuo.setObservacao(dto.getObservacao());

        // ✅ String → Enum
        if (dto.getStatus() != null) {
            residuo.setStatus(StatusResiduo.valueOf(dto.getStatus()));
        }

        return residuo;
    }

    public List<ResiduoDTO> listarTodosDTO() {
        return residuoRepository.findAll()
                .stream()
                .map(ResiduoDTO::new)
                .toList();
    }

    public Optional<ResiduoDTO> buscarDTOPorId(Long id) {
        return residuoRepository.findById(id).map(ResiduoDTO::new);
    }

    public ResiduoDTO salvarDTO(ResiduoDTO dto) {
        Residuo residuo = toEntity(dto);
        return new ResiduoDTO(residuoRepository.save(residuo));
    }

    public Optional<ResiduoDTO> atualizarDTO(Long id, ResiduoDTO dto) {
        return residuoRepository.findById(id).map(residuoExistente -> {
            Residuo atualizado = toEntity(dto);
            atualizado.setId(id);
            return new ResiduoDTO(residuoRepository.save(atualizado));
        });
    }

}
