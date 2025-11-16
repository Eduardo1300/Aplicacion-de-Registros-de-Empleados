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

import com.cibertec.registroempleados.model.SolicitudLicencia;
import com.cibertec.registroempleados.service.SolicitudLicenciaService;

@RestController
@RequestMapping("/api/v1/solicitudes-licencia")
@CrossOrigin(origins = "*")
public class SolicitudLicenciaController {
    
    @Autowired
    private SolicitudLicenciaService solicitudLicenciaService;
    
    @PostMapping
    public ResponseEntity<SolicitudLicencia> crear(@RequestBody SolicitudLicencia solicitud) {
        SolicitudLicencia nueva = solicitudLicenciaService.crear(solicitud);
        return new ResponseEntity<>(nueva, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<SolicitudLicencia>> listar() {
        List<SolicitudLicencia> solicitudes = solicitudLicenciaService.listarTodos();
        if (solicitudes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(solicitudes);
    }
    
    @GetMapping("/pendientes")
    public ResponseEntity<List<SolicitudLicencia>> listarPendientes() {
        List<SolicitudLicencia> solicitudes = solicitudLicenciaService.listarPendientes();
        if (solicitudes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(solicitudes);
    }
    
    @GetMapping("/empleado/{empleadoId}")
    public ResponseEntity<List<SolicitudLicencia>> listarPorEmpleado(@PathVariable Long empleadoId) {
        List<SolicitudLicencia> solicitudes = solicitudLicenciaService.listarPorEmpleado(empleadoId);
        if (solicitudes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(solicitudes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<SolicitudLicencia> obtenerPorId(@PathVariable Long id) {
        return solicitudLicenciaService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/aprobar")
    public ResponseEntity<SolicitudLicencia> aprobar(@PathVariable Long id) {
        SolicitudLicencia aprobada = solicitudLicenciaService.aprobar(id);
        if (aprobada == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(aprobada);
    }
    
    @PutMapping("/{id}/rechazar")
    public ResponseEntity<SolicitudLicencia> rechazar(@PathVariable Long id, @RequestBody String observaciones) {
        SolicitudLicencia rechazada = solicitudLicenciaService.rechazar(id, observaciones);
        if (rechazada == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(rechazada);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        solicitudLicenciaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
