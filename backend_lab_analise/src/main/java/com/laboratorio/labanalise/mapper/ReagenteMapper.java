package com.laboratorio.labanalise.mapper;

import com.laboratorio.labanalise.DTO.ReagenteDTO;
import com.laboratorio.labanalise.model.Reagente;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReagenteMapper {
    ReagenteDTO toDTO(Reagente entity);
    Reagente toEntity(ReagenteDTO dto);
}
