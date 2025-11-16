package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "auditoria")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Auditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "accion", nullable = false)
    private String accion; // CREATE, UPDATE, DELETE, EXPORT, LOGIN, LOGOUT

    @Column(name = "entidad", nullable = false)
    private String entidad; // Nombre de la entidad afectada

    @Column(name = "id_entidad")
    private Long idEntidad;

    @Column(name = "valores_anteriores")
    private String valoresAnteriores;

    @Column(name = "valores_nuevos")
    private String valoresNuevos;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "navegador")
    private String navegador;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "tabla_afectada")
    private String tablaAfectada;

    @Column(name = "resultado")
    private String resultado; // EXITOSO, ERROR, INTENTO_FALLIDO

    @Column(name = "mensaje_error")
    private String mensajeError;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
