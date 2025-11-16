package com.cibertec.registroempleados.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstadisticasDTO {
    private Long totalEmpleados;
    private Long presentesHoy;
    private Long ausrentesHoy;
    private Long retardosHoy;
    private Double porcentajeAsistencia;
    private List<AsistenciaPorDepartamento> asistenciaPorDepartamento;
    private List<TendenciaAsistencia> tendenciaAsistencia; // Últimos 30 días
    private Map<String, Long> distribucionEmpleados; // Por departamento
    private Map<String, Long> justificacionesPorTipo;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AsistenciaPorDepartamento {
        private String departamento;
        private Long totalEmpleados;
        private Long presentes;
        private Long ausentes;
        private Long retardos;
        private Double porcentaje;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TendenciaAsistencia {
        private String fecha; // YYYY-MM-DD
        private Long presentes;
        private Long ausentes;
        private Long retardos;
        private Double porcentaje;
    }
}
