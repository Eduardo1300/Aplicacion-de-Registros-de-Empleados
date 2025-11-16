package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "documentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Documento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id")
    private Empleado empleado;

    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "tipo_documento", nullable = false)
    private String tipoDocumento; // CONTRATO, CERTIFICADO, DIPLOMA, EVALUACION, OTRO

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "ruta_archivo", nullable = false)
    private String rutaArchivo;

    @Column(name = "nombre_archivo")
    private String nombreArchivo;

    @Column(name = "tamaño_archivo")
    private Long tamañoArchivo;

    @Column(name = "formato")
    private String formato; // PDF, DOCX, JPG, etc

    @Column(name = "fecha_documento")
    private LocalDateTime fechaDocumento;

    @Column(name = "fecha_vencimiento")
    private LocalDateTime fechaVencimiento;

    @Column(name = "categoría")
    private String categoria; // PERSONAL, LABORAL, LEGAL, FINANCIERO

    @Column(name = "clasificacion")
    private String clasificacion; // PUBLICO, CONFIDENCIAL, RESTRINGIDO

    @Column(name = "compartido_con")
    private String compartidoCon; // emails o IDs separados por comas

    @Column(name = "requiere_firma")
    private Boolean requiereFirma;

    @Column(name = "firmado")
    private Boolean firmado;

    @Column(name = "estado")
    private String estado; // ACTIVO, ARCHIVADO, ELIMINADO, VENCIDO

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
        this.firmado = false;
        this.requiereFirma = false;
    }
}
