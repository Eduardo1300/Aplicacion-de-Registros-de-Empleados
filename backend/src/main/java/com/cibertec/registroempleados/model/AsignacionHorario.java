package com.cibertec.registroempleados.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "asignacion_horario")
@Data
public class AsignacionHorario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @ManyToOne
    @JoinColumn(name = "turno_id", nullable = false)
    private Turno turno;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @Column(name = "estado", length = 50)
    private String estado = "ACTIVO"; // ACTIVO, SUSPENDIDO, FINALIZADO

    @Column(name = "razon_cambio", columnDefinition = "TEXT")
    private String razonCambio;

    @Column(name = "creado_por")
    private Long creadoPor;

    @Column(name = "fecha_creacion")
    private LocalDate fechaCreacion;

    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;
}
