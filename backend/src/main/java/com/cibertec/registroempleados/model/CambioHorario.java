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
@Table(name = "cambio_horario")
@Data
public class CambioHorario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @ManyToOne
    @JoinColumn(name = "horario_anterior_id")
    private Turno horarioAnterior;

    @ManyToOne
    @JoinColumn(name = "horario_nuevo_id", nullable = false)
    private Turno horarioNuevo;

    @Column(name = "fecha_efectiva", nullable = false)
    private LocalDate fechaEfectiva;

    @Column(name = "razon", columnDefinition = "TEXT")
    private String razon;

    @ManyToOne
    @JoinColumn(name = "solicitado_por_id")
    private Usuario solicitadoPor;

    @Column(name = "estado", length = 50)
    private String estado = "PENDIENTE"; // PENDIENTE, APROBADO, RECHAZADO

    @Column(name = "fecha_solicitud")
    private LocalDate fechaSolicitud;

    @Column(name = "notificado")
    private Boolean notificado = false;

    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;
}
