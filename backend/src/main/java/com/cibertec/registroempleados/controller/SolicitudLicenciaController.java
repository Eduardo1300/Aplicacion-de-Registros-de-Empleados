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
import com.cibertec.registroempleados.model.SolicitudLicencia;
import com.cibertec.registroempleados.model.TipoLicencia;
import com.cibertec.registroempleados.repository.EmpleadoRepository;
import com.cibertec.registroempleados.repository.TipoLicenciaRepository;
import com.cibertec.registroempleados.service.SolicitudLicenciaService;

@RestController
@RequestMapping("/api/v1/solicitudes-licencia")
@CrossOrigin(origins = "*")
public class SolicitudLicenciaController {
    
    @Autowired
    private SolicitudLicenciaService solicitudLicenciaService;
    
    @Autowired
    private EmpleadoRepository empleadoRepository;
    
    @Autowired
    private TipoLicenciaRepository tipoLicenciaRepository;
    
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody SolicitudLicenciaDTO solicitudDTO) {
        try {
            // Obtener empleado y tipo licencia
            Optional<Empleado> empleado = empleadoRepository.findById((long)solicitudDTO.empleadoId);
            Optional<TipoLicencia> tipoLicencia = tipoLicenciaRepository.findById((long)solicitudDTO.tipoLicenciaId);
            
            if (!empleado.isPresent() || !tipoLicencia.isPresent()) {
                return ResponseEntity.badRequest().body("Empleado o tipo de licencia no encontrado");
            }
            
            SolicitudLicencia solicitud = new SolicitudLicencia();
            solicitud.setEmpleado(empleado.get());
            solicitud.setTipoLicencia(tipoLicencia.get());
            solicitud.setFechaInicio(solicitudDTO.fechaInicio);
            solicitud.setFechaFin(solicitudDTO.fechaFin);
            solicitud.setDiasSolicitados(solicitudDTO.diasSolicitados);
            solicitud.setRazon(solicitudDTO.razon);
            
            SolicitudLicencia nueva = solicitudLicenciaService.crear(solicitud);
            return new ResponseEntity<>(nueva, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al crear solicitud: " + e.getMessage());
        }
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
    
    // DTO inner class para manejo de datos
    public static class SolicitudLicenciaDTO {
        public Integer empleadoId;
        public Integer tipoLicenciaId;
        public java.time.LocalDate fechaInicio;
        public java.time.LocalDate fechaFin;
        public Integer diasSolicitados;
        public String razon;
    }
}
