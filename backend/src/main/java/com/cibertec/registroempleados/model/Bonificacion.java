package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bonificaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bonificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "tipo_bonificacion", nullable = false)
    private String tipoBonificacion; // DESEMPEÑO, PRODUCTIVIDAD, PUNTUALIDAD, ESPECIAL

    @Column(name = "monto", nullable = false)
    private BigDecimal monto;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fecha_otorgamiento")
    private LocalDateTime fechaOtorgamiento;

    @Column(name = "periodo")
    private String periodo; // ENERO, FEBRERO, etc o TRIMESTRE

    @Column(name = "aprobado_por")
    private String aprobadoPor;

    @Column(name = "estado")
    private String estado; // APROBADA, PENDIENTE, RECHAZADA

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
