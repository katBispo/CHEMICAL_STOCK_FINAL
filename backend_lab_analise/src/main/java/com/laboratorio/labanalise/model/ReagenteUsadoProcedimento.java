package com.laboratorio.labanalise.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "REAGENTE_USADO_PROCEDIMENTO")
public class ReagenteUsadoProcedimento implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reagente_id", nullable = false)
    private Reagente reagente;

    @ManyToOne
    @JoinColumn(name = "procedimento_id", nullable = false)
    private Procedimento procedimento;

    @Column(nullable = false)
    private Double quantidade;  // Quantidade usada, por exemplo, 10 ml, 20 mg, etc.

    // Getters e Setters
}
