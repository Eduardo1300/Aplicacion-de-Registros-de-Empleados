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
@Table(name = "analisis_desempeño")
@Data
public class AnalisesDesempeño {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "departamento_id", nullable = false)
    private Departamento departamento;

    @Column(name = "periodo")
    private LocalDate periodo;

    @Column(name = "productividad", precision = 5, scale = 2)
    private BigDecimal productividad;

    @Column(name = "cumplimiento", precision = 5, scale = 2)
    private BigDecimal cumplimiento;

    @Column(name = "puntualidad", precision = 5, scale = 2)
    private BigDecimal puntualidad;

    @Column(name = "indicadores", columnDefinition = "JSON")
    private String indicadores;

    @Column(name = "meta_productividad", precision = 5, scale = 2)
    private BigDecimal metaProductividad;

    @Column(name = "meta_cumplimiento", precision = 5, scale = 2)
    private BigDecimal metaCumplimiento;

    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;

    @Column(name = "estado_desempeño", length = 50)
    private String estadoDesempeño; // EXCELENTE, BUENO, REGULAR, DEFICIENTE
}
