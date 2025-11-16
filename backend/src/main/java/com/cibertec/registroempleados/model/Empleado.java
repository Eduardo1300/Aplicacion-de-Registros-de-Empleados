package com.cibertec.registroempleados.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "empleados")
@Data
public class Empleado {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellido;
    private String correo;
    private String telefono;
    private String dni;
    
    @Column(name = "fecha_ingreso")
    private LocalDate fechaIngreso;
    
    @Column(name = "estado", nullable = true)
    private String estado;
    
    @ManyToOne
    @JoinColumn(name = "departamento_id", nullable = true)
    private Departamento departamento;
    
    @ManyToOne
    @JoinColumn(name = "cargo_id", nullable = true)
    private Cargo cargo;
    
    @OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
