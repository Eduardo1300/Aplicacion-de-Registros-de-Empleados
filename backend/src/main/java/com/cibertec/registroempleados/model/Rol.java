package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "roles")
@Data
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "nombre_rol", unique = true)
    private NombreRol nombre;
    
    @Column(name = "descripcion")
    private String descripcion;
    
    @Column(name = "fecha_creacion")
    private java.time.LocalDateTime fechaCreacion;
    
    @Column(name = "fecha_actualizacion")
    private java.time.LocalDateTime fechaActualizacion;
    
    public enum NombreRol {
        ADMIN, EMPLEADO
    }
}
