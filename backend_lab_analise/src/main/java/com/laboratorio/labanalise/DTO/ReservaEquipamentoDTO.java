
package com.laboratorio.labanalise.DTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.laboratorio.labanalise.model.ReservaLaboratorio;
import com.laboratorio.labanalise.model.enums.NaturezaProjeto;
import com.laboratorio.labanalise.model.enums.StatusReserva;

public class ReservaEquipamentoDTO {
    private Long id;
    private Long equipamentoId;
    private String equipamentoNome;
    private String nomeSolicitante;
    private String emailSolicitante;
    private String instituicao;
    private NaturezaProjeto naturezaProjeto;
    private String orientadores;
    private String analise;
    private String amostra;
    private Boolean auxilioEquipamento;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private LocalTime horarioUso;
    private String telefoneContato;
    private StatusReserva status;
    private List<ReagenteUsadoReservaDTO> reagentesUsados;

    // Construtor a partir da entidade
    public ReservaEquipamentoDTO(ReservaLaboratorio reserva) {
        this.id = reserva.getId();
        this.equipamentoId = reserva.getEquipamento().getId();
        this.equipamentoNome = reserva.getEquipamento().getNome();
        this.nomeSolicitante = reserva.getNomeSolicitante();
        this.emailSolicitante = reserva.getEmailSolicitante();
        this.instituicao = reserva.getInstituicao();
        this.naturezaProjeto = reserva.getNaturezaProjeto();
        this.orientadores = reserva.getOrientadores();
        this.analise = reserva.getAnalise();
        this.amostra = reserva.getAmostra();
        this.auxilioEquipamento = reserva.getAuxilioEquipamento();
        this.dataInicio = reserva.getDataInicio();
        this.dataFim = reserva.getDataFim();
        this.horarioUso = reserva.getHorarioUso();
        this.telefoneContato = reserva.getTelefoneContato();
        this.status = reserva.getStatus();
        this.reagentesUsados = reserva.getReagentesUsados().stream()
                .map(ReagenteUsadoReservaDTO::new)
                .toList();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEquipamentoId() {
        return equipamentoId;
    }

    public void setEquipamentoId(Long equipamentoId) {
        this.equipamentoId = equipamentoId;
    }

    public String getEquipamentoNome() {
        return equipamentoNome;
    }

    public void setEquipamentoNome(String equipamentoNome) {
        this.equipamentoNome = equipamentoNome;
    }

    public String getNomeSolicitante() {
        return nomeSolicitante;
    }

    public void setNomeSolicitante(String nomeSolicitante) {
        this.nomeSolicitante = nomeSolicitante;
    }

    public String getEmailSolicitante() {
        return emailSolicitante;
    }

    public void setEmailSolicitante(String emailSolicitante) {
        this.emailSolicitante = emailSolicitante;
    }

    public String getInstituicao() {
        return instituicao;
    }

    public void setInstituicao(String instituicao) {
        this.instituicao = instituicao;
    }

    public NaturezaProjeto getNaturezaProjeto() {
        return naturezaProjeto;
    }

    public void setNaturezaProjeto(NaturezaProjeto naturezaProjeto) {
        this.naturezaProjeto = naturezaProjeto;
    }

    public String getOrientadores() {
        return orientadores;
    }

    public void setOrientadores(String orientadores) {
        this.orientadores = orientadores;
    }

    public String getAnalise() {
        return analise;
    }

    public void setAnalise(String analise) {
        this.analise = analise;
    }

    public String getAmostra() {
        return amostra;
    }

    public void setAmostra(String amostra) {
        this.amostra = amostra;
    }

    public Boolean getAuxilioEquipamento() {
        return auxilioEquipamento;
    }

    public void setAuxilioEquipamento(Boolean auxilioEquipamento) {
        this.auxilioEquipamento = auxilioEquipamento;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public LocalTime getHorarioUso() {
        return horarioUso;
    }

    public void setHorarioUso(LocalTime horarioUso) {
        this.horarioUso = horarioUso;
    }

    public String getTelefoneContato() {
        return telefoneContato;
    }

    public void setTelefoneContato(String telefoneContato) {
        this.telefoneContato = telefoneContato;
    }

    public StatusReserva getStatus() {
        return status;
    }

    public void setStatus(StatusReserva status) {
        this.status = status;
    }

    public List<ReagenteUsadoReservaDTO> getReagentesUsados() {
        return reagentesUsados;
    }

    public void setReagentesUsados(List<ReagenteUsadoReservaDTO> reagentesUsados) {
        this.reagentesUsados = reagentesUsados;
    }

    
}
