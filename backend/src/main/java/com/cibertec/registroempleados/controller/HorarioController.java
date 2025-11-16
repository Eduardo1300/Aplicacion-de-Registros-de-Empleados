package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.Horario;
import com.cibertec.registroempleados.service.HorarioService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/horario")
@CrossOrigin(origins = "*")
public class HorarioController {

    private final HorarioService horarioService;
    
    @GetMapping
    public ResponseEntity<List<Horario>> getAllHorarios() {
        List<Horario> horarios = horarioService.listarHorarios();
        if (horarios.isEmpty()) {
            return ResponseEntity.noContent().build();   
        }
        return ResponseEntity.ok(horarios);
    }
    
    @GetMapping("/empleado/{empleadoId}")
    public ResponseEntity<List<Horario>> getHorariosByEmpleado(@PathVariable Long empleadoId) {
        List<Horario> horarios = horarioService.listarHorariosPorEmpleado(empleadoId);
        if (horarios.isEmpty()) {
            return ResponseEntity.noContent().build();   
        }
        return ResponseEntity.ok(horarios);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Horario> getHorarioById(@PathVariable Long id) throws Exception {
        Horario horario = horarioService.obtenerPorId(id).orElseThrow(
            () -> new Exception("El horario no existe"));
        return ResponseEntity.ok(horario);
    }
    
    @PostMapping
    public ResponseEntity<Horario> guardarHorario(@RequestBody Horario horario) {
        return new ResponseEntity<>(horarioService.guardarHorario(horario), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Horario> updateHorario(@PathVariable Long id, @RequestBody Horario horario)
        throws Exception {
        Horario horarioExistente = horarioService.obtenerPorId(id).orElseThrow(
            () -> new Exception("El horario no existe"));
        horarioExistente.setDiaSemana(horario.getDiaSemana());
        horarioExistente.setHoraEntrada(horario.getHoraEntrada());
        horarioExistente.setHoraSalida(horario.getHoraSalida());
        return new ResponseEntity<>(horarioService.guardarHorario(horarioExistente), HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarHorario(@PathVariable Long id) throws Exception {
        horarioService.obtenerPorId(id).orElseThrow(
            () -> new Exception("El horario no existe"));
        horarioService.eliminarHorario(id);
        return ResponseEntity.noContent().build();
    }
}

