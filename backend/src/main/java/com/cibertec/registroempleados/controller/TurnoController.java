package com.cibertec.registroempleados.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cibertec.registroempleados.model.Turno;
import com.cibertec.registroempleados.service.TurnoService;

@RestController
@RequestMapping("/api/v1/turnos")
@CrossOrigin(origins = "*")
public class TurnoController {
    
    @Autowired
    private TurnoService turnoService;
    
    @PostMapping
    public ResponseEntity<Turno> crear(@RequestBody Turno turno) {
        Turno nuevoTurno = turnoService.crear(turno);
        return new ResponseEntity<>(nuevoTurno, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<Turno>> listar() {
        List<Turno> turnos = turnoService.listarTodos();
        if (turnos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(turnos);
    }
    
    @GetMapping("/activos")
    public ResponseEntity<List<Turno>> listarActivos() {
        List<Turno> turnos = turnoService.listarActivos();
        if (turnos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(turnos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Turno> obtenerPorId(@PathVariable Long id) {
        return turnoService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Turno> actualizar(@PathVariable Long id, @RequestBody Turno turno) {
        Turno actualizado = turnoService.actualizar(id, turno);
        if (actualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(actualizado);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        turnoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
