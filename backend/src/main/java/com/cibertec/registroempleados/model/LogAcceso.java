package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "log_acceso")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogAcceso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @Column(name = "fecha_entrada", nullable = false)
    private LocalDateTime fechaEntrada;

    @Column(name = "fecha_salida")
    private LocalDateTime fechaSalida;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "navegador")
    private String navegador;

    @Column(name = "dispositivo")
    private String dispositivo;

    @Column(name = "ubicacion")
    private String ubicacion;

    @Column(name = "tipo_acceso")
    private String tipoAcceso; // NORMAL, ADMINISTRATIVO, REMOTO, API

    @Column(name = "duracion_sesion")
    private Long duracionSesion; // en minutos

    @Column(name = "motivo_cierre")
    private String motivoCierre; // CIERRE_NORMAL, TIMEOUT, CIERRE_FORZADO

    @Column(name = "estado")
    private String estado; // ACTIVA, CERRADA, SUSPENDIDA

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
