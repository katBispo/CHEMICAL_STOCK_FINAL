package com.laboratorio.labanalise.services;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.DTO.ResiduoDTO;
import com.laboratorio.labanalise.model.Residuo;
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
        return new ResiduoDTO(
            residuo.getId(),
            residuo.getNome(),
            residuo.getTipo(),
            residuo.getEstadoFisico(),
            residuo.getQuantidade(),
            residuo.getUnidadeMedida(),
            residuo.getDataGeracao(),
            residuo.getDataDescarte(),
            residuo.getObservacao()
        );
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
    return residuo;
}

}
