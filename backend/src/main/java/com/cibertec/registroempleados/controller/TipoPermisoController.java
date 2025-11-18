package com.cibertec.registroempleados.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.cibertec.registroempleados.model.TipoPermiso;
import com.cibertec.registroempleados.repository.TipoPermisoRepository;

@RestController
@RequestMapping("/api/v1/tipos-permiso")
@CrossOrigin(origins = "*")
public class TipoPermisoController {
    
    @Autowired
    private TipoPermisoRepository tipoPermisoRepository;
    
    @PostMapping
    public ResponseEntity<TipoPermiso> crear(@RequestBody TipoPermiso tipoPermiso) {
        TipoPermiso nuevo = tipoPermisoRepository.save(tipoPermiso);
        return ResponseEntity.ok(nuevo);
    }
    
    @GetMapping
    public ResponseEntity<List<TipoPermiso>> listar() {
        List<TipoPermiso> tipos = tipoPermisoRepository.findAll();
        if (tipos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(tipos);
    }
    
    @GetMapping("/activos")
    public ResponseEntity<List<TipoPermiso>> listarActivos() {
        List<TipoPermiso> tipos = tipoPermisoRepository.findByActivoTrue();
        if (tipos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(tipos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TipoPermiso> obtenerPorId(@PathVariable Long id) {
        return tipoPermisoRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TipoPermiso> actualizar(@PathVariable Long id, @RequestBody TipoPermiso tipoPermisoActualizado) {
        Optional<TipoPermiso> tipoPermiso = tipoPermisoRepository.findById(id);
        if (tipoPermiso.isPresent()) {
            TipoPermiso tipo = tipoPermiso.get();
            if (tipoPermisoActualizado.getNombre() != null) {
                tipo.setNombre(tipoPermisoActualizado.getNombre());
            }
            if (tipoPermisoActualizado.getDescripcion() != null) {
                tipo.setDescripcion(tipoPermisoActualizado.getDescripcion());
            }
            if (tipoPermisoActualizado.getTiempoPermitido() != null) {
                tipo.setTiempoPermitido(tipoPermisoActualizado.getTiempoPermitido());
            }
            if (tipoPermisoActualizado.getActivo() != null) {
                tipo.setActivo(tipoPermisoActualizado.getActivo());
            }
            return ResponseEntity.ok(tipoPermisoRepository.save(tipo));
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (tipoPermisoRepository.existsById(id)) {
            tipoPermisoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
