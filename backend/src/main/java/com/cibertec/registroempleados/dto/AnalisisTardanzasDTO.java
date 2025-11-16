package com.cibertec.registroempleados.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class AnalisisTardanzasDTO {
    private Long id;
    private Long empleadoId;
    private String empleadoNombre;
    private LocalDate periodo;
    private Integer cantidadTardanzas;
    private Integer minutosTotales;
    private String tendencia;
    private java.math.BigDecimal promedioMinutos;
    private Boolean excedeLimite;
}
