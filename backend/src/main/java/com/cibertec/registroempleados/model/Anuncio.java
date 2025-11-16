package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "anuncios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Anuncio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "contenido", columnDefinition = "TEXT", nullable = false)
    private String contenido;

    @Column(name = "autor")
    private String autor;

    @Column(name = "categoria")
    private String categoria; // EMPRESA, DEPARTAMENTO, PROYECTO, RECURSOS_HUMANOS

    @Column(name = "fecha_publicacion", nullable = false)
    private LocalDateTime fechaPublicacion;

    @Column(name = "fecha_vencimiento")
    private LocalDateTime fechaVencimiento;

    @Column(name = "visible")
    private Boolean visible;

    @Column(name = "destacado")
    private Boolean destacado;

    @Column(name = "numero_visualizaciones")
    private Integer numeroVisualizaciones;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(name = "estado")
    private String estado; // ACTIVO, ARCHIVADO, BORRADOR

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
        this.visible = true;
        this.destacado = false;
        this.numeroVisualizaciones = 0;
    }
}
