package com.laboratorio.labanalise.DTO;
import java.util.List;


public class TypeDTO {
    private String title;
    private List<String> options;

    // Getters e Setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }
}