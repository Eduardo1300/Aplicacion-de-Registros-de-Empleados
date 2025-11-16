package com.cibertec.registroempleados.dto;

import com.cibertec.registroempleados.model.Rol;
import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String nombreUsuario;
    private String rol;
    private String empleadoNombre;
    private Long empleadoId;
}
