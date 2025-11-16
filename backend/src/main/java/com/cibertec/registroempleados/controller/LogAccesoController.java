package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.LogAcceso;
import com.cibertec.registroempleados.repository.LogAccesoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/log-acceso")
@CrossOrigin(origins = "*")
public class LogAccesoController {
    @Autowired
    private LogAccesoRepository logAccesoRepository;

    @PostMapping
    public ResponseEntity<LogAcceso> crear(@RequestBody LogAcceso logAcceso) {
        return ResponseEntity.ok(logAccesoRepository.save(logAcceso));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LogAcceso> obtener(@PathVariable Long id) {
        Optional<LogAcceso> log = logAccesoRepository.findById(id);
        return log.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/empleado/{empleadoId}")
    public ResponseEntity<List<LogAcceso>> obtenerPorEmpleado(@PathVariable Long empleadoId) {
        return ResponseEntity.ok(logAccesoRepository.findByEmpleado(empleadoId));
    }

    @GetMapping("/activos")
    public ResponseEntity<List<LogAcceso>> obtenerActivos() {
        return ResponseEntity.ok(logAccesoRepository.findActivos());
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<LogAcceso>> obtenerPorTipo(@PathVariable String tipo) {
        return ResponseEntity.ok(logAccesoRepository.findByTipoAcceso(tipo));
    }

    @GetMapping("/timeouts")
    public ResponseEntity<List<LogAcceso>> obtenerTimeouts() {
        return ResponseEntity.ok(logAccesoRepository.findTimeouts());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LogAcceso> actualizar(@PathVariable Long id, @RequestBody LogAcceso logAcceso) {
        return logAccesoRepository.findById(id).map(log -> {
            log.setFechaSalida(logAcceso.getFechaSalida());
            log.setEstado(logAcceso.getEstado());
            log.setMotivoCierre(logAcceso.getMotivoCierre());
            return ResponseEntity.ok(logAccesoRepository.save(log));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
