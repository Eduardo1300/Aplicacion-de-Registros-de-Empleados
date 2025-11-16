package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "competencias")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Competencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "nombre_competencia", nullable = false)
    private String nombreCompetencia;

    @Column(name = "nivel")
    private String nivel; // BASICO, INTERMEDIO, AVANZADO, EXPERTO

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fecha_adquisicion")
    private LocalDateTime fechaAdquisicion;

    @Column(name = "certificada")
    private Boolean certificada;

    @Column(name = "vigencia")
    private LocalDateTime vigencia;

    @Column(name = "evidencia_url")
    private String evidenciaUrl;

    @Column(name = "estado")
    private String estado; // ACTIVA, INACTIVA, VENCIDA

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
