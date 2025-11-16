package com.cibertec.registroempleados.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
@Table(name = "justificaciones")
@Data
public class Justificacion {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(optional = false)
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;
    
    @ManyToOne
    @JoinColumn(name = "falta_id")
    private Falta falta;
    
    @Column(name = "fecha_justificacion")
    private LocalDate fechaJustificacion;
    
    @Column(name = "tipo_justificacion")
    private String tipoJustificacion;
    
    @Column(name = "descripcion")
    private String descripcion;
    
    @Column(name = "documento_soporte")
    private String documentoSoporte;
    
    @Column(name = "estado")
    private String estado;
    
    @ManyToOne
    @JoinColumn(name = "aprobado_por")
    private Usuario aprobadoPor;
    
    @Column(name = "fecha_aprobacion")
    private LocalDateTime fechaAprobacion;
    
    @Column(name = "observaciones")
    private String observaciones;
    
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
}