package com.laboratorio.labanalise.config;

import com.laboratorio.labanalise.model.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JWTUtil {
    private static final String SECRET_KEY = "suaChaveSecreta123"; // troque para algo seguro
    private static final long EXPIRATION_TIME = 86400000; // 1 dia

    public static String gerarToken(Usuario user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("nome", user.getNome())
                .claim("id", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())
                .compact();
    }
}
