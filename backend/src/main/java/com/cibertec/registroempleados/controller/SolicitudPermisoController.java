package com.cibertec.registroempleados.controller;

import java.util.List;
import java.util.Optional;

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

import com.cibertec.registroempleados.model.Empleado;
import com.cibertec.registroempleados.model.SolicitudPermiso;
import com.cibertec.registroempleados.model.TipoPermiso;
import com.cibertec.registroempleados.repository.EmpleadoRepository;
import com.cibertec.registroempleados.repository.TipoPermisoRepository;
import com.cibertec.registroempleados.service.SolicitudPermisoService;

@RestController
@RequestMapping("/api/v1/solicitudes-permiso")
@CrossOrigin(origins = "*")
public class SolicitudPermisoController {
    
    @Autowired
    private SolicitudPermisoService solicitudPermisoService;
    
    @Autowired
    private EmpleadoRepository empleadoRepository;
    
    @Autowired
    private TipoPermisoRepository tipoPermisoRepository;
    
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody SolicitudPermisoDTO permisoDTO) {
        try {
            // Obtener empleado y tipo permiso
            Optional<Empleado> empleado = empleadoRepository.findById((long)permisoDTO.empleadoId);
            Optional<TipoPermiso> tipoPermiso = tipoPermisoRepository.findById((long)permisoDTO.tipoPermisoId);
            
            if (!empleado.isPresent() || !tipoPermiso.isPresent()) {
                return ResponseEntity.badRequest().body("Empleado o tipo de permiso no encontrado");
            }
            
            SolicitudPermiso permiso = new SolicitudPermiso();
            permiso.setEmpleado(empleado.get());
            permiso.setTipoPermiso(tipoPermiso.get());
            permiso.setFechaPermiso(permisoDTO.fecha);
            permiso.setHoraInicio(permisoDTO.horaInicio);
            permiso.setHoraFin(permisoDTO.horaFin);
            permiso.setMotivo(permisoDTO.razon);
            
            SolicitudPermiso nuevo = solicitudPermisoService.crear(permiso);
            return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al crear solicitud: " + e.getMessage());
        }
    }
    
    @GetMapping
    public ResponseEntity<List<SolicitudPermiso>> listar() {
        List<SolicitudPermiso> permisos = solicitudPermisoService.listarTodos();
        if (permisos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(permisos);
    }
    
    @GetMapping("/pendientes")
    public ResponseEntity<List<SolicitudPermiso>> listarPendientes() {
        List<SolicitudPermiso> permisos = solicitudPermisoService.listarPendientes();
        if (permisos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(permisos);
    }
    
    @GetMapping("/empleado/{empleadoId}")
    public ResponseEntity<List<SolicitudPermiso>> listarPorEmpleado(@PathVariable Long empleadoId) {
        List<SolicitudPermiso> permisos = solicitudPermisoService.listarPorEmpleado(empleadoId);
        if (permisos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(permisos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<SolicitudPermiso> obtenerPorId(@PathVariable Long id) {
        return solicitudPermisoService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/aprobar")
    public ResponseEntity<SolicitudPermiso> aprobar(@PathVariable Long id) {
        SolicitudPermiso aprobado = solicitudPermisoService.aprobar(id);
        if (aprobado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(aprobado);
    }
    
    @PutMapping("/{id}/rechazar")
    public ResponseEntity<SolicitudPermiso> rechazar(@PathVariable Long id, @RequestBody String observaciones) {
        SolicitudPermiso rechazado = solicitudPermisoService.rechazar(id, observaciones);
        if (rechazado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(rechazado);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        solicitudPermisoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
    
    // DTO inner class
    public static class SolicitudPermisoDTO {
        public Integer empleadoId;
        public Integer tipoPermisoId;
        public java.time.LocalDate fecha;
        public java.time.LocalTime horaInicio;
        public java.time.LocalTime horaFin;
        public String razon;
    }
}
