package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.Notificacion;
import com.cibertec.registroempleados.repository.NotificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/notificaciones")
@CrossOrigin(origins = "*")
public class NotificacionController {
    @Autowired
    private NotificacionRepository notificacionRepository;

    @PostMapping
    public ResponseEntity<Notificacion> crear(@RequestBody Notificacion notificacion) {
        return ResponseEntity.ok(notificacionRepository.save(notificacion));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notificacion> obtener(@PathVariable Long id) {
        Optional<Notificacion> notificacion = notificacionRepository.findById(id);
        return notificacion.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/empleado/{empleadoId}")
    public ResponseEntity<List<Notificacion>> obtenerPorEmpleado(@PathVariable Long empleadoId) {
        return ResponseEntity.ok(notificacionRepository.findByEmpleado(empleadoId));
    }

    @GetMapping("/empleado/{empleadoId}/no-leidas")
    public ResponseEntity<List<Notificacion>> obtenerNoLeidasByEmpleado(@PathVariable Long empleadoId) {
        return ResponseEntity.ok(notificacionRepository.findNoLeidasByEmpleado(empleadoId));
    }

    @GetMapping("/empleado/{empleadoId}/criticas")
    public ResponseEntity<List<Notificacion>> obtenerCriticas(@PathVariable Long empleadoId) {
        return ResponseEntity.ok(notificacionRepository.findCriticas(empleadoId));
    }

    @GetMapping("/empleado/{empleadoId}/contar-no-leidas")
    public ResponseEntity<Long> contarNoLeidas(@PathVariable Long empleadoId) {
        return ResponseEntity.ok(notificacionRepository.countNoLeidasByEmpleado(empleadoId));
    }

    @PatchMapping("/{id}/marcar-leida")
    public ResponseEntity<Notificacion> marcarLeida(@PathVariable Long id) {
        Optional<Notificacion> notif = notificacionRepository.findById(id);
        if (notif.isPresent()) {
            Notificacion n = notif.get();
            n.setLeida(true);
            n.setFechaLectura(LocalDateTime.now());
            return ResponseEntity.ok(notificacionRepository.save(n));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        notificacionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
