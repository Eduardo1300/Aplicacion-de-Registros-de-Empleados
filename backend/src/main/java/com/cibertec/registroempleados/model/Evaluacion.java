package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "evaluaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evaluacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "periodo_evaluacion", nullable = false)
    private String periodoEvaluacion;

    @Column(name = "calificacion_general")
    private Integer calificacionGeneral; // 1-10

    @Column(name = "desempeño_laboral")
    private Integer desempenoLaboral;

    @Column(name = "puntualidad")
    private Integer puntualidad;

    @Column(name = "colaboracion_equipo")
    private Integer colaboracionEquipo;

    @Column(name = "cumplimiento_objetivos")
    private Integer cumplimientoObjetivos;

    @Column(name = "iniciativa")
    private Integer iniciativa;

    @Column(name = "comunicacion")
    private Integer comunicacion;

    @Column(name = "comentarios_evaluador")
    private String comentariosEvaluador;

    @Column(name = "fortalezas")
    private String fortalezas;

    @Column(name = "areas_mejora")
    private String areasMejora;

    @Column(name = "evaluado_por")
    private String evaluadoPor;

    @Column(name = "fecha_evaluacion", nullable = false)
    private LocalDateTime fechaEvaluacion;

    @Column(name = "estado")
    private String estado; // PENDIENTE, COMPLETADA, REVISION

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
