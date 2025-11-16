package com.cibertec.registroempleados.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ReporteDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private String tipoReporte;
    private LocalDateTime fechaGeneracion;
    private Long usuarioGeneradorId;
    private Long departamentoId;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String estado;
    private String rutaArchivo;
    private Boolean esAutomatico;
}
