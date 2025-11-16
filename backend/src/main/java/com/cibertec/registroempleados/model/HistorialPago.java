package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_pagos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialPago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "periodo_pago", nullable = false)
    private String periodoPago; // MES-AÑO o formato específico

    @Column(name = "fecha_pago", nullable = false)
    private LocalDateTime fechaPago;

    @Column(name = "salario_base", nullable = false)
    private BigDecimal salarioBase;

    @Column(name = "total_bonificaciones")
    private BigDecimal totalBonificaciones;

    @Column(name = "total_deducciones")
    private BigDecimal totalDeducciones;

    @Column(name = "monto_neto", nullable = false)
    private BigDecimal montoNeto;

    @Column(name = "dias_trabajados")
    private Integer diasTrabajados;

    @Column(name = "horas_extra")
    private BigDecimal horasExtra;

    @Column(name = "monto_horas_extra")
    private BigDecimal montoHorasExtra;

    @Column(name = "estado")
    private String estado; // PROCESADO, PENDIENTE, PAGADO, CANCELADO

    @Column(name = "metodo_pago")
    private String metodoPago; // TRANSFERENCIA, EFECTIVO, CHEQUE

    @Column(name = "comprobante_numero")
    private String comprobanteNumero;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
