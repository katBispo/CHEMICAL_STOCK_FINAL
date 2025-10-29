package com.laboratorio.labanalise.DTO;
import com.laboratorio.labanalise.model.*;




import com.laboratorio.labanalise.model.Amostra;
import java.util.List;
import java.util.stream.Collectors;

public class AmostraComEquipamentosDTO {
    private Long id;
    private String nome;
    private List<String> equipamentos; // ou IDs, se preferir

    public AmostraComEquipamentosDTO(Amostra amostra) {
        this.id = amostra.getId();
        this.nome = amostra.getNome();
        this.equipamentos = amostra.getAmostraEquipamentos().stream()
                                   .map(ae -> ae.getEquipamento().getNome())
                                   .collect(Collectors.toList());
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<String> getEquipamentos() {
        return equipamentos;
    }

    public void setEquipamentos(List<String> equipamentos) {
        this.equipamentos = equipamentos;
    }
}