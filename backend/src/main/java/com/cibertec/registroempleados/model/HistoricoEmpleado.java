package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "historico_empleado")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoEmpleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "tipo_cambio", nullable = false)
    private String tipoCambio; // SALARIO, POSICION, DEPARTAMENTO, ESTADO_CIVIL, DOMICILIO, TELEFONO, EMAIL

    @Column(name = "valor_anterior")
    private String valorAnterior;

    @Column(name = "valor_nuevo")
    private String valorNuevo;

    @Column(name = "cambio_realizado_por")
    private String cambioRealizadoPor;

    @Column(name = "motivo_cambio")
    private String motivoCambio;

    @Column(name = "documento_soporte")
    private String documentoSoporte;

    @Column(name = "aprobado")
    private Boolean aprobado;

    @Column(name = "aprobado_por")
    private String aprobadoPor;

    @Column(name = "fecha_cambio_efectivo", nullable = false)
    private LocalDateTime fechaCambioEfectivo;

    @Column(name = "vigencia_desde")
    private LocalDateTime vigenciaDesde;

    @Column(name = "vigencia_hasta")
    private LocalDateTime vigenciaHasta;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
