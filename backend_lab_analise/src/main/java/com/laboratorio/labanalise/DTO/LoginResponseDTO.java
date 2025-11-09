package com.laboratorio.labanalise.DTO;

public class LoginResponseDTO {

    private String nome;
    private String email;
    private String token;
    private long exp;
    private String role;
    private String cargo;

    public LoginResponseDTO(String nome, String email, String token, long exp, String role, String cargo) {
        this.nome = nome;
        this.email = email;
        this.token = token;
        this.exp = exp;
        this.role = role;
        this.cargo = cargo;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getToken() {
        return token;
    }

    public long getExp() {
        return exp;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

}
