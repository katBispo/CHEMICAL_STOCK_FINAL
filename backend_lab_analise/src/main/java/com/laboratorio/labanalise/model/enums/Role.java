package com.laboratorio.labanalise.model.enums;


public enum Role {
    ADMIN("Admin"),
    USER("User");
    private final String role;

    Role(String role) {
        this.role = role;
    }
}