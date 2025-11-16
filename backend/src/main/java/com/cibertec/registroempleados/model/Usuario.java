package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_usuario", nullable = false, unique = true)
    private String nombreUsuario;

    @Column(name = "contrasena")
    private String clave;

    @OneToOne(mappedBy = "usuario")
    private Empleado empleado;
    
    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol;
}
