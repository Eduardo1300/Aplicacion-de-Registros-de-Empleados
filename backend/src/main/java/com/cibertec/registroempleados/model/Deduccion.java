package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "deducciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Deduccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "tipo_deduccion", nullable = false)
    private String tipoDeduccion; // AFP, IMPUESTO_RENTA, SEGURO_SALUD, PRESTAMO, MULTA, OTRO

    @Column(name = "monto", nullable = false)
    private BigDecimal monto;

    @Column(name = "porcentaje")
    private BigDecimal porcentaje;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fecha_deduccion")
    private LocalDateTime fechaDeduccion;

    @Column(name = "periodo")
    private String periodo;

    @Column(name = "motivo")
    private String motivo;

    @Column(name = "estado")
    private String estado; // ACTIVA, CANCELADA, SUSPENDIDA

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
