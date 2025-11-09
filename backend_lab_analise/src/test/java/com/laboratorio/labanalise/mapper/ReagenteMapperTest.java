package com.laboratorio.labanalise.mapper;

import com.laboratorio.labanalise.DTO.ReagenteDTO;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.model.enums.UnidadeReagente;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

public class ReagenteMapperTest {

    private final ReagenteMapper mapper = Mappers.getMapper(ReagenteMapper.class);

    @Test
    void shouldMapReagenteToDTO() {
        // given
        Reagente reagente = new Reagente();
        reagente.setId(1L);
        reagente.setNome("Ácido Clorídrico");
        reagente.setMarca("Merck");
        reagente.setLote("123456");
        reagente.setControlado(false);
        reagente.setDataValidade(LocalDate.now().plusYears(1));
        reagente.setTipo(TipoReagente.ÁCIDO);
        reagente.setUnidadeReagente(UnidadeReagente.ml);

        // when
        ReagenteDTO dto = mapper.toDTO(reagente);

        // then
        assertThat(dto).isNotNull();
        assertThat(dto.getId()).isEqualTo(reagente.getId());
        assertThat(dto.getNome()).isEqualTo(reagente.getNome());
        assertThat(dto.getMarca()).isEqualTo(reagente.getMarca());
        assertThat(dto.getLote()).isEqualTo(reagente.getLote());
        assertThat(dto.isControlado()).isEqualTo(reagente.isControlado());
        assertThat(dto.getDataValidade()).isEqualTo(reagente.getDataValidade());
        assertThat(dto.getTipo()).isEqualTo(reagente.getTipo());
        assertThat(dto.getUnidadeReagente()).isEqualTo(reagente.getUnidadeReagente());
    }

    @Test
    void shouldMapDTOToReagente() {
        // given
        ReagenteDTO dto = new ReagenteDTO();
        dto.setId(1L);
        dto.setNome("Ácido Clorídrico");
        dto.setMarca("Merck");
        dto.setLote("123456");
        dto.setControlado(false);
        dto.setDataValidade(LocalDate.now().plusYears(1));
        dto.setTipo(TipoReagente.ÁCIDO);
        dto.setUnidadeReagente(UnidadeReagente.ml);
        dto.setQuantidadeDeFrascos(1);
        dto.setQuantidadePorFrasco(1000.0);

        // when
        Reagente reagente = mapper.toEntity(dto);

        // then
        assertThat(reagente).isNotNull();
        assertThat(reagente.getId()).isEqualTo(dto.getId());
        assertThat(reagente.getNome()).isEqualTo(dto.getNome());
        assertThat(reagente.getMarca()).isEqualTo(dto.getMarca());
        assertThat(reagente.getLote()).isEqualTo(dto.getLote());
        assertThat(reagente.isControlado()).isEqualTo(dto.isControlado());
        assertThat(reagente.getDataValidade()).isEqualTo(dto.getDataValidade());
        assertThat(reagente.getTipo()).isEqualTo(dto.getTipo());
        assertThat(reagente.getUnidadeReagente()).isEqualTo(dto.getUnidadeReagente());
    }
}