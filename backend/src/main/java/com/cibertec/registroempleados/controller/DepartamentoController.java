package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.Departamento;
import com.cibertec.registroempleados.service.DepartamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/departamento")
@CrossOrigin(origins = "*")
public class DepartamentoController {
    private final DepartamentoService departamentoService;

    @GetMapping
    public ResponseEntity<List<Departamento>> getAllDepartamentos(){
        List<Departamento> departamentos = departamentoService.listar();
        if(departamentos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(departamentos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Departamento> getDepartamentoById(@PathVariable Long id){
        return departamentoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Departamento> guardarDepartamento(@RequestBody Departamento departamento){
        return new ResponseEntity<>(departamentoService.guardar(departamento), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Departamento> actualizarDepartamento(@PathVariable Long id, @RequestBody Departamento departamento){
        return departamentoService.obtenerPorId(id)
                .map(depto -> {
                    depto.setNombre(departamento.getNombre());
                    depto.setDescripcion(departamento.getDescripcion());
                    return ResponseEntity.ok(departamentoService.guardar(depto));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDepartamento(@PathVariable Long id){
        return departamentoService.obtenerPorId(id)
                .map(depto -> {
                    departamentoService.eliminar(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}