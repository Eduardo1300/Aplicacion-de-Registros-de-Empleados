package com.cibertec.registroempleados.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReporteAsistenciaDTO {
    private String titulo;
    private String fechaGeneracion;
    private String fechaInicio;
    private String fechaFin;
    private String generadoPor;
    private List<ReporteEmpleado> empleados;
    private ResumenReporte resumen;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReporteEmpleado {
        private Long empleadoId;
        private String nombre;
        private String apellido;
        private String departamento;
        private String puesto;
        private Long diasTrabajados;
        private Long diasAusentes;
        private Long retardos;
        private Long justificaciones;
        private Double porcentajeAsistencia;
        private List<DetalleRegistro> registros;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DetalleRegistro {
        private String fecha;
        private String horaEntrada;
        private String horaSalida;
        private String estado;
        private String observacion;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ResumenReporte {
        private Long totalEmpleados;
        private Long totalRegistros;
        private Double porcentajeAsistenciaPromedio;
        private Long totalRetardos;
        private Long totalJustificaciones;
    }
}
