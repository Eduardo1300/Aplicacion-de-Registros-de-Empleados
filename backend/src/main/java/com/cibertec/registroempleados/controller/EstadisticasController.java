package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.dto.*;
import com.cibertec.registroempleados.service.EstadisticasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/estadisticas")
@CrossOrigin(origins = "*")
public class EstadisticasController {

    @Autowired
    private EstadisticasService estadisticasService;

    /**
     * Obtiene estadísticas generales del día actual
     */
    @GetMapping("/hoy")
    public ResponseEntity<EstadisticasDTO> getEstadisticasHoy() {
        return ResponseEntity.ok(estadisticasService.getEstadisticasHoy());
    }

    /**
     * Obtiene tendencia de asistencia últimos 30 días
     */
    @GetMapping("/tendencia-30dias")
    public ResponseEntity<List<EstadisticasDTO.TendenciaAsistencia>> getTendenciaAsistencia30Dias() {
        return ResponseEntity.ok(estadisticasService.getTendenciaAsistencia30Dias());
    }

    /**
     * Obtiene horarios de mayor afluencia
     */
    @GetMapping("/horarios-pico")
    public ResponseEntity<HorariosPicoDTO> getHorariosPico() {
        return ResponseEntity.ok(estadisticasService.getHorariosPico());
    }

    /**
     * Obtiene distribución de empleados por departamento
     */
    @GetMapping("/distribucion-empleados")
    public ResponseEntity<Map<String, Long>> getDistribucionEmpleados() {
        return ResponseEntity.ok(estadisticasService.getDistribucionEmpleados());
    }

    /**
     * Obtiene justificaciones por tipo
     */
    @GetMapping("/justificaciones-tipo")
    public ResponseEntity<Map<String, Long>> getJustificacionesPorTipo() {
        return ResponseEntity.ok(estadisticasService.getJustificacionesPorTipo());
    }

    /**
     * Obtiene heatmap de asistencia mensual
     * @param año Año (YYYY)
     * @param mes Mes (1-12)
     */
    @GetMapping("/heatmap-asistencia")
    public ResponseEntity<HeatmapAsistenciaDTO> getHeatmapAsistencia(
            @RequestParam(defaultValue = "2025") int año,
            @RequestParam(defaultValue = "10") int mes) {
        return ResponseEntity.ok(estadisticasService.getHeatmapAsistencia(año, mes));
    }
}
