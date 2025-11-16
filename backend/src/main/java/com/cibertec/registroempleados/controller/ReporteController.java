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

import com.cibertec.registroempleados.dto.ReporteDTO;
import com.cibertec.registroempleados.model.Reporte;
import com.cibertec.registroempleados.service.ReporteService;

@RestController
@RequestMapping("/api/v1/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {
    
    @Autowired
    private ReporteService reporteService;
    
    @PostMapping
    public ResponseEntity<Reporte> crear(@RequestBody ReporteDTO dto) {
        Reporte reporte = reporteService.crearReporte(dto);
        return new ResponseEntity<>(reporte, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<Reporte>> listar() {
        List<Reporte> reportes = reporteService.listarTodos();
        if (reportes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reportes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Reporte> obtenerPorId(@PathVariable Long id) {
        return reporteService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Reporte>> listarPorTipo(@PathVariable String tipo) {
        List<Reporte> reportes = reporteService.listarPorTipo(tipo);
        if (reportes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reportes);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Reporte> actualizar(@PathVariable Long id, @RequestBody ReporteDTO dto) {
        Reporte reporte = reporteService.actualizarReporte(id, dto);
        if (reporte == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reporte);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        reporteService.eliminarReporte(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/generar")
    public ResponseEntity<Reporte> generar(@PathVariable Long id) {
        Reporte reporte = reporteService.generarReporte(id);
        if (reporte == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reporte);
    }
}
