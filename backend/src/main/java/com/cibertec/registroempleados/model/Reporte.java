package com.cibertec.registroempleados.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "reportes")
@Data
public class Reporte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoReporte tipoReporte;

    @Column(name = "fecha_generacion")
    private LocalDateTime fechaGeneracion;

    @ManyToOne
    @JoinColumn(name = "usuario_generador_id", nullable = false)
    private Usuario usuarioGenerador;

    @ManyToOne
    @JoinColumn(name = "departamento_id")
    private Departamento departamento;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoReporte estado = EstadoReporte.BORRADOR;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] contenidoPDF;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] contenidoExcel;

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @Column(name = "es_automatico")
    private Boolean esAutomatico = false;

    @Column(name = "ruta_archivo")
    private String rutaArchivo;

    public enum TipoReporte {
        ASISTENCIA, TARDANZAS, DESEMPEÑO, SALARIO, DEPARTAMENTO, HORARIO, LICENCIAS
    }

    public enum EstadoReporte {
        BORRADOR, GENERADO, ENVIADO, ARCHIVADO
    }
}
