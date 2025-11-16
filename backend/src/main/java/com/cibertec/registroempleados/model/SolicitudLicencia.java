package com.cibertec.registroempleados.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
@Table(name = "solicitud_licencia")
@Data
public class SolicitudLicencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @ManyToOne
    @JoinColumn(name = "tipo_licencia_id", nullable = false)
    private TipoLicencia tipoLicencia;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @Column(name = "dias_solicitados")
    private Integer diasSolicitados;

    @Column(name = "razon", columnDefinition = "TEXT")
    private String razon;

    @Column(name = "documento_adjunto")
    private String documentoAdjunto;

    @Column(name = "estado", length = 50)
    private String estado = "PENDIENTE"; // PENDIENTE, APROBADA, RECHAZADA, CANCELADA

    @ManyToOne
    @JoinColumn(name = "usuario_aprobador_id")
    private Usuario usuarioAprobador;

    @Column(name = "fecha_solicitud", nullable = false)
    private LocalDateTime fechaSolicitud;

    @Column(name = "fecha_respuesta")
    private LocalDateTime fechaRespuesta;

    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;

    @Column(name = "afecta_saldo")
    private Boolean afectaSaldo = true;
}
