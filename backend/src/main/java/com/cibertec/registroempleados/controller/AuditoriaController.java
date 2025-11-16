package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.Auditoria;
import com.cibertec.registroempleados.repository.AuditoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auditoria")
@CrossOrigin(origins = "*")
public class AuditoriaController {
    @Autowired
    private AuditoriaRepository auditoriaRepository;

    @PostMapping
    public ResponseEntity<Auditoria> crear(@RequestBody Auditoria auditoria) {
        return ResponseEntity.ok(auditoriaRepository.save(auditoria));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auditoria> obtener(@PathVariable Long id) {
        Optional<Auditoria> auditoria = auditoriaRepository.findById(id);
        return auditoria.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Auditoria>> obtenerPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(auditoriaRepository.findByUsuario(usuarioId));
    }

    @GetMapping("/accion/{accion}")
    public ResponseEntity<List<Auditoria>> obtenerPorAccion(@PathVariable String accion) {
        return ResponseEntity.ok(auditoriaRepository.findByAccion(accion));
    }

    @GetMapping("/entidad/{entidad}")
    public ResponseEntity<List<Auditoria>> obtenerPorEntidad(@PathVariable String entidad) {
        return ResponseEntity.ok(auditoriaRepository.findByEntidad(entidad));
    }

    @GetMapping("/errores")
    public ResponseEntity<List<Auditoria>> obtenerErrores() {
        return ResponseEntity.ok(auditoriaRepository.findErrores());
    }

    @GetMapping("/intentos-fallidos")
    public ResponseEntity<List<Auditoria>> obtenerIntentosFallidos() {
        return ResponseEntity.ok(auditoriaRepository.findIntentosFallidos());
    }

    @GetMapping("/top-1000")
    public ResponseEntity<List<Auditoria>> obtenerTop1000() {
        return ResponseEntity.ok(auditoriaRepository.findTop1000());
    }
}
