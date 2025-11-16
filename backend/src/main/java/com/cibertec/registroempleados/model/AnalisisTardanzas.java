package com.cibertec.registroempleados.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "analisis_tardanzas")
@Data
public class AnalisisTardanzas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "periodo")
    private LocalDate periodo;

    @Column(name = "cantidad_tardanzas")
    private Integer cantidadTardanzas = 0;

    @Column(name = "minutos_totales")
    private Integer minutosTotales = 0;

    @Column(name = "tendencia", length = 50)
    private String tendencia = "ESTABLE"; // AUMENTANDO, DISMINUYENDO, ESTABLE

    @Column(name = "promedio_minutos")
    private BigDecimal promedioMinutos;

    @Column(name = "limite_permitido")
    private Integer limitePermitido = 180; // 3 horas por defecto

    @Column(name = "excede_limite")
    private Boolean excedeLimite = false;

    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;
}
