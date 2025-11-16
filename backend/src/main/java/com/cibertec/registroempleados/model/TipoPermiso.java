package com.cibertec.registroempleados.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "tipo_permiso")
@Data
public class TipoPermiso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "tiempo_permitido")
    private Integer tiempoPermitido; // En minutos

    @Column(name = "requiere_documento")
    private Boolean requiereDocumento = false;

    @Column(name = "requiere_aprobacion")
    private Boolean requiereAprobacion = true;

    @Column(name = "activo")
    private Boolean activo = true;

    @Column(name = "descuento_salario")
    private Boolean descuentoSalario = false;

    @Column(name = "limite_mensual")
    private Integer limiteMensual; // Máximo de permisos por mes
}
