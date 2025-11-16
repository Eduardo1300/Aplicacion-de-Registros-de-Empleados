package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.Justificacion;
import com.cibertec.registroempleados.service.JustificacionService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/justificacion")
@CrossOrigin(origins = "*")
public class JustificacionController {

    private final JustificacionService justificacionService;
    
    @GetMapping
    public ResponseEntity<List<Justificacion>> getAllJustificaciones() {
        List<Justificacion> justificaciones = justificacionService.listarJustificaciones();
        if (justificaciones.isEmpty()) {
            return ResponseEntity.noContent().build();   
        }
        return ResponseEntity.ok(justificaciones);
    }
    
    @GetMapping("/asistencia/{asistenciaId}")
    public ResponseEntity<List<Justificacion>> getJustificacionesByAsistencia(@PathVariable Long asistenciaId) {
        List<Justificacion> justificaciones = justificacionService.listarJustificacionesPorEmpleado(asistenciaId);
        if (justificaciones.isEmpty()) {
            return ResponseEntity.noContent().build();   
        }
        return ResponseEntity.ok(justificaciones);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Justificacion> getJustificacionById(@PathVariable Long id) throws Exception {
        Justificacion justificacion = justificacionService.obtenerPorId(id).orElseThrow(
            () -> new Exception("La justificación no existe"));
        return ResponseEntity.ok(justificacion);
    }
    
    @PostMapping
    public ResponseEntity<Justificacion> guardarJustificacion(@RequestBody Justificacion justificacion) {
        return new ResponseEntity<>(justificacionService.guardarJustificacion(justificacion), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Justificacion> updateJustificacion(@PathVariable Long id, @RequestBody Justificacion justificacion)
        throws Exception {
        Justificacion justificacionExistente = justificacionService.obtenerPorId(id).orElseThrow(
            () -> new Exception("La justificación no existe"));
        justificacionExistente.setDescripcion(justificacion.getDescripcion());
        justificacionExistente.setDocumentoSoporte(justificacion.getDocumentoSoporte());
        justificacionExistente.setEstado(justificacion.getEstado());
        justificacionExistente.setObservaciones(justificacion.getObservaciones());
        return new ResponseEntity<>(justificacionService.guardarJustificacion(justificacionExistente), HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarJustificacion(@PathVariable Long id) throws Exception {
        justificacionService.obtenerPorId(id).orElseThrow(
            () -> new Exception("La justificación no existe"));
        justificacionService.eliminarJustificacion(id);
        return ResponseEntity.noContent().build();
    }
}

