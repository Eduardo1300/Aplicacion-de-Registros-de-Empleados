package com.cibertec.registroempleados.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "configuracion_reporte")
@Data
public class ConfiguracionReporte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "usuario_creador_id", nullable = false)
    private Usuario usuarioCreador;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Reporte.TipoReporte tipoReporte;

    @Column(columnDefinition = "JSON")
    private String filtros;

    @Column(columnDefinition = "JSON")
    private String columnas;

    @Column(columnDefinition = "JSON")
    private String graficosIncluidos;

    @Enumerated(EnumType.STRING)
    private FrecuenciaReporte frecuencia;

    @Column(name = "proximo_envio")
    private LocalDateTime proximoEnvio;

    @Column(name = "emails_destino", columnDefinition = "JSON")
    private String emailsDestino;

    @Column(name = "activo")
    private Boolean activo = true;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_ultima_ejecucion")
    private LocalDateTime fechaUltimaEjecucion;

    public enum FrecuenciaReporte {
        UNA_VEZ, DIARIA, SEMANAL, MENSUAL, TRIMESTRAL, ANUAL
    }
}
