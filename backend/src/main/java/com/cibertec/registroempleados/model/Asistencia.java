package com.cibertec.registroempleados.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "asistencias")
@Data
public class Asistencia {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha_asistencia")
    private LocalDate fechaAsistencia;
    
    @JsonFormat(pattern = "HH:mm:ss")
    @Column(name = "hora_entrada")
    private LocalTime horaEntrada;
    
    @JsonFormat(pattern = "HH:mm:ss")
    @Column(name = "hora_salida")
    private LocalTime horaSalida;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoAsistencia estado;
    
    @Column(name = "minutos_tardanza")
    private Integer minutosTardanza;
    
    @Column(name = "observaciones")
    private String observaciones;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name = "fecha_creacion")
    private java.time.LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "empleado_id")
    private Empleado empleado;
    
    public enum EstadoAsistencia {
        PRESENTE, TARDANZA, AUSENTE
    }
}
