package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "organigramas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Organigrama {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_posicion", nullable = false)
    private String nombrePosicion;

    @Column(name = "nivel_jerarquico", nullable = false)
    private Integer nivelJerarquico;

    @ManyToOne
    @JoinColumn(name = "empleado_id")
    private Empleado empleado;

    @ManyToOne
    @JoinColumn(name = "superior_id")
    private Empleado superior;

    @Column(name = "departamento")
    private String departamento;

    @Column(name = "cantidad_subordinados")
    private Integer cantidadSubordinados;

    @Column(name = "tipo_posicion")
    private String tipoPosicion; // EJECUTIVA, MANAGERIAL, SUPERVISORIA, OPERATIVA

    @Column(name = "area_negocio")
    private String areaNegocio;

    @Column(name = "sede")
    private String sede;

    @Column(name = "descripcion_puesto")
    private String descripcionPuesto;

    @Column(name = "requisitos_minimos")
    private String requisitosMinimos;

    @Column(name = "responsabilidades")
    private String responsabilidades;

    @Column(name = "vigencia_desde")
    private LocalDateTime vigenciaDesde;

    @Column(name = "vigencia_hasta")
    private LocalDateTime vigenciaHasta;

    @Column(name = "estado")
    private String estado; // ACTIVO, INACTIVO, PROPUESTO

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
