package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "mensajes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mensaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "remitente_id", nullable = false)
    private Empleado remitente;

    @ManyToOne
    @JoinColumn(name = "destinatario_id", nullable = false)
    private Empleado destinatario;

    @Column(name = "asunto")
    private String asunto;

    @Column(name = "contenido", columnDefinition = "TEXT", nullable = false)
    private String contenido;

    @Column(name = "leido")
    private Boolean leido;

    @Column(name = "fecha_lectura")
    private LocalDateTime fechaLectura;

    @Column(name = "archivos_adjuntos")
    private String archivosAdjuntos;

    @Column(name = "tipo")
    private String tipo; // PERSONAL, LABORAL, URGENTE

    @Column(name = "prioridad")
    private String prioridad; // BAJA, NORMAL, ALTA, CRITICA

    @Column(name = "marcado_importante")
    private Boolean marcadoImportante;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
        this.leido = false;
        this.marcadoImportante = false;
    }
}
