package com.laboratorio.labanalise.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.model.ReservaEquipamento;
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
        message.setText(
            "Um novo usuário se cadastrou:\n\n"
            + "Nome: " + usuario.getNome() + "\n"
            + "Email: " + usuario.getEmail() + "\n\n"
            + "Para aprovar ou negar, acesse: "
            + "http://localhost:3000/aprovar-usuario/" + usuario.getId()
        );

        mailSender.send(message);
    }
    // Envia e-mail para o administrador quando uma nova reserva é feita
    public void enviarEmailNovaReserva(String emailAdmin, ReservaEquipamento reserva) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailAdmin);
        message.setSubject("Nova Solicitação de Reserva de Equipamento");
        message.setText(
            "Uma nova solicitação de reserva foi feita:\n\n" +
            "Solicitante: " + reserva.getNomeSolicitante() + "\n" +
            "Email: " + reserva.getEmailSolicitante() + "\n" +
            "Instituição: " + reserva.getInstituicao() + "\n" +
            "Natureza do projeto: " + reserva.getNaturezaProjeto() + "\n" +
            "Orientadores: " + reserva.getOrientadores() + "\n" +
            "Equipamento: " + reserva.getEquipamento().getNome() + "\n" +
            "Data: " + reserva.getDataInicio() + " a " + reserva.getDataFim() + "\n" +
            "Horário: " + reserva.getHorarioUso() + "\n" +
            "Analise: " + reserva.getAnalise() + "\n" +
            "Amostra: " + reserva.getAmostra() + "\n" +
            "Telefone de contato: " + reserva.getTelefoneContato() + "\n\n" +
            "Para aprovar ou negar, acesse: http://localhost:3000/aprovar-reserva/" + reserva.getId()
        );

        mailSender.send(message);
    }

    public void enviarEmailReservaAprovada(ReservaEquipamento reserva) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(reserva.getEmailSolicitante());
        message.setSubject("Reserva de Equipamento Aprovada");
        message.setText(
            "Sua solicitação de reserva foi aprovada!\n\n" +
            "Equipamento: " + reserva.getEquipamento().getNome() + "\n" +
            "Data: " + reserva.getDataInicio() + " a " + reserva.getDataFim() + "\n" +
            "Horário: " + reserva.getHorarioUso() + "\n\n" +
            "Compareça no laboratório no horário agendado."
        );

        mailSender.send(message);
    }

    public void enviarEmailReservaNegada(ReservaEquipamento reserva) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(reserva.getEmailSolicitante());
        message.setSubject("Reserva de Equipamento Negada");
        message.setText(
            "Sua solicitação de reserva foi negada pelo administrador.\n\n" +
            "Caso queira, entre em contato para mais informações."
        );

        mailSender.send(message);
    }
}
