package com.laboratorio.labanalise.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.laboratorio.labanalise.model.*;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarEmailAprovacao(String emailAdmin, Usuario usuario) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailAdmin);
        message.setSubject("Novo cadastro pendente");
        message.setText("Um novo usuário se cadastrou:\n\n"
                + "Nome: " + usuario.getNome() + "\n"
                + "Email: " + usuario.getEmail() + "\n\n"
                + "Aprove aqui: http://localhost:3000/aprovar-usuario/" + usuario.getId());

        mailSender.send(message);
    }

}