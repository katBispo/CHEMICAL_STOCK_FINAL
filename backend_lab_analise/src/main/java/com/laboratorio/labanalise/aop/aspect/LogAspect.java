package com.laboratorio.labanalise.aop.aspect;

import java.time.LocalDateTime;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.laboratorio.labanalise.model.LogAcao;
import com.laboratorio.labanalise.repositories.LogAcaoRepository;

@Aspect
@Component
public class LogAspect {

    @Autowired
    private LogAcaoRepository logAcaoRepository;


    @AfterReturning("execution(* com.laboratorio.labanalise.services.*.salvar(..)) || " +
                    "execution(* com.laboratorio.labanalise.services.*.remover(..))")
    public void logAction(JoinPoint joinPoint) {
        String metodo = joinPoint.getSignature().getName();
        String classe = joinPoint.getTarget().getClass().getSimpleName();
        LocalDateTime agora = LocalDateTime.now();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String usuario = (auth != null) ? auth.getName() : "Usuário anônimo";

        LogAcao log = new LogAcao();
        log.setUsuario(usuario);
        log.setAcao(metodo);
        log.setClasse(classe);
        log.setDataHora(agora);



        logAcaoRepository.save(log);
    }
}
