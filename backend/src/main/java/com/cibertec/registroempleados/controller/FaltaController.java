package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.Falta;
import com.cibertec.registroempleados.service.FaltaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/falta")
@CrossOrigin(origins = "*")
public class FaltaController {
    private final FaltaService faltaService;
    
    @GetMapping
    public ResponseEntity<List<Falta>> getAllFaltas() {
        List<Falta> faltas = faltaService.listar();
        if (faltas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(faltas);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Falta> getFaltaById(@PathVariable Long id) {
        return faltaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/empleado/{empleadoId}")
    public ResponseEntity<List<Falta>> getFaltasPorEmpleado(@PathVariable Long empleadoId) {
        List<Falta> faltas = faltaService.obtenerPorEmpleado(empleadoId);
        if (faltas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(faltas);
    }
    
    @GetMapping("/empleado/{empleadoId}/estado/{estado}")
    public ResponseEntity<List<Falta>> getFaltasPorEmpleadoYEstado(
            @PathVariable Long empleadoId,
            @PathVariable String estado) {
        List<Falta> faltas = faltaService.obtenerPorEmpleadoYEstado(empleadoId, estado);
        if (faltas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(faltas);
    }
    
    @PostMapping
    public ResponseEntity<Falta> crearFalta(@RequestBody Falta falta) {
        Falta nuevaFalta = faltaService.guardar(falta);
        return new ResponseEntity<>(nuevaFalta, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Falta> actualizarFalta(@PathVariable Long id, @RequestBody Falta faltaActualizada) {
        return faltaService.obtenerPorId(id)
                .map(falta -> {
                    falta.setFecha(faltaActualizada.getFecha());
                    falta.setTipo(faltaActualizada.getTipo());
                    falta.setDescripcion(faltaActualizada.getDescripcion());
                    falta.setEstado(faltaActualizada.getEstado());
                    return ResponseEntity.ok(faltaService.guardar(falta));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarFalta(@PathVariable Long id) {
        faltaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
