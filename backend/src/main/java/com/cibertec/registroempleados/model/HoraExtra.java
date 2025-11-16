package com.cibertec.registroempleados.model;

import java.math.BigDecimal;
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
@Table(name = "hora_extra")
@Data
public class HoraExtra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "horas_extra", precision = 5, scale = 2)
    private BigDecimal horasExtra;

    @Column(name = "razon", columnDefinition = "TEXT")
    private String razon;

    @Column(name = "aprobado")
    private Boolean aprobado = false;

    @ManyToOne
    @JoinColumn(name = "usuario_aprobador_id")
    private Usuario usuarioAprobador;

    @Column(name = "fecha_aprobacion")
    private LocalDate fechaAprobacion;

    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;

    @Column(name = "compensada")
    private Boolean compensada = false;

    @Column(name = "monto_pago", precision = 10, scale = 2)
    private BigDecimal montoPago;
}
