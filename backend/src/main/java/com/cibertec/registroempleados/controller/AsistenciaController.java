package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.Asistencia;
import com.cibertec.registroempleados.service.AsistenciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/asistencia")
@CrossOrigin(origins = "*")
public class AsistenciaController {
    private final AsistenciaService asistenciaService;

    @GetMapping
    public ResponseEntity<List<Asistencia>> getAllAsistencias(){
        List<Asistencia> asistencias = asistenciaService.listar();
        return ResponseEntity.ok(asistencias);
    }

    @GetMapping("/hoy")
    public List<Asistencia> getAsistenciasHoy(){
        return asistenciaService.listarAsistenciasHoy(LocalDate.now());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Asistencia> getAsistenciaById(@PathVariable Long id) throws Exception{
        Asistencia asistencia = asistenciaService.obtenerPorId(id).orElseThrow(
            () -> new Exception("No hay registro de asistencia"));
        return ResponseEntity.ok(asistencia);
    }

    @PostMapping
    public ResponseEntity<Asistencia> guardarAsistencia(@RequestBody Asistencia asistencia) {
        return new ResponseEntity<>(asistenciaService.guardar(asistencia), HttpStatus.CREATED);
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<Asistencia> registrarSalida(@PathVariable Long id) throws Exception{
        Asistencia asistencia = asistenciaService.obtenerPorId(id).orElseThrow(
            () -> new Exception("No hay registro de asistencia"));
        asistencia.setHoraSalida(LocalTime.now());
        return new ResponseEntity<>(asistenciaService.guardar(asistencia), HttpStatus.OK);
    }
}
