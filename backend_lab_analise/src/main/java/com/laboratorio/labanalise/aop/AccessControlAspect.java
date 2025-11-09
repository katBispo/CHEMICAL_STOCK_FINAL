package com.laboratorio.labanalise.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AccessControlAspect {

    @Before("execution(* com.laboratorio.labanalise.services.*.deletar*(..)) || " +
            "execution(* com.laboratorio.labanalise.services.*.atualizar*(..))")
    public void verificarPermissao(JoinPoint joinPoint) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || auth.getAuthorities().stream()
                .noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            throw new SecurityException("❌ Acesso negado: apenas administradores podem realizar esta ação.");
        }

        System.out.println("✅ Acesso autorizado: " + auth.getName() + " executando " + joinPoint.getSignature().getName());
    }
}