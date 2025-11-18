package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.dto.EmpleadoResponse;
import com.cibertec.registroempleados.dto.ErrorResponse;
import com.cibertec.registroempleados.model.Departamento;
import com.cibertec.registroempleados.model.Empleado;
import com.cibertec.registroempleados.service.EmpleadoService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/empleado")
@CrossOrigin(origins = "*")
public class EmpleadoController {
    private static final Logger logger = LoggerFactory.getLogger(EmpleadoController.class);

    private final EmpleadoService empleadoService;
    
    @GetMapping
    public ResponseEntity<List<Empleado>> getAllEmpleado(){
        List<Empleado> empleados = empleadoService.listarEmpleado();
        return ResponseEntity.ok(empleados);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Empleado> getEmpleadoById(@PathVariable Long id) throws Exception{
        Empleado empleado = empleadoService.obtenerPorId(id).orElseThrow(
            () -> new Exception("El empleado no existe"));
        return ResponseEntity.ok(empleado);
    }
    
    @PostMapping
    public ResponseEntity<?> guardarEmpleado(@RequestBody Empleado empleado){
        logger.info("POST /api/empleado - Guardando empleado: {}", empleado);
        logger.info("Datos recibidos - nombre: {}, apellido: {}, dni: {}, cargo: {}, departamento: {}", 
            empleado.getNombre(), empleado.getApellido(), empleado.getDni(), 
            empleado.getCargo(), empleado.getDepartamento());
        
        // Establecer estado por defecto si viene nulo
        if (empleado.getEstado() == null) {
            empleado.setEstado("Activo");
        }
        
        try {
            return new ResponseEntity<>(empleadoService.guardarEmpleado(empleado), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            logger.warn("Validación: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            logger.error("Error al guardar empleado: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Error al guardar empleado: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<EmpleadoResponse> updateEmpleado(@PathVariable Long id, @RequestBody Empleado empleado) throws Exception{
        Empleado emp = empleadoService.obtenerPorId(id).orElseThrow(
            () -> new Exception("El empleado no existe"));
        emp.setNombre(empleado.getNombre());
        emp.setApellido(empleado.getApellido());
        emp.setCorreo(empleado.getCorreo());
        emp.setTelefono(empleado.getTelefono());
        emp.setFechaIngreso(empleado.getFechaIngreso());
        emp.setDni(empleado.getDni());
        emp.setEstado(empleado.getEstado());
        
        if(empleado.getDepartamento() != null) {
            Departamento departamento = new Departamento();
            departamento.setId(empleado.getDepartamento().getId());
            emp.setDepartamento(departamento);
        }
        
        emp.setCargo(empleado.getCargo());
        return new ResponseEntity<>(empleadoService.guardarEmpleado(emp), HttpStatus.OK);
    }
}
