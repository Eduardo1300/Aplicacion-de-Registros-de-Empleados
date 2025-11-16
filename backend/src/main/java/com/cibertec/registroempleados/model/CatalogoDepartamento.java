package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "catalogo_departamentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CatalogoDepartamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_departamento", nullable = false, unique = true)
    private String nombreDepartamento;

    @Column(name = "codigo_departamento", unique = true)
    private String codigoDepartamento;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "jefe_departamento")
    private String jefeDepartamento;

    @Column(name = "telefono_contacto")
    private String telefonoContacto;

    @Column(name = "email_contacto")
    private String emailContacto;

    @Column(name = "ubicacion_fisica")
    private String ubicacionFisica;

    @Column(name = "presupuesto_anual")
    private Double presupuestoAnual;

    @Column(name = "numero_empleados")
    private Integer numeroEmpleados;

    @Column(name = "estado")
    private String estado; // ACTIVO, INACTIVO, DISUELTO

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
