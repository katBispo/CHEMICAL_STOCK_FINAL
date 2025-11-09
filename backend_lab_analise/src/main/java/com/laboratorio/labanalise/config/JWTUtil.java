package com.laboratorio.labanalise.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import com.laboratorio.labanalise.model.Usuario;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JWTUtil {

    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final long EXPIRATION_TIME = 2_400_000; // 40 minutos

    public static TokenInfo gerarToken(Usuario user) {
        long expMillis = System.currentTimeMillis() + EXPIRATION_TIME;
        Date expDate = new Date(expMillis);

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name());
        claims.put("cargo", user.getCargo().name());
        claims.put("nome", user.getNome());
        claims.put("id", user.getId());

        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(expDate)
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();

        return new TokenInfo(token, expMillis);
    }

    public static SecretKey getSecretKey() {
        return SECRET_KEY;
    }

    // Classe auxiliar para carregar token + expiração
    public static class TokenInfo {
        private final String token;
        private final long exp;

        public TokenInfo(String token, long exp) {
            this.token = token;
            this.exp = exp;
        }

        public String getToken() {
            return token;
        }

        public long getExp() {
            return exp;
        }
    }
}
