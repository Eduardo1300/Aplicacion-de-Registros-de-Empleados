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
@Table(name = "saldo_licencia")
@Data
public class SaldoLicencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @ManyToOne
    @JoinColumn(name = "tipo_licencia_id", nullable = false)
    private TipoLicencia tipoLicencia;

    @Column(name = "saldo_disponible")
    private Integer saldoDisponible;

    @Column(name = "saldo_usado")
    private Integer saldoUsado = 0;

    @Column(name = "saldo_acumulado")
    private Integer saldoAcumulado = 0;

    @Column(name = "anio")
    private Integer anio;

    @Column(name = "fecha_reinicio")
    private LocalDate fechaReinicio;

    @Column(name = "fecha_actualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;
}
