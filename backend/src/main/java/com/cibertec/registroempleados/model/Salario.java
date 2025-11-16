package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "salarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Salario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "monto_base", nullable = false)
    private BigDecimal montoBase;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDateTime fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDateTime fechaFin;

    @Column(name = "tipo_salario")
    private String tipoSalario; // MENSUAL, QUINCENAL, SEMANAL

    @Column(name = "estado")
    private String estado; // ACTIVO, INACTIVO, SUSPENDIDO

    @Column(name = "frecuencia_pago")
    private String frecuenciaPago; // MENSUAL, QUINCENAL

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
