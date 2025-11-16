package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_rrhh")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialRRHH {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "tipo_evento", nullable = false)
    private String tipoEvento; // CONTRATACION, ASCENSO, CAMBIO_CARGO, CAMBIO_DEPARTAMENTO, CAPACITACION, SANCION

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "cargo_anterior")
    private String cargoAnterior;

    @Column(name = "cargo_nuevo")
    private String cargoNuevo;

    @Column(name = "departamento_anterior")
    private String departamentoAnterior;

    @Column(name = "departamento_nuevo")
    private String departamentoNuevo;

    @Column(name = "fecha_evento", nullable = false)
    private LocalDateTime fechaEvento;

    @Column(name = "registrado_por")
    private String registradoPor;

    @Column(name = "documento_adjunto")
    private String documentoAdjunto;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
