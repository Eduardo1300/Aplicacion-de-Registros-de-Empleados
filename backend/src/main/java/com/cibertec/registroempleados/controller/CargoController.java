package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.Cargo;
import com.cibertec.registroempleados.service.CargoService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/cargo")
@CrossOrigin(origins = "*")
public class CargoController {

    private final CargoService cargoService;
    
    @GetMapping
    public ResponseEntity<List<Cargo>> getAllCargos() {
        List<Cargo> cargos = cargoService.listarCargos();
        if (cargos.isEmpty()) {
            return ResponseEntity.noContent().build();   
        }
        return ResponseEntity.ok(cargos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Cargo> getCargoById(@PathVariable Long id) throws Exception {
        Cargo cargo = cargoService.obtenerPorId(id).orElseThrow(
            () -> new Exception("El cargo no existe"));
        return ResponseEntity.ok(cargo);
    }
    
    @PostMapping
    public ResponseEntity<Cargo> guardarCargo(@RequestBody Cargo cargo) {
        return new ResponseEntity<>(cargoService.guardarCargo(cargo), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Cargo> updateCargo(@PathVariable Long id, @RequestBody Cargo cargo)
        throws Exception {
        Cargo cargoExistente = cargoService.obtenerPorId(id).orElseThrow(
            () -> new Exception("El cargo no existe"));
        cargoExistente.setNombre(cargo.getNombre());
        cargoExistente.setDescripcion(cargo.getDescripcion());
        return new ResponseEntity<>(cargoService.guardarCargo(cargoExistente), HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCargo(@PathVariable Long id) throws Exception {
        cargoService.obtenerPorId(id).orElseThrow(
            () -> new Exception("El cargo no existe"));
        cargoService.eliminarCargo(id);
        return ResponseEntity.noContent().build();
    }
}

