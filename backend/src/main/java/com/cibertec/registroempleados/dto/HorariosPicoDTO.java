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
public class HorariosPicoDTO {
    private List<HoraPico> horasPico; // Horas de mayor afluencia
    private Map<Integer, Long> registrosPorHora; // Hora (0-23) -> cantidad
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class HoraPico {
        private Integer hora;
        private String horaFormato; // HH:00
        private Long cantidad;
        private Double porcentaje;
    }
}
