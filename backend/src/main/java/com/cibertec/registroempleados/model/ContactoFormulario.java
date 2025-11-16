package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "contacto_formularios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactoFormulario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "asunto", nullable = false)
    private String asunto;

    @Column(name = "mensaje", columnDefinition = "TEXT", nullable = false)
    private String mensaje;

    @Column(name = "tipo_consulta")
    private String tipoConsulta; // SOPORTE, RECLAMO, SUGERENCIA, OTRO

    @Column(name = "estado")
    private String estado; // NUEVO, EN_REVISION, RESPONDIDO, CERRADO

    @Column(name = "respondido_por")
    private String respondidoPor;

    @Column(name = "respuesta")
    private String respuesta;

    @Column(name = "fecha_respuesta")
    private LocalDateTime fechaRespuesta;

    @Column(name = "prioridad")
    private String prioridad; // BAJA, NORMAL, ALTA, CRITICA

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
        this.estado = "NUEVO";
    }
}
