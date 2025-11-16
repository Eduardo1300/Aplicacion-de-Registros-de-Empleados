package com.cibertec.registroempleados.model;

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
@Table(name = "faltas")
@Data
public class Falta {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(optional = true)
    @JoinColumn(name = "empleado_id", nullable = true)
    private Empleado empleado;
    
    @Column(name = "fecha")
    private LocalDate fecha;
    
    @Column(name = "tipo")
    private String tipo; // TARDANZA, FALTA, SALIDA_ANTICIPADA
    
    @Column(name = "descripcion")
    private String descripcion;
    
    @Column(name = "estado")
    private String estado; // PENDIENTE, JUSTIFICADA, RECHAZADA
}
