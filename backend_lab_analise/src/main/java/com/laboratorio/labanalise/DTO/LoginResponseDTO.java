package com.laboratorio.labanalise.DTO;
public class LoginResponseDTO {
    private String nome;
    private String email;
    private String token;
    private long exp;

    public LoginResponseDTO(String nome, String email, String token, long exp) {
        this.nome = nome;
        this.email = email;
        this.token = token;
        this.exp = exp;
    }

    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public String getToken() { return token; }
    public long getExp() { return exp; }
}
