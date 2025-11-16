package com.cibertec.registroempleados.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "tipo_licencia")
@Data
public class TipoLicencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "dias_disponibles")
    private Integer diasDisponibles;

    @Column(name = "requiere_aprobacion")
    private Boolean requiereAprobacion = true;

    @Column(name = "puede_acumularse")
    private Boolean puedeAcumularse = false;

    @Column(name = "requiere_documento")
    private Boolean requiereDocumento = false;

    @Column(name = "activo")
    private Boolean activo = true;

    @Column(name = "porcentaje_descuento_salario", precision = 5, scale = 2)
    private java.math.BigDecimal porcentajeDescuentoSalario = java.math.BigDecimal.ZERO;

    @Column(name = "renovacion_anual")
    private Boolean renovacionAnual = true;
}
