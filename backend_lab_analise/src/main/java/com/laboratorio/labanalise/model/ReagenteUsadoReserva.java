package com.laboratorio.labanalise.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;




@Entity
@Table(name = "reagente_usado_reserva")
public class ReagenteUsadoReserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reagente_id", nullable = false)
    private Reagente reagente;

    @ManyToOne
    @JoinColumn(name = "reserva_id", nullable = false)
    private ReservaLaboratorio reserva;

    @Column(nullable = false)
    private Double quantidade; // quantidade selecionada pelo usuário

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Reagente getReagente() {
        return reagente;
    }

    public void setReagente(Reagente reagente) {
        this.reagente = reagente;
    }

    public ReservaLaboratorio getReserva() {
        return reserva;
    }

    public void setReserva(ReservaLaboratorio reserva) {
        this.reserva = reserva;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }


}