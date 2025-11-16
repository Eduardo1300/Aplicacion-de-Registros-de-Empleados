package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "perfiles_rrhh")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PerfilRRHH {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "resumen_ejecutivo")
    private String resumenEjecutivo;

    @Column(name = "formacion_academica")
    private String formacionAcademica;

    @Column(name = "experiencia_previa")
    private String experienciaPrevia;

    @Column(name = "competencias_principales")
    private String competenciasPrincipales;

    @Column(name = "idiomas")
    private String idiomas;

    @Column(name = "certificaciones")
    private String certificaciones;

    @Column(name = "habilidades_especiales")
    private String habilidadesEspeciales;

    @Column(name = "area_desarrollo")
    private String areaDesarrollo;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.fechaActualizacion = LocalDateTime.now();
    }
}
