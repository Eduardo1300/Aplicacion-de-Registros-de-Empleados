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
public class HeatmapAsistenciaDTO {
    private List<EmpleadoHeatmap> datos;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EmpleadoHeatmap {
        private Long empleadoId;
        private String empleadoNombre;
        private String departamento;
        private List<DiaHeatmap> dias;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DiaHeatmap {
        private Integer dia; // 1-31
        private String estado; // PRESENTE, AUSENTE, RETARDO, JUSTIFICADO
        private String horaEntrada;
        private String horaSalida;
    }
}
