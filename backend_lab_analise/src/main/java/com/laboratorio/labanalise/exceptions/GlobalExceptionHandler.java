package com.laboratorio.labanalise.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrityError(DataIntegrityViolationException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Erro: Você tentou cadastrar um CPF que já está sendo usado.");
    }

   @ExceptionHandler(EstoqueInsuficienteException.class)
public ResponseEntity<Map<String, Object>> handleEstoqueInsuficiente(
        EstoqueInsuficienteException ex) {

    Map<String, Object> body = new HashMap<>();
    body.put("status", 400);
    body.put("erro", "ESTOQUE_INSUFICIENTE");
    body.put("mensagem", ex.getMessage());
    body.put("detalhes", ex.getFaltas()); 
    return ResponseEntity.badRequest().body(body);
}

}
