package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.Salario;
import com.cibertec.registroempleados.service.SalarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/salarios")
@CrossOrigin(origins = "*")
public class SalarioController {
    @Autowired
    private SalarioService salarioService;

    @PostMapping
    public ResponseEntity<Salario> crear(@RequestBody Salario salario) {
        return ResponseEntity.ok(salarioService.crear(salario));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Salario> obtener(@PathVariable Long id) {
        Optional<Salario> salario = salarioService.obtenerPorId(id);
        return salario.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Salario>> obtenerTodos() {
        return ResponseEntity.ok(salarioService.obtenerTodos());
    }

    @GetMapping("/empleado/{empleadoId}")
    public ResponseEntity<List<Salario>> obtenerPorEmpleado(@PathVariable Long empleadoId) {
        return ResponseEntity.ok(salarioService.obtenerPorEmpleado(empleadoId));
    }

    @GetMapping("/empleado/{empleadoId}/activo")
    public ResponseEntity<Salario> obtenerActivo(@PathVariable Long empleadoId) {
        Optional<Salario> salario = salarioService.obtenerActivo(empleadoId);
        return salario.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Salario> actualizar(@PathVariable Long id, @RequestBody Salario salario) {
        return ResponseEntity.ok(salarioService.actualizar(id, salario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        salarioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/inactivar")
    public ResponseEntity<Boolean> inactivar(@PathVariable Long id) {
        boolean resultado = salarioService.inactivar(id);
        return ResponseEntity.ok(resultado);
    }
}
