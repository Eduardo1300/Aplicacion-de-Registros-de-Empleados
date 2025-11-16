package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "notificaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "mensaje", nullable = false, columnDefinition = "TEXT")
    private String mensaje;

    @Column(name = "tipo")
    private String tipo; // INFORMATIVA, ALERTA, URGENTE, SISTEMA

    @Column(name = "leida")
    private Boolean leida;

    @Column(name = "fecha_lectura")
    private LocalDateTime fechaLectura;

    @Column(name = "enlace")
    private String enlace;

    @Column(name = "remitente")
    private String remitente;

    @Column(name = "prioridad")
    private String prioridad; // BAJA, NORMAL, ALTA, CRITICA

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
        this.leida = false;
    }
}
