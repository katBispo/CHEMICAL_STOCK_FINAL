package com.laboratorio.labanalise.config;

import com.laboratorio.labanalise.model.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;
public class JWTUtil {
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    //private static final long EXPIRATION_TIME = 120_000; // 2 minutos
private static final long EXPIRATION_TIME = 2_400_000; // 40 minutos

    // gerar token e também retornar a data de expiração
    public static TokenInfo gerarToken(Usuario user) {
        long expMillis = System.currentTimeMillis() + EXPIRATION_TIME;
        Date expDate = new Date(expMillis);

        String token = Jwts.builder()
                .setSubject(user.getEmail())
                .claim("nome", user.getNome())
                .claim("id", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(expDate)
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();

        return new TokenInfo(token, expMillis);
    }

    public static SecretKey getSecretKey() {
        return SECRET_KEY;
    }

    // classe auxiliar para carregar token + expiração
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
