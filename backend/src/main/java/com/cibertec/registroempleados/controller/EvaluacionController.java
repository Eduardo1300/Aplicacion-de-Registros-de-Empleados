package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.Evaluacion;
import com.cibertec.registroempleados.service.EvaluacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/evaluaciones")
@CrossOrigin(origins = "*")
public class EvaluacionController {
    @Autowired
    private EvaluacionService evaluacionService;

    @PostMapping
    public ResponseEntity<Evaluacion> crear(@RequestBody Evaluacion evaluacion) {
        return ResponseEntity.ok(evaluacionService.crear(evaluacion));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evaluacion> obtener(@PathVariable Long id) {
        Optional<Evaluacion> evaluacion = evaluacionService.obtenerPorId(id);
        return evaluacion.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/empleado/{empleadoId}")
    public ResponseEntity<List<Evaluacion>> obtenerPorEmpleado(@PathVariable Long empleadoId) {
        return ResponseEntity.ok(evaluacionService.obtenerPorEmpleado(empleadoId));
    }

    @GetMapping("/periodo/{periodo}")
    public ResponseEntity<List<Evaluacion>> obtenerPorPeriodo(@PathVariable String periodo) {
        return ResponseEntity.ok(evaluacionService.obtenerPorPeriodo(periodo));
    }

    @GetMapping("/top-mejores")
    public ResponseEntity<List<Evaluacion>> obtenerTop10Mejores() {
        return ResponseEntity.ok(evaluacionService.obtenerTop10Mejores());
    }

    @GetMapping("/empleado/{empleadoId}/promedio")
    public ResponseEntity<Double> calcularPromedio(@PathVariable Long empleadoId) {
        return ResponseEntity.ok(evaluacionService.calcularPromedioEmpleado(empleadoId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evaluacion> actualizar(@PathVariable Long id, @RequestBody Evaluacion evaluacion) {
        return ResponseEntity.ok(evaluacionService.actualizar(id, evaluacion));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        evaluacionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
