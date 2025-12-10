package com.laboratorio.labanalise.model;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.laboratorio.labanalise.model.enums.NaturezaProjeto;
import com.laboratorio.labanalise.model.enums.StatusReserva;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "reserva_laboratorio")
public class ReservaLaboratorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomeSolicitante;

    @Column(nullable = false)
    private String emailSolicitante;

    @Column(nullable = false)
    private String instituicao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NaturezaProjeto naturezaProjeto;

    @Column(length = 500)
    private String orientadores;

    @Column(length = 1000)
    private String analise; 

    @Column(length = 1000)
    private String amostra; // Campo de texto livre

    @Column(nullable = false)
    private Boolean auxilioEquipamento; // sim/não

    @Column(nullable = false)
    private LocalDate dataInicio;

    @Column(nullable = false)
    private LocalDate dataFim;

    @Column(nullable = false)
    private LocalTime horarioUso;

    @Column(length = 20)
    private String telefoneContato;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusReserva status; // APROVADA, NEGADA, ANALISE

    // Relação com reagentes usados na reserva
    @OneToMany(mappedBy = "reserva", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReagenteUsadoReserva> reagentesUsados;

    // Relação com equipamento reservado
    @ManyToOne
    @JoinColumn(name = "equipamento_id", nullable = false)
    private Equipamento equipamento;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<ReagenteUsadoReserva> getReagentesUsados() {
        return reagentesUsados;
    }

    public void setReagentesUsados(List<ReagenteUsadoReserva> reagentesUsados) {
        this.reagentesUsados = reagentesUsados;
    }

    public Equipamento getEquipamento() {
        return equipamento;
    }

    public void setEquipamento(Equipamento equipamento) {
        this.equipamento = equipamento;
    }



    
}