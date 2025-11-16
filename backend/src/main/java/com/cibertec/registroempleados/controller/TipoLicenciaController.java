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

import com.cibertec.registroempleados.model.TipoLicencia;
import com.cibertec.registroempleados.service.TipoLicenciaService;

@RestController
@RequestMapping("/api/v1/tipos-licencia")
@CrossOrigin(origins = "*")
public class TipoLicenciaController {
    
    @Autowired
    private TipoLicenciaService tipoLicenciaService;
    
    @PostMapping
    public ResponseEntity<TipoLicencia> crear(@RequestBody TipoLicencia tipoLicencia) {
        TipoLicencia nuevo = tipoLicenciaService.crear(tipoLicencia);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<TipoLicencia>> listar() {
        List<TipoLicencia> tipos = tipoLicenciaService.listarTodos();
        if (tipos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(tipos);
    }
    
    @GetMapping("/activos")
    public ResponseEntity<List<TipoLicencia>> listarActivos() {
        List<TipoLicencia> tipos = tipoLicenciaService.listarActivos();
        if (tipos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(tipos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TipoLicencia> obtenerPorId(@PathVariable Long id) {
        return tipoLicenciaService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TipoLicencia> actualizar(@PathVariable Long id, @RequestBody TipoLicencia tipoLicencia) {
        TipoLicencia actualizado = tipoLicenciaService.actualizar(id, tipoLicencia);
        if (actualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(actualizado);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        tipoLicenciaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
