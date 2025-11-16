package com.cibertec.registroempleados.model;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "turnos")
@Data
public class Turno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_fin", nullable = false)
    private LocalTime horaFin;

    @Column(name = "descanso_inicio")
    private LocalTime descansoInicio;

    @Column(name = "descanso_fin")
    private LocalTime descansoFin;

    @Column(name = "horas_trabajo")
    private Integer horasTrabajo;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "activo")
    private Boolean activo = true;

    @Column(name = "color", length = 50)
    private String color; // Para UI

    @Column(name = "icono", length = 50)
    private String icono; // Para UI
}
