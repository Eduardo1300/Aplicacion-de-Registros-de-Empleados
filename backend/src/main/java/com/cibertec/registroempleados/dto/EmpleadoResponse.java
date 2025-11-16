package com.cibertec.registroempleados.dto;

import com.cibertec.registroempleados.model.Empleado;
import lombok.Data;

@Data
public class EmpleadoResponse {
    private Empleado empleado;
    private String usuarioGenerado;
    private String claveGenerada;
    private boolean usuarioCreado;
    
    public EmpleadoResponse(Empleado empleado) {
        this.empleado = empleado;
        this.usuarioCreado = false;
    }
    
    public EmpleadoResponse(Empleado empleado, String usuario, String clave) {
        this.empleado = empleado;
        this.usuarioGenerado = usuario;
        this.claveGenerada = clave;
        this.usuarioCreado = true;
    }
}

